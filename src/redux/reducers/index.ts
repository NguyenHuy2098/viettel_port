import { combineReducers } from 'redux';
import { hello } from './hello/reducers';
import posts from './posts/reducers';

const reducers = combineReducers({ hello, posts });

export default reducers;
