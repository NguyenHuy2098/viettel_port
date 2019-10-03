import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';

import { ACTION_MIOA_ZTMI046 } from './actions';
import { post_MIOA_ZTMI046 } from './helpers';

export default function*(): SagaIterator {
  yield takeLatest(ACTION_MIOA_ZTMI046, function*(action: UnfoldSagaActionType): Iterable<SagaIterator> {
    yield unfoldSaga(
      {
        handler: () => post_MIOA_ZTMI046(action.payload),
        key: action.type,
      },
      action.callbacks,
      action.options,
    );
  });
}
