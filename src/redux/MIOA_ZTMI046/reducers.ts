import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_MIOA_ZTMI046 } from './actions';

export default function(
  state = {},
  { payload, type }: UnfoldSagaActionType<MIOAZTMI046PayloadType>,
): API.MIOAZTMI046Response {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return produce(state, (draftState: any): any => {
    switch (type) {
      case createActionTypeOnSuccess(ACTION_MIOA_ZTMI046):
        draftState = payload;
        return draftState;
      default:
        return draftState;
    }
  });
}
