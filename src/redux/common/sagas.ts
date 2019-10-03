/* eslint-disable max-lines */
import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { get, toString } from 'lodash';

import { makeSelectorMaBP } from 'redux/auth/selectors';
import { SipDataState, SipDataType, IV_FLAG } from 'utils/enums';
import { select } from 'utils/stateHelpers';
import {
  DONG_CHUYEN_THU,
  QUET_NHAN,
  DONG_BANG_KE_VAO_TAI_CO_SAN,
  DONG_BANG_KE_VAO_TAI_MOI_TAO,
  DONG_TAI_VAO_CHUYEN_THU_CO_SAN,
  DONG_TAI_VAO_CHUYEN_THU_TAO_MOI,
} from './actions';
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
        if (get(item023, 'ZVTP_CUST_STATUS') !== SipDataState.CHUYEN_THU_DEN) {
          throw new Error('Chuyến thư không phải chuyến thư đến.');
        }
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

// eslint-disable-next-line max-lines-per-function
function* takeDongBangKeVaoTaiCoSan(action: UnfoldSagaActionType): SagaIterator {
  yield unfoldSaga(
    {
      // eslint-disable-next-line max-lines-per-function
      handler: async (): Promise<API.MIOAZTMI016Response> => {
        const { selectedTai, des, forwardingItemListState } = action.payload;
        const maBP = select(makeSelectorMaBP);
        /// tao 1 bang ke voi diem den la diem den cua danh sach buu gui ben ngoai
        const data0 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.TAO),
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: maBP,
          IV_DLOCATION: des,
          IV_DESCRIPTION: get(selectedTai, 'EXEC_CONT', ''),
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        });

        const maBangKeVuaTao = get(data0, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
        // add cac buu gui duoc tich chon ben ngoai vao bang ke vua tao voi
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data1 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_TOR_ID_CU: maBangKeVuaTao,
          IV_SLOCATION: maBP,
          IV_DLOCATION: des,
          IV_DESCRIPTION: '',
          T_ITEM: forwardingItemListState,
        });

        // gan bang ke vao tai
        const data2 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: get(selectedTai, 'TOR_ID', ''),
          IV_SLOCATION: maBP,
          IV_DLOCATION: des,
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: maBangKeVuaTao,
              ITEM_TYPE: SipDataType.BANG_KE,
            },
          ],
        });
        return data2;
      },
      key: action.type,
    },
    action.callbacks,
  );
}
// eslint-disable-next-line max-lines-per-function
function* takeDongBangKeVaoTaiMoiTao(action: UnfoldSagaActionType): SagaIterator {
  yield unfoldSaga(
    {
      // eslint-disable-next-line max-lines-per-function
      handler: async (): Promise<API.MIOAZTMI016Response> => {
        const maBP = select(makeSelectorMaBP);
        const { locNo, description, forwardingItemListState, des } = action.payload;
        //tao bang ke voi diem den la diem den cua danh sach buu gui ben ngoai
        const data0 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.TAO),
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: maBP,
          IV_DLOCATION: des,
          IV_DESCRIPTION: description,
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        });
        const maBangKeVuaTao = get(data0, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
        // add cac buu gui duoc tic chon ben ngoai vao bang ke vua tao
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data1 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_TOR_ID_CU: maBangKeVuaTao,
          IV_SLOCATION: maBP,
          IV_DLOCATION: des,
          IV_DESCRIPTION: '',
          T_ITEM: forwardingItemListState,
        });
        // lay thong tin duoc chon bao gom diem den va ghi chu de goi tao tai
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data2 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.TAO),
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: maBP,
          IV_DLOCATION: locNo,
          IV_DESCRIPTION: description,
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        });
        const maTaiVuaTao = get(data2, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
        // add bang ke vua tao vao tai vua tao
        const data3 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: maTaiVuaTao,
          IV_SLOCATION: maBP,
          IV_DLOCATION: locNo,
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: maBangKeVuaTao,
              ITEM_TYPE: SipDataType.BANG_KE,
            },
          ],
        });
        return data3;
      },

      key: action.type,
    },
    action.callbacks,
  );
}

// eslint-disable-next-line max-lines-per-function
function* takeActionDongTaiVaoChuyenThuCoSan(action: UnfoldSagaActionType): SagaIterator {
  yield unfoldSaga(
    {
      // eslint-disable-next-line max-lines-per-function
      handler: async (): Promise<API.MIOAZTMI016Response> => {
        const maBP = select(makeSelectorMaBP);
        const { selectedChuyenThu, forwardingItemListState, des } = action.payload;
        // tao bang ke voi diem den la diem den cua danh sach buu gui ben ngoai
        const data0 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.TAO),
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: maBP,
          IV_DLOCATION: des,
          IV_DESCRIPTION: get(selectedChuyenThu, 'EXEC_CONT', ''),
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        });
        const maBangKeVuaTao = get(data0, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
        // add cac buu gui duoc tich chon ben ngoai vao bang ke vua tao
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data1 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_TOR_ID_CU: maBangKeVuaTao,
          IV_SLOCATION: maBP,
          IV_DLOCATION: des,
          IV_DESCRIPTION: '',
          T_ITEM: forwardingItemListState,
        });

        // tao 1 tai voi diem den la diem den cua bang ke hien tai
        const data2 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.TAO),
          IV_TOR_TYPE: SipDataType.TAI,
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
        });
        const maTaiVuaTao = get(data2, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
        // add bang ke vua tao vao tai moi tao
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data3 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: maTaiVuaTao,
          IV_SLOCATION: maBP,
          IV_DLOCATION: des,
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: toString(maBangKeVuaTao),
              ITEM_TYPE: SipDataType.BANG_KE,
            },
          ],
        });

        // add tai vua tao vao chuyen thu duoc chon
        const data4 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_TOR_ID_CU: get(selectedChuyenThu, 'TOR_ID', ''),
          IV_SLOCATION: get(selectedChuyenThu, 'LOG_LOCID_FR', ''),
          IV_DLOCATION: get(selectedChuyenThu, 'LOG_LOCID_TO', ''),
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: toString(maTaiVuaTao),
              ITEM_TYPE: SipDataType.TAI,
            },
          ],
        });

        return data4;
      },
      key: action.type,
    },
    action.callbacks,
  );
}

// eslint-disable-next-line max-lines-per-function
function* takeActionDongTaiVaoChuyenThuTaoMoi(action: UnfoldSagaActionType): SagaIterator {
  yield unfoldSaga(
    {
      // eslint-disable-next-line max-lines-per-function
      handler: async (): Promise<API.MIOAZTMI016Response> => {
        const maBP = select(makeSelectorMaBP);
        const { locNo, description, forwardingItemListState, des } = action.payload;
        // tao bang ke voi diem den la diem den cua danh sach buu gui ben ngoai
        const data0 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.TAO),
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
        });
        const maBangKeVuaTao = get(data0, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
        // add cac buu gui dc tich chon ben ngoai vao bang ke vua tao
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data1 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_TOR_ID_CU: maBangKeVuaTao,
          IV_SLOCATION: maBP,
          IV_DLOCATION: des,
          IV_DESCRIPTION: '',
          T_ITEM: forwardingItemListState,
        });
        // tao tai voi diem den la diem den cua bang ke hien tai
        const data2 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.TAO),
          IV_TOR_TYPE: SipDataType.TAI,
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
        });
        const maTaiVuaTao = get(data2, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
        //add bang ke vua tao vao tai moi tao
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data3 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: maTaiVuaTao,
          IV_SLOCATION: maBP,
          IV_DLOCATION: des,
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: maBangKeVuaTao,
              ITEM_TYPE: SipDataType.BANG_KE,
            },
          ],
        });

        // tao chuyen thu theo thong tin vua chon tu popup
        const data4 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.TAO),
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: maBP,
          IV_DLOCATION: locNo,
          IV_DESCRIPTION: description,
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        });

        const maChuyenThuVuaTao = get(data4, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
        // add tai vua tao vao chuyen thu vua tao
        const data5 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_TOR_ID_CU: maChuyenThuVuaTao,
          IV_SLOCATION: maBP,
          IV_DLOCATION: locNo,
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: maTaiVuaTao,
              ITEM_TYPE: SipDataType.TAI,
            },
          ],
        });

        return data5;
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(DONG_CHUYEN_THU, takeDongChuyenThu);
  yield takeEvery(QUET_NHAN, takeQuetNhan);
  yield takeEvery(DONG_BANG_KE_VAO_TAI_CO_SAN, takeDongBangKeVaoTaiCoSan);
  yield takeEvery(DONG_BANG_KE_VAO_TAI_MOI_TAO, takeDongBangKeVaoTaiMoiTao);
  yield takeEvery(DONG_TAI_VAO_CHUYEN_THU_CO_SAN, takeActionDongTaiVaoChuyenThuCoSan);
  yield takeEvery(DONG_TAI_VAO_CHUYEN_THU_TAO_MOI, takeActionDongTaiVaoChuyenThuTaoMoi);
}
