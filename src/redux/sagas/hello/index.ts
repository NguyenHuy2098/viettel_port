import { SagaIterator } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

function* helloSaga(): SagaIterator {
  yield put({ type: 'INCREMENT' });
}

export default function* watchHelloSagaAsync(): SagaIterator {
  yield takeEvery('INCREMENT_ASYNC', helloSaga);
}
