import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';

import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_MIOA_ZTMI055 } from './actions';

export default function*(): SagaIterator {
  yield takeEvery(ACTION_MIOA_ZTMI055, function*(action: UnfoldSagaActionType): Iterable<SagaIterator> {
    yield unfoldSaga(
      {
        handler: async (): Promise<API.MIOAZTMI055Response> => {
          const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI055, action.payload);
          if (data.Status) return data;
          throw new HttpRequestError(data.ErrorCode, data.Messages);
        },
        key: action.type,
      },
      action.callbacks,
    );
  });
}
