import { UserState } from 'redux-oidc';
import { UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';

const initialState: UserState = {
  user: undefined,
  isLoadingUser: false,
};

function posts(state = initialState, action: UnfoldSagaActionType): UserState {
  return produce(
    state,
    (draftState: UserState): UserState => {
      switch (action.type) {
        default:
          return draftState;
      }
    },
  );
}

export default posts;
