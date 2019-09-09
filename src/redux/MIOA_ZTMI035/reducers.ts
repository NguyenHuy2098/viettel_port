import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import { AnyAction } from 'redux';
import produce from 'immer';
import { ACTION_MIOA_ZTMI035 } from './actions';

export const defaultState: MIOAZTMI035StateType = {
  response: {},
};

export default function(
  state: MIOAZTMI035StateType = {},
  { payload, type }: UnfoldSagaActionType<MIOAZTMI035PayloadType> | AnyAction,
): MIOAZTMI035StateType {
  return produce(
    state,
    (draftState: MIOAZTMI035StateType): MIOAZTMI035StateType => {
      switch (type) {
        case createActionTypeOnSuccess(ACTION_MIOA_ZTMI035):
          draftState.response = payload.data;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
