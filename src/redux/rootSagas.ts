import { SagaIterator } from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import watchAuthSagaAsync from './auth/sagas';
import watchErrorsSagaAsync from './errors/sagas';
import watch_MIOA_ZTMI016_SagaAsync from './MIOA_ZTMI016/sagas';
import watch_MIOA_ZTMI022_SagaAsync from './MIOA_ZTMI022/sagas';
import watch_MIOA_ZTMI023_SagaAsync from './MIOA_ZTMI023/sagas';
import watch_MIOA_ZTMI035_SagaAsync from './MIOA_ZTMI035/sagas';
import watch_MIOA_ZTMI046_SagaAsync from './MIOA_ZTMI046/sagas';
import watch_MIOA_ZTMI047_SagaAsync from './MIOA_ZTMI047/sagas';
import watch_MIOA_ZTMI040_SagaAsync from './MIOA_ZTMI040/sagas';
import watch_MIOA_ZTMI012_SagaAsync from './MIOA_ZTMI012/sagas';
import watch_MIOA_ZTMI011_SagaAsync from './MIOA_ZTMI011/sagas';
import watch_MIOA_ZTMI031_SagaAsync from './MIOA_ZTMI031/sagas';
import watch_MIOA_ZTMI045_SagaAsync from './MIOA_ZTMI045/sagas';
import watch_MIOA_ZTMI054_SagaAsync from './MIOA_ZTMI054/sagas';
import watch_MIOA_ZTMI055_SagaAsync from './MIOA_ZTMI055/sagas';
import watch_MIOA_ZTMI063_SagaAsync from './MIOA_ZTMI063/sagas';
import watch_SearchLocation_SagaAsync from './SearchLocation/sagas';
import watch_SIOA_ZTMI068_SagaAsync from './SIOA_ZTMI068/sagas';
import watch_ZTMI236_SagaAsync from './ZTMI236/sagas';
import watch_ZTMI240_SagaAsync from './ZTMI240/sagas';
import watch_ZTMI241_SagaAsync from './ZTMI241/sagas';

export default function* rootSagas(): SagaIterator {
  yield all([
    call(watchAuthSagaAsync),
    call(watchErrorsSagaAsync),
    call(watch_MIOA_ZTMI016_SagaAsync),
    call(watch_MIOA_ZTMI022_SagaAsync),
    call(watch_MIOA_ZTMI023_SagaAsync),
    call(watch_MIOA_ZTMI035_SagaAsync),
    call(watch_MIOA_ZTMI046_SagaAsync),
    call(watch_MIOA_ZTMI047_SagaAsync),
    call(watch_MIOA_ZTMI040_SagaAsync),
    call(watch_MIOA_ZTMI012_SagaAsync),
    call(watch_MIOA_ZTMI011_SagaAsync),
    call(watch_MIOA_ZTMI031_SagaAsync),
    call(watch_MIOA_ZTMI045_SagaAsync),
    call(watch_MIOA_ZTMI054_SagaAsync),
    call(watch_MIOA_ZTMI055_SagaAsync),
    call(watch_MIOA_ZTMI063_SagaAsync),
    call(watch_SearchLocation_SagaAsync),
    call(watch_SIOA_ZTMI068_SagaAsync),
    call(watch_ZTMI236_SagaAsync),
    call(watch_ZTMI240_SagaAsync),
    call(watch_ZTMI241_SagaAsync),
  ]);
}
