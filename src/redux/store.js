import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers/index'
import rootSaga from './sagas/index'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly' // https://github.com/zalmoxisus/redux-devtools-extension

const sagaMiddleware = createSagaMiddleware()

const middlewares = []

middlewares.push(sagaMiddleware)

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)))

sagaMiddleware.run(rootSaga)

export default store