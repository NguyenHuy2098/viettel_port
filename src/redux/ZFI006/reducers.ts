import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZFI006 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): ZFI006StateType {
  return produce(
    state,
    (draftState: ZFI006StateType): ZFI006StateType => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_ZFI006):
          draftState.response = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
