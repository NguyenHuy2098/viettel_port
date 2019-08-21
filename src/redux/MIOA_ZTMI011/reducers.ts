import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_MIOA_ZTMI011 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): API.MIOAZTMI011Response {
  return produce(
    state,
    (draftState: API.MIOAZTMI011Response): API.MIOAZTMI011Response => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_MIOA_ZTMI011):
          draftState = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
