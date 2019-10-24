import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZFI007 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): ZFI007Response {
  return produce(
    state,
    (draftState: ZFI007Response): ZFI007Response => {
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
