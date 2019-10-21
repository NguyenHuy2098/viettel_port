import { get } from 'lodash';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';

export async function post_ZFI002(payload: Partial<API.ZFI002Response>): Promise<API.ZFI002Response> {
  const { data } = await sapApi.post(sapApiMap.ZFI002, {
    ...payload,
  });
  if (get(data, 'ErrorCode') === 0) return data;
  throw new HttpRequestError(data.ErrorCode, data.Messages);
}
