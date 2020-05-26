import { SagaIterator } from 'redux-saga';
import { size } from 'lodash';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { crmCommodityApi, crmBackendApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_COMMODITY_SUGGEST, ACTION_COMMODITY_SUGGEST_INTER } from './actions';

function* takeGet_COMMODITY_SUGGEST(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<SuggestedCommodity> => {
        const { data } = await crmCommodityApi.get('', {
          params: action.payload,
        });
        if (size(data.items)) return data;
        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

function* takeGet_COMMODITY_SUGGEST_INTER(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<SuggestedCommodity> => {
        const { data } = await crmBackendApi.get('/order/v1.0/product/_suggest', {
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
  yield takeLatest(ACTION_COMMODITY_SUGGEST, takeGet_COMMODITY_SUGGEST);
  yield takeLatest(ACTION_COMMODITY_SUGGEST_INTER, takeGet_COMMODITY_SUGGEST_INTER);
}
