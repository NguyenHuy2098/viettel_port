import { get, toNumber } from 'lodash';
import moment from 'moment';

import { makeSelectorMaBP } from 'redux/auth/selectors';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import { select } from 'utils/stateHelpers';

export async function post_ZTMI236(payload: Partial<API.ZTMI236Request>): Promise<API.ZTMI236Response> {
  const { data } = await sapApi.post(sapApiMap.ZTMI236, {
    IV_PACKAGE_ID: '',
    IV_FREIGHT_UNIT_TYPE: '',
    IV_FREIGHT_UNIT_STATUS: [],
    IV_LOC_ID: select(makeSelectorMaBP),
    IV_FR_DATE: moment()
      .subtract(7, 'day')
      .format('YYYYMMDD'),
    IV_TO_DATE: moment().format('YYYYMMDD'),
    IV_PAGE_NO: '1',
    IV_NO_PER_PAGE: '10',
    ...payload,
  });
  if (toNumber(get(data, 'MT_ZTMI236_OUT.EV_ERROR')) === 1) return data;
  throw new Error(get(data, 'MT_ZTMI236_OUT.RETURN_MESSAGE[0].MESSAGE'));
}
