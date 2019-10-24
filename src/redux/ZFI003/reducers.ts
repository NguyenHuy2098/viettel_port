import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZFI003 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): ZFI003StateType {
  return produce(
    state,
    (draftState: ZFI003StateType): ZFI003StateType => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_ZFI003):
          draftState.response = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
