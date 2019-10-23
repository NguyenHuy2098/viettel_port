import { get } from 'lodash';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';

export async function post_ZFI001(payload: Partial<API.ZFI001Response>): Promise<API.ZFI001Response> {
  const { data } = await sapApi.post(sapApiMap.ZFI001, {
    ...payload,
  });
  if (get(data, 'ErrorCode') === 0) return data;
  throw new HttpRequestError(data.ErrorCode, data.Messages);
}
