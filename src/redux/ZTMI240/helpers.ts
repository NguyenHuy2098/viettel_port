import { get, toNumber } from 'lodash';

import { makeSelectorMaBP } from 'redux/auth/selectors';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import { select } from 'utils/stateHelpers';
import { today } from 'utils/timeHelper';

export async function post_ZTMI240(payload: Partial<API.ZTMI240Request>): Promise<API.ZTMI240Response> {
  const { data } = await sapApi.post(sapApiMap.ZTMI240, {
    IV_FREIGHT_UNIT_STATUS: [],
    IV_LOC_ID: select(makeSelectorMaBP),
    IV_DATE: today,
    ...payload,
  });
  if (toNumber(get(data, 'MT_ZTMI240_OUT.EV_ERROR')) === 1) return data;
  throw new Error(get(data, 'MT_ZTMI240_OUT.RETURN_MESSAGE[0].MESSAGE'));
}
