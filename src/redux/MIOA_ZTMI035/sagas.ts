import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_MIOA_ZTMI035 } from './actions';

function* takeGet_MIOA_ZTMI035(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<MIOAZTMI035PayloadType> => {
        const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI035, action.payload);
        if (data.Status)
          return {
            data,
            params: action.payload,
          };
        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_MIOA_ZTMI035, takeGet_MIOA_ZTMI035);
}
