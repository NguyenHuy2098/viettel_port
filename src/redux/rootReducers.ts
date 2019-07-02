import { combineReducers, Reducer } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import posts from './posts/reducers';
import bangKe from './bangKe/reducers';

function createRootReducers(history: History): Reducer {
  return combineReducers({
    auth: oidcReducer,
    posts,
    router: connectRouter(history),
    bangKe,
  });
}

export default createRootReducers;
