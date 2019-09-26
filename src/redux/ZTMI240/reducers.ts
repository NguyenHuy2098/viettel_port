import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZTMI240 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): MTZTMI240Row[] {
  return produce(state, (draftState: MTZTMI240Row[]): MTZTMI240Row[] => {
    switch (action.type) {
      case createActionTypeOnSuccess(ACTION_ZTMI240):
        draftState = action.payload;
        return draftState;
      default:
        return draftState;
    }
  });
}
