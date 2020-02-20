import { get, toNumber } from 'lodash';

import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import { select } from 'utils/stateHelpers';
import { today, sevenDaysAgo } from 'utils/timeHelper';
import { makeSelectorBPOrg } from '../GetProfileByUsername/selectors';

export async function post_ZTMI236(payload: Partial<API.ZTMI236Request>): Promise<API.ZTMI236Response> {
  const { data } = await sapApi.post(sapApiMap.ZTMI236, {
    IV_PACKAGE_ID: '',
    IV_FREIGHT_UNIT_TYPE: '',
    IV_FREIGHT_UNIT_STATUS: [],
    IV_LOC_ID: select(makeSelectorBPOrg),
    IV_FR_DATE: sevenDaysAgo,
    IV_TO_DATE: today,
    IV_PAGE_NO: '1',
    IV_NO_PER_PAGE: '10',
    ...payload,
  });
  if (toNumber(get(data, 'MT_ZTMI236_OUT.EV_ERROR')) === 1) return data;
  throw new Error('Không tìm thấy dữ liệu.');
}
