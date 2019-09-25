import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZTMI236 } from './actions';

export const defaultState: ZTMI236StateType = {
  response: {},
};

export default function(
  state: ZTMI236StateType = defaultState,
  { payload, type }: UnfoldSagaActionType<MIOAZTMI047PayloadType>,
): ZTMI236StateType {
  return produce(
    state,
    (draftState: ZTMI236StateType): ZTMI236StateType => {
      switch (type) {
        case createActionTypeOnSuccess(ACTION_ZTMI236):
          draftState.response = payload as API.MTZTMI236OUT;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
