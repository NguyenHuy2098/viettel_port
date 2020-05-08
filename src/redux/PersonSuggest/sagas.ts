import { SagaIterator } from 'redux-saga';
import { size } from 'lodash';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { crmBackendApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_RECEIVER_SUGGEST, ACTION_SENDER_SUGGEST } from './actions';

function* takeGet_SENDER_SUGGEST(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<OrderSuggestedItem> => {
        const { data } = await crmBackendApi.get('/order/v1.0/sender/_suggest', {
          params: action.payload,
        });
        if (size(data)) return data;
        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

function* takeGet_RECEIVER_SUGGEST(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<OrderSuggestedItem> => {
        const { data } = await crmBackendApi.get('/order/v1.0/receiver/_suggest', {
          params: action.payload,
        });
        if (size(data)) return data;
        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeLatest(ACTION_SENDER_SUGGEST, takeGet_SENDER_SUGGEST);
  yield takeLatest(ACTION_RECEIVER_SUGGEST, takeGet_RECEIVER_SUGGEST);
}
