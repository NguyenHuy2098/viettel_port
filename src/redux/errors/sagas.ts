import { AnyAction } from 'redux';
import { SagaIterator } from 'redux-saga';
import { call, takeEvery } from 'redux-saga/effects';
import { UnfoldSagaActionType } from 'redux-unfold-saga';

function* takeError(action: UnfoldSagaActionType): SagaIterator {
  // eslint-disable-next-line no-console
  yield call(console.log, `Failed at ${action.type} with ${action.payload}`);
}

export default function* watchErrorsSagaAsync(): SagaIterator {
  yield takeEvery((action: AnyAction): boolean => {
    return /[A-Z_0-9]+_FAILED$/.test(action.type);
  }, takeError);
}
