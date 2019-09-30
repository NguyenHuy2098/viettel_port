import { get, isArray, size } from 'lodash';

import { sapApi } from 'utils/request';
import { sapApiMap } from 'utils/apisMap';

export async function getZTMI023(payload: Partial<API.MIOAZTMI023Request>): Promise<API.MIOAZTMI023Response> {
  const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI023, payload);
  const row = get(data, 'MT_ZTMI023_OUT.row');
  if (isArray(row) && size(row) > 0) {
    return data;
  }
  throw new Error('Không tìm thấy.');
}
