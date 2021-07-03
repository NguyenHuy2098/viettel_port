import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_COD_CHUA_CHOT } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): CODCHUACHOT {
  return produce(
    state,
    (draftState: CODCHUACHOT): CODCHUACHOT => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_COD_CHUA_CHOT):
          draftState.response = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
