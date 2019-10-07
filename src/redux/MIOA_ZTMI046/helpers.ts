import { get } from 'lodash';

import { sapApi } from 'utils/request';
import { sapApiMap } from 'utils/apisMap';

export async function post_MIOA_ZTMI046(payload: Partial<API.MIOAZTMI046Request>): Promise<API.MIOAZTMI046Response> {
  const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI046, {
    IV_TOR_ID: '',
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '10',
    ...payload,
  });
  if (get(data, 'MT_ZTMI046_OUT.EV_ERROR') === 1) return data;
  throw new Error('Không tìm thấy.');
}
