import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZFI007 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): ZFI007StateType {
  return produce(
    state,
    (draftState: ZFI007StateType): ZFI007StateType => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_ZFI007):
          draftState.response = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
