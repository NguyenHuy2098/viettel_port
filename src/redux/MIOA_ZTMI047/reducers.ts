import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import { AnyAction } from 'redux';
import produce from 'immer';
import { ACTION_MIOA_ZTMI047 } from './actions';

export default function(
  state: MIOAZTMI047StateType = {},
  { payload, type }: UnfoldSagaActionType<MIOAZTMI047PayloadType> | AnyAction,
): MIOAZTMI047StateType {
  return produce(
    state,
    (draftState: MIOAZTMI047StateType): MIOAZTMI047StateType => {
      switch (type) {
        case createActionTypeOnSuccess(ACTION_MIOA_ZTMI047):
          if (!draftState[payload.params.IV_TOR_TYPE]) draftState[payload.params.IV_TOR_TYPE] = {};
          draftState[payload.params.IV_TOR_TYPE][payload.params.IV_CUST_STATUS] = payload.data;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
