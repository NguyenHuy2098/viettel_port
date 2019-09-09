import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import { AnyAction } from 'redux';
import produce from 'immer';
import { ACTION_MIOA_ZTMI054 } from './actions';

export const defaultState: MIOAZTMI054StateType = {
  response: {},
};

export default function(
  state: MIOAZTMI054StateType = defaultState,
  { payload, type }: UnfoldSagaActionType<API.MIOAZTMI054Response> | AnyAction,
): MIOAZTMI054StateType {
  return produce(
    state,
    (draftState: MIOAZTMI054StateType): MIOAZTMI054StateType => {
      switch (type) {
        case createActionTypeOnSuccess(ACTION_MIOA_ZTMI054):
          draftState.response = payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
