import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_MIOA_ZTMI046 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): API.MIOAZTMI046Response {
  return produce(
    state,
    (draftState: API.MIOAZTMI046Response): API.MIOAZTMI046Response => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_MIOA_ZTMI046):
          draftState = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
