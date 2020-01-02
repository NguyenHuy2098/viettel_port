import { get } from 'lodash';

import { sapApiMap } from 'utils/apisMap';
import { makeSelectorPreferredUsername } from 'redux/auth/selectors';
import HttpRequestError from 'utils/HttpRequetsError';
import { sapApi } from 'utils/request';
import { select } from 'utils/stateHelpers';
import { getCurrentPostOfficeCode } from 'utils/common';

export async function post_ZFI005(payload: Partial<API.ZFI005Request>): Promise<API.ZFI005Response> {
  const { data } = await sapApi.post(sapApiMap.ZFI005, {
    BK_ID: '',
    MA_BUU_CUC: getCurrentPostOfficeCode(),
    USER_ID: select(makeSelectorPreferredUsername),
    item: [],
    ...payload,
  });
  if (get(data, 'ErrorCode') === 0) return data;
  throw new HttpRequestError(data.ErrorCode, data.Messages);
}
