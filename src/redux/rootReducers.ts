import { combineReducers, Reducer } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import MIOA_ZTMI023 from './MIOA_ZTMI023/reducers';
import MIOA_ZTMI046 from './MIOA_ZTMI046/reducers';
import MIOA_ZTMI047 from './MIOA_ZTMI047/reducers';
import SearchLocation from './SearchLocation/reducers';

function createRootReducers(history: History): Reducer {
  return combineReducers({
    auth: oidcReducer,
    router: connectRouter(history),
    MIOA_ZTMI023,
    MIOA_ZTMI046,
    MIOA_ZTMI047,
    SearchLocation,
  });
}

export default createRootReducers;
