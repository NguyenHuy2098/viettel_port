/* eslint-disable max-lines */
import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { get, includes, toString } from 'lodash';

import { IV_FLAG, SipDataState, SipDataType } from 'utils/enums';
import { select } from 'utils/stateHelpers';
// import { sleep } from 'utils/common';
import {
  DONG_BANG_KE_VAO_TAI_CO_SAN,
  DONG_BANG_KE_VAO_TAI_MOI_TAO,
  DONG_CHUYEN_THU,
  DONG_TAI_VAO_CHUYEN_THU_CO_SAN,
  DONG_TAI_VAO_CHUYEN_THU_TAO_MOI,
  QUET_DI,
  QUET_NHAN,
} from './actions';
import { post_MIOA_ZTMI016 } from '../MIOA_ZTMI016/helpers';
import { post_MIOA_ZTMI022 } from '../MIOA_ZTMI022/helpers';
import { post_MIOA_ZTMI023 } from '../MIOA_ZTMI023/helpers';
import { makeSelectorBPOrg } from '../GetProfileByUsername/selectors';

/**
 * 1. MIOA_ZTMI016 - Tạo mới chuyến thư
 * 2. MIOA_ZTMI016 - Gán kiện vào chuyến thư vừa tạo
 * 3. MIOA_ZTMI022 - Đóng chuyến thư
 */
function* takeDongChuyenThu(action: UnfoldSagaActionType): SagaIterator {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.MIOAZTMI016Response> => {
        const maBP = select(makeSelectorBPOrg);
        const dataChuyenThuTaoMoi = await post_MIOA_ZTMI016({
          IV_FLAG: '1',
          IV_SLOCATION: maBP,
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          T_ITEM: [],
        });

        // await sleep(1000);

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

// eslint-disable-next-line max-lines-per-function
function* takeQuetDi(action: UnfoldSagaActionType): SagaIterator {
  yield unfoldSaga(
    {
      // eslint-disable-next-line max-lines-per-function
      handler: async (): Promise<API.RowResponseZTMI023OUT | API.RowMTZTMI031OUT> => {
        const ivId = get(action, 'payload.IV_ID');
        const targetItemId = get(action, 'payload.targetItemId');
        const targetItemResponse = await post_MIOA_ZTMI023({ IV_ID: targetItemId });
        const targetItem = get(targetItemResponse, 'MT_ZTMI023_OUT.row[0]');
        const targetTorType = get(targetItem, 'TOR_TYPE');

        const response023 = await post_MIOA_ZTMI023({ IV_ID: ivId });
        const scanningItem = get(response023, 'MT_ZTMI023_OUT.row[0]');
        const scanningTorType: string = get(scanningItem, 'TOR_TYPE');

        if (targetTorType === SipDataType.CHUYEN_THU) {
          await post_MIOA_ZTMI016({
            IV_FLAG: '2',
            IV_TOR_TYPE: SipDataType.CHUYEN_THU,
            IV_TOR_ID_CU: targetItemId,
            IV_SLOCATION: get(targetItem, 'FR_LOG_ID'),
            IV_DLOCATION: get(targetItem, 'TO_LOG_ID'),
            T_ITEM: [
              {
                ITEM_ID: scanningTorType === SipDataType.TAI ? ivId : get(scanningItem, 'TOR_ID'),
                ITEM_TYPE: scanningTorType === SipDataType.TAI ? SipDataType.TAI : '',
              },
            ],
          });
          return scanningItem;
        } else if (targetTorType === SipDataType.TAI) {
          await post_MIOA_ZTMI016({
            IV_FLAG: '2',
            IV_TOR_TYPE: SipDataType.TAI,
            IV_TOR_ID_CU: targetItemId,
            IV_SLOCATION: get(targetItem, 'FR_LOG_ID'),
            IV_DLOCATION: get(targetItem, 'TO_LOG_ID'),
            T_ITEM: [
              {
                ITEM_ID: ivId,
                ITEM_TYPE: SipDataType.BANG_KE,
              },
            ],
          });
          return scanningItem;
        } else if (targetTorType === SipDataType.BANG_KE) {
          await post_MIOA_ZTMI016({
            IV_FLAG: '2',
            IV_TOR_TYPE: SipDataType.BANG_KE,
            IV_TOR_ID_CU: targetItemId,
            IV_SLOCATION: get(targetItem, 'FR_LOG_ID'),
            IV_DLOCATION: get(targetItem, 'TO_LOG_ID'),
            T_ITEM: [
              {
                ITEM_ID: get(scanningItem, 'TOR_ID'),
                ITEM_TYPE: '',
              },
            ],
          });
          return scanningItem;
        }

        throw new Error('Không đủ điều kiện quét.');
      },
      key: action.type,
    },
    action.callbacks,
    action.options,
  );
}

/**
 * 1. MIOA_ZTMI023 - Get thông tin
 * 2. MIOA_ZTMI022 - Quét nhận
 */
// eslint-disable-next-line max-lines-per-function
function* takeQuetNhan(action: UnfoldSagaActionType): SagaIterator {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.RowResponseZTMI023OUT> => {
        const data023 = await post_MIOA_ZTMI023({
          IV_ID: get(action, 'payload.IV_ID'),
        });
        const item023: API.RowResponseZTMI023OUT = get(data023, 'MT_ZTMI023_OUT.row[0]');
        const item023TorType = get(item023, 'TOR_TYPE');
        const item023Status = get(item023, 'ZVTP_CUST_STATUS');

        if (
          // Chuyến thư
          (item023TorType === SipDataType.CHUYEN_THU && item023Status === SipDataState.CHUYEN_THU_DEN) ||
          // Tải / Kiện
          (includes([SipDataType.TAI, SipDataType.KIEN], item023TorType) &&
            item023Status === SipDataState.CHUYEN_THU_DA_QUET_NHAN) ||
          // Bảng kê
          (SipDataType.BANG_KE === item023TorType && item023Status === SipDataState.TAI_KIEN_DA_QUET_NHAN) ||
          // Bưu gửi
          (SipDataType.BUU_GUI === item023TorType &&
            (item023Status === SipDataState.BUU_GUI_CHUA_QUET_NHAN_TAI_TTKT ||
              item023Status === SipDataState.BUU_GUI_CHUA_QUET_NHAN_TAI_BUU_CUC))
        ) {
          await post_MIOA_ZTMI022({
            FU_NO: get(item023, 'TOR_ID'),
            STATUS_ID: '1',
          });

          return item023;
        }

        if (item023TorType === SipDataType.CHUYEN_THU) {
          throw new Error('Chuyến thư không đủ điều kiện quét nhận.');
        }

        if (includes([SipDataType.TAI, SipDataType.KIEN], item023TorType)) {
          throw new Error('Tải / Kiện không đủ điều kiện quét nhận.');
        }

        if (includes([SipDataType.BANG_KE, SipDataType.BUU_GUI], item023TorType)) {
          throw new Error('Bảng kê / Bưu gửi không đủ điều kiện quét nhận.');
        }

        throw new Error('Dữ liệu không đúng để quét nhận.');
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
        const maBP = select(makeSelectorBPOrg);
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

        // await sleep(1000);

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

        // await sleep(1000);

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
        const maBP = select(makeSelectorBPOrg);
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

        // await sleep(1000);

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

        // await sleep(1000);

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

        // await sleep(1000);

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
        const maBP = select(makeSelectorBPOrg);
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

        // await sleep(1000);

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

        // await sleep(1000);

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

        // await sleep(1000);

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

        // await sleep(1000);

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
        const maBP = select(makeSelectorBPOrg);
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

        // await sleep(1000);

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

        // await sleep(1000);

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

        // await sleep(1000);

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

        // await sleep(1000);

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

        // await sleep(1000);

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
  yield takeEvery(QUET_DI, takeQuetDi);
  yield takeEvery(QUET_NHAN, takeQuetNhan);
  yield takeEvery(DONG_BANG_KE_VAO_TAI_CO_SAN, takeDongBangKeVaoTaiCoSan);
  yield takeEvery(DONG_BANG_KE_VAO_TAI_MOI_TAO, takeDongBangKeVaoTaiMoiTao);
  yield takeEvery(DONG_TAI_VAO_CHUYEN_THU_CO_SAN, takeActionDongTaiVaoChuyenThuCoSan);
  yield takeEvery(DONG_TAI_VAO_CHUYEN_THU_TAO_MOI, takeActionDongTaiVaoChuyenThuTaoMoi);
}
