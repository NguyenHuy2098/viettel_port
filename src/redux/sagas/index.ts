import { all } from 'redux-saga/effects';
import watchHelloSagaAsync from './hello';

export default function* rootSaga(): IterableIterator<any> {
  yield all([watchHelloSagaAsync()]);
}
