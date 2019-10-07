import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { crmApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_MIOA_ZTMI235 } from './actions';

function* takeGet_MIOA_ZTMI235(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<ZTMI235Response> => {
        debugger;
        const { data } = await sapApi.get(crmApiMap.lvc, {
          params: action.payload,
        });
        debugger;
        if (data.Status) return data;
        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeLatest(ACTION_MIOA_ZTMI235, takeGet_MIOA_ZTMI235);
}