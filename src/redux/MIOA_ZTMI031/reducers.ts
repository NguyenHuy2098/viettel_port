import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_MIOA_ZTMI031 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): API.RowMTZTMI031OUT[] {
  return produce(state, (draftState: API.RowMTZTMI031OUT[]): API.RowMTZTMI031OUT[] => {
    switch (action.type) {
      case createActionTypeOnSuccess(ACTION_MIOA_ZTMI031):
        draftState = action.payload;
        return draftState;
      default:
        return draftState;
    }
  });
}
