import { configureStore } from 'redux-starter-kit';
import createSagaMiddleware from 'redux-saga';
import { loadLoggedInUser } from 'utils/localStorageHelpers';
import rootReducer from './rootReducers';
import rootSaga from './rootSagas';

const sagaMiddleware = createSagaMiddleware();

const preloadedState = {
  auth: {
    user: loadLoggedInUser(),
  },
};

const store = configureStore({
  middleware: [sagaMiddleware],
  preloadedState,
  reducer: rootReducer,
});

sagaMiddleware.run(rootSaga);

export type AppStateType = ReturnType<typeof rootReducer>;

export default store;
