import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { GET_POSTS } from './actions';
import { PostState } from './types';

const initialState: PostState = {
  list: [],
};

function posts(state = initialState, action: UnfoldSagaActionType): PostState {
  return produce(
    state,
    (draftState: PostState): PostState => {
      switch (action.type) {
        case createActionTypeOnSuccess(GET_POSTS):
          draftState.list = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}

export default posts;
