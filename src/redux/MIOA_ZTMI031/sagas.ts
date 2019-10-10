import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';

import { ACTION_MIOA_ZTMI031, ACTION_CHECK_MIOA_ZTMI031 } from './actions';
import { post_MIOA_ZTMI031 } from './helpers';

function* takeGet_MIOA_ZTMI031(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: () => post_MIOA_ZTMI031(action.payload),
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_MIOA_ZTMI031, takeGet_MIOA_ZTMI031);
  yield takeEvery(ACTION_CHECK_MIOA_ZTMI031, takeGet_MIOA_ZTMI031);
}
