import { createAction } from 'redux-unfold-saga';

export const ACTION_RECENT_ORDER_SUGGEST = 'ACTION_RECENT_ORDER_SUGGEST';

export const ACTION_MOST_ORDER_SUGGEST = 'ACTION_MOST_ORDER_SUGGEST';

export const action_RECENT_ORDER_SUGGEST = createAction(ACTION_RECENT_ORDER_SUGGEST);

export const action_MOST_ORDER_SUGGEST = createAction(ACTION_MOST_ORDER_SUGGEST);
