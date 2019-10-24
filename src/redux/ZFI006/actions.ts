import { createAction } from 'redux-unfold-saga';

export const ACTION_ZFI006 = 'ACTION_ZFI006';

export const action_ZFI006 = createAction<Partial<API.ZFI006Request>, {}>(ACTION_ZFI006);
