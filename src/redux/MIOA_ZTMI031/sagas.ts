import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { get } from 'lodash';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_MIOA_ZTMI031, ACTION_CHECK_MIOA_ZTMI031 } from './actions';

function* takeGet_MIOA_ZTMI031(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.MIOAZTMI031Response> => {
        const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI031, action.payload);
        if (data.Status) return get(data, 'MT_ZTMI031_OUT.Row');
        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_MIOA_ZTMI031, takeGet_MIOA_ZTMI031);
  yield takeEvery(ACTION_CHECK_MIOA_ZTMI031, takeGet_MIOA_ZTMI031);
}
