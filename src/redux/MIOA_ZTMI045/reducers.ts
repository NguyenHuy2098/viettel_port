import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import { AnyAction } from 'redux';
import produce from 'immer';
import { ACTION_MIOA_ZTMI045 } from './actions';

export const defaultState: MIOAZTMI045StateType = {
  response: {},
};

export default function(
  state: MIOAZTMI045StateType = defaultState,
  { payload, type }: UnfoldSagaActionType<API.MIOAZTMI045Response> | AnyAction,
): MIOAZTMI045StateType {
  return produce(
    state,
    (draftState: MIOAZTMI045StateType): MIOAZTMI045StateType => {
      switch (type) {
        case createActionTypeOnSuccess(ACTION_MIOA_ZTMI045):
          draftState.response = payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
