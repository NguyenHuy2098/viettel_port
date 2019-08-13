import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import { AnyAction } from 'redux';
import produce from 'immer';
import { ACTION_MIOA_ZTMI046 } from './actions';

export const defaultState: MIOAZTMI046StateType = {
  response: {},
};

export default function(
  state: MIOAZTMI046StateType = defaultState,
  { payload, type }: UnfoldSagaActionType<API.MIOAZTMI046Response> | AnyAction,
): MIOAZTMI046StateType {
  return produce(
    state,
    (draftState: MIOAZTMI046StateType): MIOAZTMI046StateType => {
      switch (type) {
        case createActionTypeOnSuccess(ACTION_MIOA_ZTMI046):
          draftState.response = payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
