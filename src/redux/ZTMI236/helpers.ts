import { get, toNumber } from 'lodash';

import { makeSelectorMaBP } from 'redux/auth/selectors';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import { select } from 'utils/stateHelpers';
import { today, yesterday } from 'utils/timeHelper';

export async function post_ZTMI236(payload: Partial<API.ZTMI236Request>): Promise<API.ZTMI236Response> {
  const { data } = await sapApi.post(sapApiMap.ZTMI236, {
    IV_PACKAGE_ID: '',
    IV_FREIGHT_UNIT_TYPE: '',
    IV_FREIGHT_UNIT_STATUS: [],
    IV_LOC_ID: select(makeSelectorMaBP),
    IV_FR_DATE: yesterday,
    IV_TO_DATE: today,
    IV_PAGE_NO: '1',
    IV_NO_PER_PAGE: '10',
    ...payload,
  });
  if (toNumber(get(data, 'MT_ZTMI236_OUT.EV_ERROR')) === 1) return data;
  throw new Error(get(data, 'MT_ZTMI236_OUT.RETURN_MESSAGE[0].MESSAGE'));
}
