import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_GET_PROFILE_BY_USERNAME, ACTION_RESET_PROFILE_BY_USERNAME } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): SSOAPI.UserSapMappingGetByUsernameResponse {
  return produce(
    state,
    (draftState: SSOAPI.UserSapMappingGetByUsernameResponse): SSOAPI.UserSapMappingGetByUsernameResponse => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_GET_PROFILE_BY_USERNAME): {
          return action.payload;
        }
        case ACTION_RESET_PROFILE_BY_USERNAME:
          return {};
        default:
          return draftState;
      }
    },
  );
}
