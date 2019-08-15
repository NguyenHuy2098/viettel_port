import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_GET_TRANSPORT_METHOD } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): API.MTZTMI068Response {
  return produce(
    state,
    (draftState: API.MTZTMI068Response): API.MTZTMI068Response => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_GET_TRANSPORT_METHOD):
          draftState = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
