import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_MIOA_ZTMI047 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): API.MIOAZTMI047Response {
  return produce(
    state,
    (draftState: API.MIOAZTMI047Response): API.MIOAZTMI047Response => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_MIOA_ZTMI047):
          draftState = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
