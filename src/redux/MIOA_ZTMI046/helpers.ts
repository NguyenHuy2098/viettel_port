import { sapApi } from 'utils/request';
import { sapApiMap } from 'utils/apisMap';

export async function post_MIOA_ZTMI046(payload: Partial<API.MIOAZTMI046Request>): Promise<API.MIOAZTMI046Response> {
  const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI046, {
    IV_TOR_ID: '',
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '10',
    ...payload,
  });
  return data;
}
