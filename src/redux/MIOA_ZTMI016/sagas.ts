import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';

import { ACTION_MIOA_ZTMI016 } from './actions';
import { post_MIOA_ZTMI016 } from './helpers';

function* takeGet_MIOA_ZTMI016(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: () => post_MIOA_ZTMI016(action.payload),
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_MIOA_ZTMI016, takeGet_MIOA_ZTMI016);
}
