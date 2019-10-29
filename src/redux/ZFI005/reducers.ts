import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZFI005 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): ZFI005StateType {
  return produce(
    state,
    (draftState: ZFI005StateType): ZFI005StateType => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_ZFI005):
          draftState.response = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
