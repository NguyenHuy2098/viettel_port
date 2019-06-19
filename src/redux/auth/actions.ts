import { createAction } from 'redux-unfold-saga';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const login = createAction(LOG_IN);
export const logout = createAction(LOG_OUT);
