import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_MIOA_ZTMI047 } from './actions';

export default function(
  state = {},
  { payload, type }: UnfoldSagaActionType<MIOAZTMI047PayloadType>,
): API.MIOAZTMI047Response {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return produce(state, (draftState: any): any => {
    switch (type) {
      case createActionTypeOnSuccess(ACTION_MIOA_ZTMI047):
        if (!draftState[payload.params.IV_TOR_TYPE]) {
          draftState[payload.params.IV_TOR_TYPE] = {};
        }
        draftState[payload.params.IV_TOR_TYPE][payload.params.IV_CUST_STATUS] = payload.data;
        return draftState;
      default:
        return draftState;
    }
  });
}
