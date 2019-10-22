import { get } from 'lodash';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';

export async function post_ZFI003(payload: Partial<API.ZFI003Response>): Promise<API.ZFI003Response> {
  const { data } = await sapApi.post(sapApiMap.ZFI003, {
    ...payload,
  });
  if (get(data, 'ErrorCode') === 0) return data;
  throw new HttpRequestError(data.ErrorCode, data.Messages);
}
