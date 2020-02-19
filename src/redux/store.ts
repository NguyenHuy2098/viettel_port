import { loadUser } from 'redux-oidc';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import history from 'utils/history';
import { loadState, saveState } from 'utils/localStorageHelpers';
import userManager from 'utils/userManager';
import createRootReducer from './rootReducers';
import rootSaga from './rootSagas';

const preloadedState = loadState();
const sagaMiddleware = createSagaMiddleware();
const rootReducer = createRootReducer(history);

const store = configureStore({
  middleware: [sagaMiddleware, routerMiddleware(history)],
  preloadedState,
  reducer: rootReducer,
});

store.subscribe((): void => {
  saveState({
    auth: store.getState().auth,
    profileByUsername: store.getState().profileByUsername,
  });
});

sagaMiddleware.run(rootSaga);

loadUser(store, userManager);

export type AppStateType = ReturnType<typeof rootReducer>;

export default store;
