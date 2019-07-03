import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { GET_LIST_BANG_KE } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): API.MIOAZTMI047Response {
  return produce(
    state,
    (draftState: API.MIOAZTMI047Response): API.MIOAZTMI047Response => {
      switch (action.type) {
        case createActionTypeOnSuccess(GET_LIST_BANG_KE):
          draftState = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
