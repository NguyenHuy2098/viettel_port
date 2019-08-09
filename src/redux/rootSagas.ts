import { SagaIterator } from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import watchAuthSagaAsync from './auth/sagas';
import watchErrorsSagaAsync from './errors/sagas';
import watch_MIOA_ZTMI016_SagaAsync from './MIOA_ZTMI016/sagas';
import watch_MIOA_ZTMI022_SagaAsync from './MIOA_ZTMI022/sagas';
import watch_MIOA_ZTMI023_SagaAsync from './MIOA_ZTMI023/sagas';
import watch_MIOA_ZTMI046_SagaAsync from './MIOA_ZTMI046/sagas';
import watch_MIOA_ZTMI047_SagaAsync from './MIOA_ZTMI047/sagas';
import watch_MIOA_ZTMI012_SagaAsync from './MIOA_ZTMI012/sagas';
import watch_apiGetAddress_SagaAsync from './SearchLocation/sagas';

export default function* rootSagas(): SagaIterator {
  yield all([
    call(watchAuthSagaAsync),
    call(watchErrorsSagaAsync),
    call(watch_MIOA_ZTMI016_SagaAsync),
    call(watch_MIOA_ZTMI022_SagaAsync),
    call(watch_MIOA_ZTMI023_SagaAsync),
    call(watch_MIOA_ZTMI046_SagaAsync),
    call(watch_MIOA_ZTMI047_SagaAsync),
    call(watch_MIOA_ZTMI012_SagaAsync),
    call(watch_apiGetAddress_SagaAsync),
  ]);
}
