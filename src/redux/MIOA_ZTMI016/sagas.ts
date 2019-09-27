import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { get, toNumber } from 'lodash';

import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_MIOA_ZTMI016 } from './actions';

function* takeGet_MIOA_ZTMI016(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.MIOAZTMI016Response> => {
        const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI016, action.payload);
        if (toNumber(get(data, 'MT_ZTMI016_OUT.ev_error')) !== 1) {
          throw new HttpRequestError(data.ErrorCode, [get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE')]);
        }
        if (data.Status) return data;

        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_MIOA_ZTMI016, takeGet_MIOA_ZTMI016);
}
