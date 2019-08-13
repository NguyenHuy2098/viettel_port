import { createActionTypeOnSuccess, UnfoldSagaActionType, createActionTypeOnFailure } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_MIOA_ZTMI023 } from './actions';

export const defaultState: MIOAZTMI023StateType = {
  ZC3: {},
};

export default function(
  state: MIOAZTMI023StateType = defaultState,
  { payload, type }: UnfoldSagaActionType,
): MIOAZTMI023StateType {
  return produce(
    state,
    (draftState: MIOAZTMI023StateType): MIOAZTMI023StateType => {
      switch (type) {
        case createActionTypeOnSuccess(ACTION_MIOA_ZTMI023):
          draftState.ZC3 = payload;
          return draftState;
        case createActionTypeOnFailure(ACTION_MIOA_ZTMI023):
          return defaultState;
        default:
          return draftState;
      }
    },
  );
}
