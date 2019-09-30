import { createAction } from 'redux-unfold-saga';

import { SipFlowType } from 'utils/enums';

export const ACTION_MIOA_ZTMI047 = 'ACTION_MIOA_ZTMI047';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const action_MIOA_ZTMI047 = createAction<any, { flow?: SipFlowType }>(ACTION_MIOA_ZTMI047);
