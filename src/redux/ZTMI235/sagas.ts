import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
// import { sapApiMap } from 'utils/apisMap';
import { lvcSapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_MIOA_ZTMI235 } from './actions';

function* takeGet_MIOA_ZTMI235(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<ZTMI235Response> => {
        const res = await lvcSapApi.get('lvc', {
          params: action.payload,
        });
        if (res.status === 200) {
          return res.data;
        }
        throw new HttpRequestError(res.data.ErrorCode, res.data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeLatest(ACTION_MIOA_ZTMI235, takeGet_MIOA_ZTMI235);
}
