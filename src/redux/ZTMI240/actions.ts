import { createAction } from 'redux-unfold-saga';

export const ACTION_ZTMI240 = 'ACTION_ZTMI240';

export const action_ZTMI240 = createAction<API.ZTMI240Request, {}>(ACTION_ZTMI240);
