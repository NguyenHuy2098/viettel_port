import { createAction } from 'redux-unfold-saga';

export const ACTION_SENDER_SUGGEST = 'ACTION_SENDER_SUGGEST';

export const ACTION_RECEIVER_SUGGEST = 'ACTION_RECEIVER_SUGGEST';

export const action_SENDER_SUGGEST = createAction(ACTION_SENDER_SUGGEST);

export const action_RECEIVER_SUGGEST = createAction(ACTION_RECEIVER_SUGGEST);
