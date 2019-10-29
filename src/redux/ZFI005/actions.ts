import { createAction } from 'redux-unfold-saga';

export const ACTION_ZFI005 = 'ACTION_ZFI005';

export const action_ZFI005 = createAction<Partial<API.ZFI005Request>, {}>(ACTION_ZFI005);
