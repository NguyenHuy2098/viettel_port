import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZFI001 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): ZFI001StateType {
  return produce(
    state,
    (draftState: ZFI001StateType): ZFI001StateType => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_ZFI001):
          draftState.response = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
