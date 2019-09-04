import { combineReducers, Reducer } from 'redux';
import { reducer as oidcReducer, UserState } from 'redux-oidc';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import MIOA_ZTMI023 from './MIOA_ZTMI023/reducers';
import MIOA_ZTMI046 from './MIOA_ZTMI046/reducers';
import MIOA_ZTMI047 from './MIOA_ZTMI047/reducers';
import MIOA_ZTMI031 from './MIOA_ZTMI031/reducers';
import MIOA_ZTMI040 from './MIOA_ZTMI040/reducers';
import MIOA_ZTMI045 from './MIOA_ZTMI045/reducers';

interface RootState {
  auth: UserState;
  router: RouterState;
  MIOA_ZTMI023: MIOAZTMI023StateType;
  MIOA_ZTMI046: MIOAZTMI046StateType;
  MIOA_ZTMI047: MIOAZTMI047StateType;
  MIOA_ZTMI031: API.RowMTZTMI031OUT[];
  MIOA_ZTMI040: MIOAZTMI040StateType;
  MIOA_ZTMI045: MIOAZTMI045StateType;
}

function createRootReducers(history: History): Reducer<RootState> {
  return combineReducers<RootState>({
    auth: oidcReducer,
    // @ts-ignore
    router: connectRouter(history),
    MIOA_ZTMI023,
    MIOA_ZTMI046,
    MIOA_ZTMI047,
    MIOA_ZTMI031,
    MIOA_ZTMI040,
    MIOA_ZTMI045,
  });
}

export default createRootReducers;
