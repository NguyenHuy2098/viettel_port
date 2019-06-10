import { combineReducers } from 'redux';
import { hello, helloSaga } from './hello/index';

const reducers = combineReducers({ hello, helloSaga });

export default reducers;
