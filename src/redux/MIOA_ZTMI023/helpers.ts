import { get, isArray, size } from 'lodash';

import { sapApi } from 'utils/request';
import { sapApiMap } from 'utils/apisMap';

export async function post_MIOA_ZTMI023(payload: Partial<API.MIOAZTMI023Request>): Promise<API.MIOAZTMI023Response> {
  const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI023, {
    IV_ID: '',
    IV_FR_LOG_ID: '',
    ...payload,
  });
  const row = get(data, 'MT_ZTMI023_OUT.row');
  const ev_error = get(data, 'MT_ZTMI023_OUT.EV_ERROR');
  if (isArray(row) && size(row) > 0 && ev_error === 1) return data;
  throw new Error('Không tìm thấy.');
}
