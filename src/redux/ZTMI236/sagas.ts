import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import { ACTION_ZTMI236 } from './actions';

function* takeGet_ZTMI236(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.MTZTMI236OUT> => {
        const { data } = await sapApi.post(sapApiMap.ZTMI236, action.payload);
        return data;
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_ZTMI236, takeGet_ZTMI236);
}
