import { combineReducers, Reducer } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import MIOA_ZTMI047 from './MIOA_ZTMI047/reducers';
import MIOA_ZTMI046 from './MIOA_ZTMI046/reducers';

function createRootReducers(history: History): Reducer {
  return combineReducers({
    auth: oidcReducer,
    router: connectRouter(history),
    MIOA_ZTMI046,
    MIOA_ZTMI047,
  });
}

export default createRootReducers;
