import { SagaIterator } from 'redux-saga';
import { get } from 'lodash';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { crmApiMapParam } from 'utils/apisMap';
import { crmApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_LOCATIONSUGGEST_DETAIL } from './actions';

function* takeGet_LOCATIONSUGGEST_DETAIL(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<DetailSuggestedLocation> => {
        const { data } = await crmApi.get(`${crmApiMapParam}${get(action, 'payload.id')}`);
        return data;
        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeLatest(ACTION_LOCATIONSUGGEST_DETAIL, takeGet_LOCATIONSUGGEST_DETAIL);
}
