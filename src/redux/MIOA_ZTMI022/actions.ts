import { createAction } from 'redux-unfold-saga';

export const ACTION_MIOA_ZTMI022 = 'ACTION_MIOA_ZTMI022';

export const action_MIOA_ZTMI022 = createAction<Partial<API.RowRequestZTMI022>, {}>(ACTION_MIOA_ZTMI022);
