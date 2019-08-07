import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_GET_ADDRESS } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): API.VtpProvinceResponse {
  return produce(
    state,
    (draftState: API.VtpProvinceResponse): API.VtpProvinceResponse => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_GET_ADDRESS):
          draftState = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
