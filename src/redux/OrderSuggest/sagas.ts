import { SagaIterator } from 'redux-saga';
import { size } from 'lodash';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { crmBackendApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_MOST_ORDER_SUGGEST, ACTION_RECENT_ORDER_SUGGEST } from './actions';

function* takeGet_RECENT_ORDER_SUGGEST(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<OrderSuggestedItem[]> => {
        const { data } = await crmBackendApi.get('/order/v1.0/orders/recent', {
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

function* takeGet_MOST_ORDER_SUGGEST(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<OrderSuggestedItem[]> => {
        const { data } = await crmBackendApi.get('/order/v1.0/orders/most', {
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
  yield takeLatest(ACTION_RECENT_ORDER_SUGGEST, takeGet_RECENT_ORDER_SUGGEST);
  yield takeLatest(ACTION_MOST_ORDER_SUGGEST, takeGet_MOST_ORDER_SUGGEST);
}
