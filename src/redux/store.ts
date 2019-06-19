import { loadUser } from 'redux-oidc';
import { configureStore } from 'redux-starter-kit';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import history from 'utils/history';
import userManager from 'utils/userManager';
import createRootReducer from './rootReducers';
import rootSaga from './rootSagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = createRootReducer(history);

const store = configureStore({
  middleware: [sagaMiddleware, routerMiddleware(history)],
  reducer: rootReducer,
});

sagaMiddleware.run(rootSaga);

loadUser(store, userManager);

export type AppStateType = ReturnType<typeof rootReducer>;

export default store;
