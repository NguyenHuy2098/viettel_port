import { createActionTypeOnSuccess, UnfoldSagaActionType } from 'redux-unfold-saga';
import produce from 'immer';
import { ACTION_ZTMI213 } from './actions';

export default function(state = {}, action: UnfoldSagaActionType): ZTMI213StateType {
  return produce(
    state,
    (draftState: ZTMI213StateType): ZTMI213StateType => {
      switch (action.type) {
        case createActionTypeOnSuccess(ACTION_ZTMI213):
          draftState.response = action.payload;
          return draftState;
        default:
          return draftState;
      }
    },
  );
}
//
// export default function(state = {}, action: UnfoldSagaActionType): MIOAZTMI031StateType {
//   return produce(
//     state,
//     (draftState: MIOAZTMI031StateType): MIOAZTMI031StateType => {
//       switch (action.type) {
//         case createActionTypeOnSuccess(ACTION_MIOA_ZTMI031):
//           draftState.response = action.payload;
//           return draftState;
//         default:
//           return draftState;
//       }
//     },
//   );
// }
