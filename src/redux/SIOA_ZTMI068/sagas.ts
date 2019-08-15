import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import apisMap from 'utils/apisMap';
import request from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_GET_TRANSPORT_METHOD } from './actions';

function* takeGet_TRANSPORT_METHOD(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.MTZTMI068Response> => {
        const { data } = await request({
          url: apisMap.SIOA_ZTMI068,
          data: action.payload,
        });
        if (data.Status) return data;
        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_GET_TRANSPORT_METHOD, takeGet_TRANSPORT_METHOD);
}
