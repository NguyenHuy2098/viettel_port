import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // https://github.com/zalmoxisus/redux-devtools-extension

import reducers from './reducers/index';
import rootSagas from './sagas';

export type AppState = ReturnType<typeof reducers>;

const sagaMiddleware = createSagaMiddleware();

const middlewares = [];

middlewares.push(sagaMiddleware);

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSagas);

export default store;
