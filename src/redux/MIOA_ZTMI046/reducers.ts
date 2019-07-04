import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { GET_LIST_PHIEU_GUI_TRONG_BANG_KE } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): API.MIOAZTMI046Response {
  return produce(
    state,
    (draftState: API.MIOAZTMI046Response): API.MIOAZTMI046Response => {
      switch (action.type) {
        case createActionTypeOnSuccess(GET_LIST_PHIEU_GUI_TRONG_BANG_KE):
          draftState = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
