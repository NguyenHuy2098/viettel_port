import { get } from 'lodash';

import { sapApiMap } from 'utils/apisMap';
import { makeSelectorMaBP, makeSelectorPreferredUsername } from 'redux/auth/selectors';
import HttpRequestError from 'utils/HttpRequetsError';
import { sapApi } from 'utils/request';
import { select } from 'utils/stateHelpers';

export async function post_ZFI006(payload: Partial<API.ZFI006Request>): Promise<API.ZFI006Response> {
  const { data } = await sapApi.post(sapApiMap.ZFI006, {
    BK_ID: '',
    MA_BUU_CUC: select(makeSelectorMaBP),
    USER_ID: select(makeSelectorPreferredUsername),
    ...payload,
  });
  if (get(data, 'ErrorCode') === 0) return data;
  throw new HttpRequestError(data.ErrorCode, data.Messages);
}
