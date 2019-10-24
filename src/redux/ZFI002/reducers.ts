import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZFI002 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): ZFI002StateType {
  return produce(
    state,
    (draftState: ZFI002StateType): ZFI002StateType => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_ZFI002):
          draftState.response = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
