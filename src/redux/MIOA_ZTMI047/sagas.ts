import { SagaIterator } from 'redux-saga';
import { select, takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import moment from 'moment';

import { makeSelectorMaBP } from 'redux/auth/selectors';
import { sapApiMap } from 'utils/apisMap';
import HttpRequestError from 'utils/HttpRequetsError';
import { sapApi } from 'utils/request';
import { ACTION_MIOA_ZTMI047 } from './actions';

export function* takeGet_MIOA_ZTMI047(action: UnfoldSagaActionType): SagaIterator {
  const maBP = yield select(makeSelectorMaBP);
  yield unfoldSaga(
    {
      handler: async (): Promise<MIOAZTMI047PayloadType> => {
        const today = moment().format('YYYYMMDD');
        const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI047, {
          IV_TOR_ID: '',
          IV_TOR_TYPE: '',
          IV_FR_LOC_ID: '',
          IV_TO_LOC_ID: maBP,
          IV_CUST_STATUS: '',
          IV_FR_DATE: today,
          IV_TO_DATE: today,
          IV_PAGENO: '1',
          IV_NO_PER_PAGE: '10',
          ...action.payload,
        });
        if (data.Status) return { data, params: action.payload };
        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_MIOA_ZTMI047, takeGet_MIOA_ZTMI047);
}
