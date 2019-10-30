import { SagaIterator } from 'redux-saga';
import { size } from 'lodash';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { crmCommodityApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_COMMODITY_SUGGEST } from './actions';

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

export default function*(): SagaIterator {
  yield takeLatest(ACTION_COMMODITY_SUGGEST, takeGet_COMMODITY_SUGGEST);
}
