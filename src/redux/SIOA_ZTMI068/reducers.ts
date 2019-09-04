import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_GET_TRANSPORT_METHOD } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): API.SIOAZTMI068Response {
  return produce(
    state,
    (draftState: API.SIOAZTMI068Response): API.SIOAZTMI068Response => {
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
