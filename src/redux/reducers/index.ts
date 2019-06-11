import { combineReducers } from 'redux';
import { hello } from './hello/reducers';

const reducers = combineReducers({ hello });

export default reducers;
