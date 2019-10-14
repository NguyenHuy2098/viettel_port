import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';

import { ACTION_MIOA_ZTMI054 } from './actions';
import { post_MIOA_ZTMI054 } from './helpers';

export default function*(): SagaIterator {
  yield takeEvery(ACTION_MIOA_ZTMI054, function*(action: UnfoldSagaActionType): Iterable<SagaIterator> {
    yield unfoldSaga(
      {
        handler: () => post_MIOA_ZTMI054(action.payload),
        key: action.type,
      },
      action.callbacks,
    );
  });
}
