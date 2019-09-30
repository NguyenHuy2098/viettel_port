import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';

import { ACTION_MIOA_ZTMI023 } from './actions';
import { getZTMI023 } from './helpers';

function* takeGet_MIOA_ZTMI023(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: () => getZTMI023(action.payload),
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeLatest(ACTION_MIOA_ZTMI023, takeGet_MIOA_ZTMI023);
}
