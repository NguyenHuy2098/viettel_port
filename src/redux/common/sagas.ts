import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { get } from 'lodash';

import { makeSelectorMaBP } from 'redux/auth/selectors';
import { SipDataType } from 'utils/enums';
import { select } from 'utils/stateHelpers';
import { DONG_CHUYEN_THU, QUET_NHAN } from './actions';
import { post_MIOA_ZTMI016 } from '../MIOA_ZTMI016/helpers';
import { post_MIOA_ZTMI022 } from '../MIOA_ZTMI022/helpers';
import { post_MIOA_ZTMI023 } from '../MIOA_ZTMI023/helpers';

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
          LOC_ID: maBP,
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
        const maBP = select(makeSelectorMaBP);
        await post_MIOA_ZTMI022({
          FU_NO: get(item023, 'TOR_ID'),
          LOC_ID: maBP,
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
}
