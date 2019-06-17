import { all } from 'redux-saga/effects';
import watchHelloSagaAsync from './hello';
import watchPostSagaAsync from './posts';

export default function* rootSaga(): IterableIterator<any> {
  yield all([watchHelloSagaAsync(), watchPostSagaAsync()]);
}
