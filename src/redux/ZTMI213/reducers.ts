import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZTMI213 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): API.MTZTMI213OUT {
  return produce(
    state,
    (draftState: API.MTZTMI213OUT): API.MTZTMI213OUT => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_ZTMI213):
          draftState = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
