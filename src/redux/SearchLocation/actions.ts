import { createAction } from 'redux-unfold-saga';

export const ACTION_GET_PROVINCE = 'ACTION_GET_PROVINCE';
export const ACTION_GET_DISTRICT = 'ACTION_GET_DISTRICT';
export const ACTION_GET_WARD = 'ACTION_GET_WARD';

export const action_GET_PROVINCE = createAction(ACTION_GET_PROVINCE);
export const action_GET_DISTRICT = createAction(ACTION_GET_DISTRICT);
export const action_GET_WARD = createAction(ACTION_GET_WARD);
