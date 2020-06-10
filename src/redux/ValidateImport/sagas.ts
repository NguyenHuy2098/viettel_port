import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';

import { ACTION_VALIDATE_IMPORT } from './actions';
import { validateImportExcel } from './helpers';

function* validateImport(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: () => validateImportExcel(action.payload),
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_VALIDATE_IMPORT, validateImport);
}
