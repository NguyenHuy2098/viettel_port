import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';

import { ACTION_ZFI007 } from './actions';
import { post_ZFI007 } from './helpers';

function* takeGet_ZFI007(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: () => post_ZFI007(action.payload),
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_ZFI007, takeGet_ZFI007);
}
