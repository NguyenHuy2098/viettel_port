import { createAction } from 'redux-unfold-saga';

export const ACTION_MIOA_ZTMI023 = 'ACTION_MIOA_ZTMI023';

export const action_MIOA_ZTMI023 = createAction<Partial<API.MIOAZTMI023Request>, {}>(ACTION_MIOA_ZTMI023);
