import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZFI001 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): ZFI001Response {
  return produce(
    state,
    (draftState: ZFI001Response): ZFI001Response => {
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
