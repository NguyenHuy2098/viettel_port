import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import { AnyAction } from 'redux';
import produce from 'immer';
import { ACTION_MIOA_ZTMI055 } from './actions';

export const defaultState: MIOAZTMI055StateType = {
  response: {},
};

export default function(
  state: MIOAZTMI055StateType = defaultState,
  { payload, type }: UnfoldSagaActionType<API.MIOAZTMI055Response> | AnyAction,
): MIOAZTMI055StateType {
  return produce(
    state,
    (draftState: MIOAZTMI055StateType): MIOAZTMI055StateType => {
      switch (type) {
        case createActionTypeOnSuccess(ACTION_MIOA_ZTMI055):
          draftState.response = payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
