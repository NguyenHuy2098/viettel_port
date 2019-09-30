import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { get } from 'lodash';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_ZTMI213 } from './actions';

function* takeGet_ZTMI213(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.ZTMI213Response> => {
        const { data } = await sapApi.post(sapApiMap.ZTMI213, action.payload);
        if (get(data, 'MT_ZTMI213_OUT.EV_ERROR') !== 1)
          throw new HttpRequestError(data.ErrorCode, get(data, 'MT_ZTMI213_OUT.RETURN_MESSAGE.MESSAGE'));
        if (data.Status) return get(data, 'MT_ZTMI213_OUT');
        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_ZTMI213, takeGet_ZTMI213);
}
