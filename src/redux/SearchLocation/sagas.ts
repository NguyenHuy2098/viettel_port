import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import apisMap from 'utils/apisMap';
import request from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_GET_PROVINCE, ACTION_GET_DISTRICT, ACTION_GET_WARD } from './actions';

function* takeGet_ADDRESS(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.VtpAddressResponse> => {
        const { data } = await request({
          url: apisMap.SearchLocation,
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
  yield takeEvery(ACTION_GET_PROVINCE, takeGet_ADDRESS);
  yield takeEvery(ACTION_GET_DISTRICT, takeGet_ADDRESS);
  yield takeEvery(ACTION_GET_WARD, takeGet_ADDRESS);
}
