import { UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { AuthStateType } from './types';

const initialState: AuthStateType = {
  user: null,
};

function posts(state = initialState, action: UnfoldSagaActionType): AuthStateType {
  return produce(
    state,
    (draftState: AuthStateType): AuthStateType => {
      switch (action.type) {
        default:
          return draftState;
      }
    },
  );
}

export default posts;
