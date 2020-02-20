import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { get, toString } from 'lodash';

import { select } from 'utils/stateHelpers';
import { DONG_TAI_VAO_CHUYEN_THU_CO_SAN, DONG_TAI_VAO_CHUYEN_THU_TAO_MOI } from './secondaryActions';
import { post_MIOA_ZTMI016 } from '../MIOA_ZTMI016/helpers';
import { IV_FLAG, SipDataType } from '../../utils/enums';
import { makeSelectorBPOrg } from '../GetProfileByUsername/selectors';

// eslint-disable-next-line max-lines-per-function
function* takeActionDongTaiVaoChuyenThuCoSan(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      // eslint-disable-next-line max-lines-per-function
      handler: async (): Promise<API.MIOAZTMI016Response> => {
        const userMaBp = select(makeSelectorBPOrg);
        const { firstSelectedBangKe, forwardingItemListState, selectedChuyenThu } = action.payload;

        // tao tai moi voi diem den la diem den cua bang ke hien tai
        const data0 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.TAO),
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: '',
          // theo VinhPT , userMaBp == bp_org_unit trong SSO
          IV_SLOCATION: userMaBp,
          // theo VinhPT lay tu tai dau tien
          IV_DLOCATION: get(firstSelectedBangKe, 'LOG_LOCID_TO'),
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        });
        const maTaiVuaTao = get(data0, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
        // add bang ke duoc chon vao tai moi tao
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data1 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: maTaiVuaTao,
          // theo VinhPT , userMaBp == bp_org_unit trong SSO
          IV_SLOCATION: userMaBp,
          // theo VinhPT lay tu tai dau tien
          IV_DLOCATION: get(firstSelectedBangKe, 'LOG_LOCID_TO'),
          IV_DESCRIPTION: '',
          T_ITEM: forwardingItemListState,
        });
        //add tai vua tao vao chuyen thu duoc chon
        const data2 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_TOR_ID_CU: get(selectedChuyenThu, ' TOR_ID', ''),
          IV_SLOCATION: get(selectedChuyenThu, ' LOG_LOCID_FR', ''),
          IV_DLOCATION: get(selectedChuyenThu, 'LOG_LOCID_TO', ''),
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: maTaiVuaTao,
              ITEM_TYPE: SipDataType.TAI,
            },
          ],
        });

        return data2;
      },
      key: action.type,
    },
    action.callbacks,
  );
} // eslint-disable-next-line max-lines-per-function
function* takeActionDongTaiVaoChuyenThuMoiTao(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      // eslint-disable-next-line max-lines-per-function
      handler: async (): Promise<API.MIOAZTMI016Response> => {
        const userMaBp = select(makeSelectorBPOrg);
        const { firstSelectedBangKe, locNo, description, forwardingItemListState } = action.payload;

        // tao 1 tai voi diem den duoc chon
        const data0 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.TAO),
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: userMaBp,
          IV_DLOCATION: get(firstSelectedBangKe, 'LOG_LOCID_TO', ''),
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        });
        const maTaiVuaTao = get(data0, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
        // add bang ke duoc chon vao tai moi tao
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data1 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: maTaiVuaTao,
          IV_SLOCATION: userMaBp,
          IV_DLOCATION: get(firstSelectedBangKe, 'LOG_LOCID_TO', ''),
          IV_DESCRIPTION: '',
          T_ITEM: forwardingItemListState,
        });
        // tao chuyen thu theo thong tin duoc chon
        const data2 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.TAO),
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: userMaBp,
          IV_DLOCATION: locNo,
          IV_DESCRIPTION: description,
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        });
        const maChuyenThuMoiTao = get(data2, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
        // add tai vua tao vao chuyen thu vua tao
        const data3 = await post_MIOA_ZTMI016({
          IV_FLAG: toString(IV_FLAG.SUA),
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_TOR_ID_CU: maChuyenThuMoiTao,
          IV_SLOCATION: userMaBp,
          IV_DLOCATION: locNo,
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: maTaiVuaTao,
              ITEM_TYPE: SipDataType.TAI,
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

export default function*(): SagaIterator {
  yield takeEvery(DONG_TAI_VAO_CHUYEN_THU_CO_SAN, takeActionDongTaiVaoChuyenThuCoSan);
  yield takeEvery(DONG_TAI_VAO_CHUYEN_THU_TAO_MOI, takeActionDongTaiVaoChuyenThuMoiTao);
}
