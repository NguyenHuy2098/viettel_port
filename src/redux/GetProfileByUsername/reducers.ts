import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import {
  ACTION_GET_PROFILE_BY_USERNAME,
  ACTION_RESET_PROFILE_BY_USERNAME,
  ACTION_UPDATE_CURRENT_POST_OFFICE,
} from './actions';

export const defaultState: GetProfileByUsernameStateType = {
  response: {},
  currentPostOffice: {
    PostOfficeCode: '',
    PostOfficeName: '',
  },
};

export default function(state = defaultState, action: UnfoldSagaActionType): GetProfileByUsernameStateType {
  return produce(
    state,
    (draftState: GetProfileByUsernameStateType): GetProfileByUsernameStateType => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_GET_PROFILE_BY_USERNAME): {
          draftState.response = action.payload;
          return draftState;
        }
        case ACTION_UPDATE_CURRENT_POST_OFFICE:
          draftState.currentPostOffice = action.payload;
          return draftState;
        case ACTION_RESET_PROFILE_BY_USERNAME:
          return defaultState;
        default:
          return draftState;
      }
    },
  );
}
