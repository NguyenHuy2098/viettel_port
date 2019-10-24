import { createAction } from 'redux-unfold-saga';

export const ACTION_ZFI003 = 'ACTION_ZFI003';

export const action_ZFI003 = createAction<Partial<API.ZFI003Request>, {}>(ACTION_ZFI003);
