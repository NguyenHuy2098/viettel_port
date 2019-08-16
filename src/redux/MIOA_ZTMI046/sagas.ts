import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';

import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_MIOA_ZTMI046 } from './actions';

export default function*(): SagaIterator {
  yield takeLatest(ACTION_MIOA_ZTMI046, function*(action: UnfoldSagaActionType): Iterable<SagaIterator> {
    yield unfoldSaga(
      {
        handler: async (): Promise<API.MIOAZTMI046Response> => {
          const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI046, action.payload);
          if (data.Status) return data;
          throw new HttpRequestError(data.ErrorCode, data.Messages);
        },
        key: action.type,
      },
      action.callbacks,
    );
  });
}
