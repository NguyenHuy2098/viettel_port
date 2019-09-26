import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZTMI241 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): API.MTZTMI241OUT {
  return produce(
    state,
    (draftState: API.MTZTMI241OUT): API.MTZTMI241OUT => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_ZTMI241):
          draftState = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
