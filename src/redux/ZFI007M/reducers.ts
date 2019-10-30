import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZFI007M } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): ZFI007MStateType {
  return produce(
    state,
    (draftState: ZFI007MStateType): ZFI007MStateType => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_ZFI007M):
          draftState.response = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
