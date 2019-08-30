import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import { AnyAction } from 'redux';
import produce from 'immer';
import { ACTION_MIOA_ZTMI040 } from './actions';

export const defaultState: MIOAZTMI040StateType = {
  response: {},
};

export default function(
  state: MIOAZTMI040StateType = {},
  { payload, type }: UnfoldSagaActionType<MIOAZTMI040PayloadType> | AnyAction,
): MIOAZTMI040StateType {
  return produce(
    state,
    (draftState: MIOAZTMI040StateType): MIOAZTMI040StateType => {
      switch (type) {
        case createActionTypeOnSuccess(ACTION_MIOA_ZTMI040):
          draftState.response = payload.data;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
