import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import apisMap from 'utils/apisMap';
import request from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_MIOA_ZTMI022 } from './actions';

function* takeGet_MIOA_ZTMI022(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.MIOAZTMI022Response> => {
        const results = await request({
          url: apisMap.MIOA_ZTMI022,
          data: action.payload,
        });
        if (results.data.Status) return results.data;
        throw new HttpRequestError(results.data.ErrorCode, results.data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeLatest(ACTION_MIOA_ZTMI022, takeGet_MIOA_ZTMI022);
}
