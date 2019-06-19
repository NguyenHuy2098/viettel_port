import { combineReducers } from 'redux';
import auth from './auth/reducers';
import posts from './posts/reducers';

const reducers = combineReducers({ auth, posts });

export default reducers;
