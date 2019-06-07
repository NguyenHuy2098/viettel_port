import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers/index'
import rootSage from './sagas/index'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSage)

export default store