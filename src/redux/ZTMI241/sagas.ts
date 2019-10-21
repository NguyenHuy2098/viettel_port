import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { get } from 'lodash';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_ZTMI241 } from './actions';

function* takeGet_ZTMI241(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.ZTMI241Response> => {
        const { data } = await sapApi.post(sapApiMap.ZTMI241, action.payload);
        if (data.Status) return get(data, 'MT_ZTMI241_OUT');
        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
    action.options,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_ZTMI241, takeGet_ZTMI241);
}
