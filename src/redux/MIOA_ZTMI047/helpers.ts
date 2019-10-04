import moment from 'moment';

import { sapApi } from 'utils/request';
import { sapApiMap } from 'utils/apisMap';

export async function post_MIOA_ZTMI047(payload: Partial<API.MIOAZTMI047Request>): Promise<MIOAZTMI047PayloadType> {
  const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI047, {
    IV_TOR_ID: '',
    IV_TOR_TYPE: '',
    IV_FR_LOC_ID: '',
    IV_TO_LOC_ID: '',
    IV_CUST_STATUS: '',
    IV_FR_DATE: moment()
      .subtract(7, 'day')
      .format('YYYYMMDD'),
    IV_TO_DATE: moment().format('YYYYMMDD'),
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '10',
    ...payload,
  });
  return { data, params: payload };
}
