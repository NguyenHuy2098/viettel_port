import { get } from 'lodash';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { select } from 'utils/stateHelpers';
import { makeSelectorBPOrg } from '../GetProfileByUsername/selectors';

export async function post_ZFI007(payload: Partial<API.ZFI007Response>): Promise<API.ZFI007Response> {
  const { data } = await sapApi.post(sapApiMap.ZFI007, {
    MA_BUU_CUC: select(makeSelectorBPOrg),
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '10000',
    ...payload,
  });
  if (get(data, 'ErrorCode') === 0) return data;
  throw new HttpRequestError(data.ErrorCode, data.Messages);
}
