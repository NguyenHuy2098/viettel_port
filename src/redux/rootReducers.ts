import { combineReducers, Reducer } from 'redux';
import { reducer as oidcReducer, UserState } from 'redux-oidc';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import GetProfileByUsername from './GetProfileByUsername/reducers';
import MIOA_ZTMI023 from './MIOA_ZTMI023/reducers';
import MIOA_ZTMI031 from './MIOA_ZTMI031/reducers';
import MIOA_ZTMI035 from './MIOA_ZTMI035/reducers';
import MIOA_ZTMI040 from './MIOA_ZTMI040/reducers';
import MIOA_ZTMI045 from './MIOA_ZTMI045/reducers';
import MIOA_ZTMI046 from './MIOA_ZTMI046/reducers';
import MIOA_ZTMI047 from './MIOA_ZTMI047/reducers';
import MIOA_ZTMI054 from './MIOA_ZTMI054/reducers';
import MIOA_ZTMI055 from './MIOA_ZTMI055/reducers';
import ZTMI236 from './ZTMI236/reducers';
import ZTMI240 from './ZTMI240/reducers';
import ZTMI241 from './ZTMI241/reducers';
import ZTMI213 from './ZTMI213/reducers';
import ZFI001 from './ZFI001/reducers';
import ZFI002 from './ZFI002/reducers';
import ZFI003 from './ZFI003/reducers';
import ZFI005 from './ZFI005/reducers';
import ZFI006 from './ZFI006/reducers';
import ZFI007 from './ZFI007/reducers';
import ZFI007M from './ZFI007M/reducers';

interface RootState {
  auth: UserState;
  router: RouterState;
  profileByUsername: SSOAPI.UserSapMappingGetByUsernameResponse;
  MIOA_ZTMI023: MIOAZTMI023StateType;
  MIOA_ZTMI035: MIOAZTMI035StateType;
  MIOA_ZTMI046: MIOAZTMI046StateType;
  MIOA_ZTMI047: MIOAZTMI047StateType;
  MIOA_ZTMI031: MIOAZTMI031StateType;
  MIOA_ZTMI040: MIOAZTMI040StateType;
  MIOA_ZTMI045: MIOAZTMI045StateType;
  MIOA_ZTMI054: MIOAZTMI054StateType;
  MIOA_ZTMI055: MIOAZTMI055StateType;
  ZTMI236: ZTMI236StateType;
  ZTMI240: MTZTMI240Row[];
  ZTMI241: API.MTZTMI241OUT;
  ZTMI213: ZTMI213StateType;
  ZFI001: ZFI001StateType;
  ZFI002: ZFI002StateType;
  ZFI003: ZFI003StateType;
  ZFI005: ZFI005StateType;
  ZFI006: ZFI006StateType;
  ZFI007: ZFI007StateType;
  ZFI007M: ZFI007MStateType;
}

function createRootReducers(history: History): Reducer<RootState> {
  return combineReducers<RootState>({
    auth: oidcReducer,
    router: connectRouter(history),
    profileByUsername: GetProfileByUsername,
    MIOA_ZTMI023,
    MIOA_ZTMI031,
    MIOA_ZTMI035,
    MIOA_ZTMI040,
    MIOA_ZTMI045,
    MIOA_ZTMI046,
    MIOA_ZTMI047,
    MIOA_ZTMI054,
    MIOA_ZTMI055,
    ZTMI236,
    ZTMI240,
    ZTMI241,
    ZTMI213,
    ZFI001,
    ZFI002,
    ZFI003,
    ZFI005,
    ZFI006,
    ZFI007,
    ZFI007M,
  });
}

export default createRootReducers;
