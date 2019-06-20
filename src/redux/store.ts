import { loadUser } from 'redux-oidc';
import { configureStore } from 'redux-starter-kit';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import history from 'utils/history';
import userManager from 'utils/userManager';
import createRootReducer from './rootReducers';
import rootSaga from './rootSagas';
import { loadState, saveState } from '../utils/localStorageHelpers';

const persistedState = loadState();

const sagaMiddleware = createSagaMiddleware();

const rootReducer = createRootReducer(history);

const store = configureStore({
  middleware: [sagaMiddleware, routerMiddleware(history)],
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe((): void => {
  saveState({
    auth: store.getState().auth,
  });
});

sagaMiddleware.run(rootSaga);

loadUser(store, userManager);

export type AppStateType = ReturnType<typeof rootReducer>;

export default store;
