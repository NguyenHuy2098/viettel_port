import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { AppStateType } from 'redux/store';
import { GET_LIST_BANG_KE } from './actions';

export default function(state = [], action: UnfoldSagaActionType): AppStateType {
  return produce(
    state,
    (draftState: AppStateType): AppStateType => {
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
