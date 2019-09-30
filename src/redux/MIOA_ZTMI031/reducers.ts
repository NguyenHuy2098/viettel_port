import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_MIOA_ZTMI031 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): MIOAZTMI031StateType {
  return produce(
    state,
    (draftState: MIOAZTMI031StateType): MIOAZTMI031StateType => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_MIOA_ZTMI031):
          draftState.response = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
