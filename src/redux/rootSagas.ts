import { SagaIterator } from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import watchAuthSagaAsync from './auth/sagas';
import watchErrorsSagaAsync from './errors/sagas';
import watchPostSagaAsync from './posts/sagas';
import watchBangKeSagaAsync from './bangKe/sagas';

export default function* rootSagas(): SagaIterator {
  yield all([
    call(watchAuthSagaAsync),
    call(watchErrorsSagaAsync),
    call(watchPostSagaAsync),
    call(watchBangKeSagaAsync),
  ]);
}
