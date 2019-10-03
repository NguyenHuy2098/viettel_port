import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { get } from 'lodash';

import { makeSelectorMaBP } from 'redux/auth/selectors';
import { SipFlowType } from 'utils/enums';
import { select } from 'utils/stateHelpers';
import { ACTION_MIOA_ZTMI047 } from './actions';
import { post_MIOA_ZTMI047 } from './helpers';

export function* takeGet_MIOA_ZTMI047(action: UnfoldSagaActionType): SagaIterator {
  yield unfoldSaga(
    {
      handler: async () => {
        const maBP = select(makeSelectorMaBP);
        const flowType = get(action, 'options.flow');
        if (flowType === SipFlowType.KHAI_THAC_DEN) {
          return await post_MIOA_ZTMI047({
            IV_TO_LOC_ID: maBP,
            ...action.payload,
          });
        } else if (flowType === SipFlowType.KHAI_THAC_DI) {
          return await post_MIOA_ZTMI047({
            IV_FR_LOC_ID: maBP,
            ...action.payload,
          });
        }
        return await post_MIOA_ZTMI047(action.payload);
      },
      key: action.type,
    },
    action.callbacks,
    action.options,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_MIOA_ZTMI047, takeGet_MIOA_ZTMI047);
}
