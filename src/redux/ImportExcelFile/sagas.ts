import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';

import { ACTION_IMPORT_EXCEL } from './actions';
import { importExcelFile } from './helpers';

function* importExcel(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: () => importExcelFile(action.payload),
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_IMPORT_EXCEL, importExcel);
}
