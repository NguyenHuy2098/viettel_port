import { get } from 'lodash';

// import { makeSelectorMaBP } from 'redux/auth/selectors';
import { sapApiMap } from 'utils/apisMap';
import HttpRequestError from 'utils/HttpRequetsError';
import { sapApi } from 'utils/request';
import { getCurrentPostOfficeCode } from 'utils/common';
// import { select } from 'utils/stateHelpers';

export async function post_ZFI002(payload: Partial<API.ZFI002Response>): Promise<API.ZFI002Response> {
  const { data } = await sapApi.post(sapApiMap.ZFI002, {
    TU_KY: '',
    DEN_KY: '',
    MA_BUU_CUC: getCurrentPostOfficeCode(),
    BK_ID: '',
    BK_STATUS: '',
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '10',
    ...payload,
  });
  if (get(data, 'ErrorCode') === 0) return data;
  throw new HttpRequestError(data.ErrorCode, data.Messages);
}
