import { get, toNumber } from 'lodash';

import { sapApiMap } from 'utils/apisMap';
import HttpRequestError from 'utils/HttpRequetsError';
import { sapApi } from 'utils/request';

export async function post_MIOA_ZTMI016(payload: Partial<API.MIOAZTMI016Request>): Promise<API.MIOAZTMI016Response> {
  const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI016, {
    IV_FLAG: '',
    IV_TOR_TYPE: '',
    IV_TOR_ID_CU: '',
    IV_SLOCATION: '',
    IV_DLOCATION: '',
    IV_DESCRIPTION: '',
    T_ITEM: [],
    ...payload,
  });
  if (toNumber(get(data, 'MT_ZTMI016_OUT.ev_error')) === 1) return data;
  throw new HttpRequestError(data.ErrorCode, [get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE')]);
}
