import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';

import { ACTION_MIOA_ZTMI022 } from './actions';
import { getZTMI022 } from './helpers';

export function* takeGet_MIOA_ZTMI022(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: () => getZTMI022(action.payload),
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeLatest(ACTION_MIOA_ZTMI022, takeGet_MIOA_ZTMI022);
}
