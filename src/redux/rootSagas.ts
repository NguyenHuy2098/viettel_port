import { SagaIterator } from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import watchAuthSagaAsync from './auth/sagas';
import watchCommonSagaAsync from './common/sagas';
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
import watch_LocationSearch_SagaAsync from './LocationSearch/sagas';
import watch_SIOA_ZTMI068_SagaAsync from './SIOA_ZTMI068/sagas';
import watch_ZTMI236_SagaAsync from './ZTMI236/sagas';
import watch_ZTMI240_SagaAsync from './ZTMI240/sagas';
import watch_ZTMI241_SagaAsync from './ZTMI241/sagas';
import watch_ZTMI213_SagaAsync from './ZTMI213/sagas';
import watch_ZTMI235_SagaAsync from './ZTMI235/sagas';
import watch_ZTMI239_SagaAsync from './ZTMI239/sagas';
import watch_ZFI001_SagaAsync from './ZFI001/sagas';
import watch_ZFI002_SagaAsync from './ZFI002/sagas';
import watch_ZFI003_SagaAsync from './ZFI003/sagas';
import watch_ZFI004_SagaAsync from './ZFI004/sagas';
import watch_ZFI006_SagaAsync from './ZFI006/sagas';
import watch_ZFI007_SagaAsync from './ZFI007/sagas';
import watch_LocationSuggest from './LocationSuggest/sagas';
import watch_LocationSuggestDetail from './LocationSuggestDetail/sagas';

export default function* rootSagas(): SagaIterator {
  yield all([
    call(watchAuthSagaAsync),
    call(watchCommonSagaAsync),
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
    call(watch_LocationSearch_SagaAsync),
    call(watch_SIOA_ZTMI068_SagaAsync),
    call(watch_ZTMI236_SagaAsync),
    call(watch_ZTMI240_SagaAsync),
    call(watch_ZTMI241_SagaAsync),
    call(watch_ZTMI213_SagaAsync),
    call(watch_ZTMI235_SagaAsync),
    call(watch_ZTMI239_SagaAsync),
    call(watch_ZFI001_SagaAsync),
    call(watch_ZFI002_SagaAsync),
    call(watch_ZFI003_SagaAsync),
    call(watch_ZFI004_SagaAsync),
    call(watch_ZFI006_SagaAsync),
    call(watch_ZFI007_SagaAsync),
    call(watch_LocationSuggest),
    call(watch_LocationSuggestDetail),
  ]);
}
