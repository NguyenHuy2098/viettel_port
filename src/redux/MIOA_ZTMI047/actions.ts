import { createAction, UnfoldSagaOptionsType } from 'redux-unfold-saga';

import { SipFlowType } from 'utils/enums';

export const ACTION_MIOA_ZTMI047 = 'ACTION_MIOA_ZTMI047';

interface Options extends UnfoldSagaOptionsType {
  flow?: SipFlowType;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const action_MIOA_ZTMI047 = createAction<any, Options>(ACTION_MIOA_ZTMI047);
