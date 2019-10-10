import { get } from 'lodash';

import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import { today, yesterday } from 'utils/timeHelper';

export async function post_MIOA_ZTMI047(payload: Partial<API.MIOAZTMI047Request>): Promise<MIOAZTMI047PayloadType> {
  const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI047, {
    IV_TOR_ID: '',
    IV_TOR_TYPE: '',
    IV_FR_LOC_ID: '',
    IV_TO_LOC_ID: '',
    IV_CUST_STATUS: '',
    IV_FR_DATE: yesterday,
    IV_TO_DATE: today,
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '10',
    ...payload,
  });
  if (get(data, 'MT_ZTMI047_OUT.EV_ERROR') === 1) return { data, params: payload };
  throw new Error('Không tìm thấy dữ liệu.');
}
