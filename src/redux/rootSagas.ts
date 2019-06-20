import { SagaIterator } from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import watchAuthSagaAsync from './auth/sagas';
import watchPostSagaAsync from './posts/sagas';

export default function* rootSagas(): SagaIterator {
  yield all([call(watchAuthSagaAsync), call(watchPostSagaAsync)]);
}
