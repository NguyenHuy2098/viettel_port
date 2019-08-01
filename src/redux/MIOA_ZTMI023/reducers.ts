import { createActionTypeOnSuccess, UnfoldSagaActionType, createActionTypeOnFailure } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_MIOA_ZTMI023 } from './actions';

export default function(state = {}, { payload, type }: UnfoldSagaActionType): API.MIOAZTMI023Response {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return produce(state, (draftState: any): any => {
    switch (type) {
      case createActionTypeOnSuccess(ACTION_MIOA_ZTMI023):
        draftState.ZC3 = payload;
        return draftState;
      case createActionTypeOnFailure(ACTION_MIOA_ZTMI023):
        return {};
      default:
        return draftState;
    }
  });
}
