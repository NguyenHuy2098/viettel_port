import { SagaIterator } from 'redux-saga';
import { size } from 'lodash';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { crmApiMap } from 'utils/apisMap';
import { crmApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_LOCATIONSUGGEST } from './actions';

function* takeGet_LOCATIONSUGGEST(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<SuggestedLocation> => {
        const { data } = await crmApi.get(crmApiMap.suggest, {
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
  yield takeLatest(ACTION_LOCATIONSUGGEST, takeGet_LOCATIONSUGGEST);
}
