import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';

import { ACTION_COD_CHUA_CHOT } from './actions';
import { post_COD_Chua_Chot } from './helpers';

function* takeGet_COD_Chua_Chot(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: () => post_COD_Chua_Chot(action.payload),
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_COD_CHUA_CHOT, takeGet_COD_Chua_Chot);
  // yield takeEvery(ACTION_CHECK_MIOA_ZTMI031, takeGet_MIOA_ZTMI031);
}
