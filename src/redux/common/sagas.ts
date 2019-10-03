import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { get } from 'lodash';

import { makeSelectorMaBP } from 'redux/auth/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import { select } from 'utils/stateHelpers';
import { DONG_CHUYEN_THU, QUET_NHAN, DONG_BANG_KE } from './actions';
import { post_MIOA_ZTMI016 } from '../MIOA_ZTMI016/helpers';
import { post_MIOA_ZTMI022 } from '../MIOA_ZTMI022/helpers';
import { post_MIOA_ZTMI023 } from '../MIOA_ZTMI023/helpers';

/**
 * 1. MIOA_ZTMI016 - Tạo mới chuyến thư
 * 2. MIOA_ZTMI016 - Gán kiện vào chuyến thư vừa tạo
 * 3. MIOA_ZTMI022 - Đóng chuyến thư
 */

// eslint-disable-next-line max-lines-per-function
function* takeDongBangKe(action: UnfoldSagaActionType): SagaIterator {
  yield unfoldSaga(
    {
      // eslint-disable-next-line max-lines-per-function
      handler: async (): Promise<API.MIOAZTMI016Response> => {
        const maBP = select(makeSelectorMaBP);
        const des = action.payload.des;

        const payload1 = {
          IV_FLAG: '1',
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: maBP,
          IV_DLOCATION: des,
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        };

        const res1 = await post_MIOA_ZTMI016(payload1);

        const payload2 = {
          IV_FLAG: '2',
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_TOR_ID_CU: get(res1, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', ''),
          IV_SLOCATION: maBP,
          IV_DLOCATION: des,
          IV_DESCRIPTION: '',
          T_ITEM: action.payload.forwardingItemListState,
        };

        await post_MIOA_ZTMI016(payload2);

        const payload3 = {
          IV_FLAG: '2',
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: get(action, 'payload.itemSelect.TOR_ID', ''),
          IV_SLOCATION: maBP,
          IV_DLOCATION: des,
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: get(res1, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', ''),
              ITEM_TYPE: SipDataType.BANG_KE,
            },
          ],
        };

        const res3 = await post_MIOA_ZTMI016(payload3);

        return res3;
      },
      key: action.type,
    },
    action.callbacks,
  );
}

/**
 * 1. MIOA_ZTMI016 - Tạo mới chuyến thư
 * 2. MIOA_ZTMI016 - Gán kiện vào chuyến thư vừa tạo
 * 3. MIOA_ZTMI022 - Đóng chuyến thư
 */
function* takeDongChuyenThu(action: UnfoldSagaActionType): SagaIterator {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.MIOAZTMI016Response> => {
        const maBP = select(makeSelectorMaBP);
        const dataChuyenThuTaoMoi = await post_MIOA_ZTMI016({
          IV_FLAG: '1',
          IV_SLOCATION: maBP,
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          T_ITEM: [],
        });
        const idChuyenThu = get(dataChuyenThuTaoMoi, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
        const dataChuyenThuGanKien = await post_MIOA_ZTMI016({
          IV_FLAG: '2',
          IV_SLOCATION: maBP,
          IV_TOR_ID_CU: idChuyenThu,
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          ...action.payload,
        });
        await post_MIOA_ZTMI022({
          FU_NO: idChuyenThu,
          STATUS_ID: '1',
        });
        return dataChuyenThuGanKien;
      },
      key: action.type,
    },
    action.callbacks,
  );
}

/**
 * 1. MIOA_ZTMI023 - Get thông tin
 * 2. MIOA_ZTMI022 - Quét nhận
 */
function* takeQuetNhan(action: UnfoldSagaActionType): SagaIterator {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.RowResponseZTMI023OUT> => {
        const data023 = await post_MIOA_ZTMI023({
          IV_ID: get(action, 'payload.IV_ID'),
        });
        const item023: API.RowResponseZTMI023OUT = get(data023, 'MT_ZTMI023_OUT.row[0]');
        if (item023.ZVTP_CUST_STATUS !== SipDataState.CHUYEN_THU_DEN)
          throw new Error('Chuyến thư không phải chuyến thư đến');

        await post_MIOA_ZTMI022({
          FU_NO: get(item023, 'TOR_ID'),
          STATUS_ID: '1',
        });
        return item023;
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(DONG_CHUYEN_THU, takeDongChuyenThu);
  yield takeEvery(QUET_NHAN, takeQuetNhan);
  yield takeEvery(DONG_BANG_KE, takeDongBangKe);
}
