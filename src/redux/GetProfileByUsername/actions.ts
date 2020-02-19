import { createAction } from 'redux-unfold-saga';

export const ACTION_GET_PROFILE_BY_USERNAME = 'ACTION_GET_PROFILE_BY_USERNAME';

export const ACTION_RESET_PROFILE_BY_USERNAME = 'ACTION_RESET_PROFILE_BY_USERNAME';

export const action_GET_PROFILE_BY_USERNAME = createAction<SSOAPI.UserSapMappingGetByUsernameRequest, {}>(
  ACTION_GET_PROFILE_BY_USERNAME,
);

export const action_RESET_PROFILE_BY_USERNAME = createAction(ACTION_RESET_PROFILE_BY_USERNAME);
