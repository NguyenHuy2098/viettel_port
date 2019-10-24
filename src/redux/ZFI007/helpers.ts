import { get } from 'lodash';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';

export async function post_ZFI007(payload: Partial<API.ZFI007Response>): Promise<API.ZFI007Response> {
  const { data } = await sapApi.post(sapApiMap.ZFI007, {
    ...payload,
  });
  if (get(data, 'ErrorCode') === 0) return data;
  throw new HttpRequestError(data.ErrorCode, data.Messages);
}
