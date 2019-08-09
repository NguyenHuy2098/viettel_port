import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_GET_PROVINCE } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): API.VtpAddressResponse {
  return produce(
    state,
    (draftState: API.VtpAddressResponse): API.VtpAddressResponse => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_GET_PROVINCE):
          draftState = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
