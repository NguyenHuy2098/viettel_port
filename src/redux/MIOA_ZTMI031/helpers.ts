import { get, toNumber } from 'lodash';

import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';

export async function post_MIOA_ZTMI031(payload: Partial<API.MIOAZTMI031Request>): Promise<API.MIOAZTMI031Response> {
  const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI031, {
    FWO_ID: '',
    BUYER_REFERENCE_NUMBER: '',
    ...payload,
  });
  if (toNumber(get(data, 'MT_ZTMI031_OUT.EV_ERROR')) === 1) return data;
  throw new Error('Không tìm thấy.');
}
