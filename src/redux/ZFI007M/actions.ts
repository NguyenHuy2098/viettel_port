import { createAction } from 'redux-unfold-saga';

export const ACTION_ZFI007M = 'ACTION_ZFI007M';

export const action_ZFI007M = createAction<Partial<API.ZFI007MRequest>, {}>(ACTION_ZFI007M);
