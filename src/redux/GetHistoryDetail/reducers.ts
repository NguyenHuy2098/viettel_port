import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_HISTORY_DETAIL } from './actions';
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function(state = {}, action: UnfoldSagaActionType): any {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  return produce(state, (draftState: any): any => {
    switch (action.type) {
      case createActionTypeOnSuccess(ACTION_HISTORY_DETAIL):
        draftState.response = action.payload;
        return draftState;
      default:
        return draftState;
    }
  });
}
