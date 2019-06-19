import { all } from 'redux-saga/effects';
import watchAuthSagaAsync from './auth/sagas';
import watchPostSagaAsync from './posts/sagas';

export default function* rootSagas(): IterableIterator<any> {
  yield all([watchAuthSagaAsync(), watchPostSagaAsync()]);
}
