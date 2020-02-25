import { get } from 'lodash';

import { sapApiMap } from 'utils/apisMap';
import { makeSelectorPreferredUsername } from 'redux/auth/selectors';
import HttpRequestError from 'utils/HttpRequetsError';
import { sapApi } from 'utils/request';
import { select } from 'utils/stateHelpers';
import { makeSelectorBPOrg } from '../GetProfileByUsername/selectors';

export async function post_ZFI003(payload: Partial<API.ZFI003Request>): Promise<API.ZFI003Response> {
  const { header, ...rest } = payload;
  const params = {
    header: {
      MA_BUU_CUC: select(makeSelectorBPOrg),
      USER_ID: select(makeSelectorPreferredUsername),
      BK_MONTH: '',
      BK_YEAR: '',
      ...header,
    },
    item: [],
    ...rest,
  };
  const { data } = await sapApi.post(sapApiMap.ZFI003, params);
  if (get(data, 'MT_CRBK_RECEIVER.EV_ERROR') === 0) {
    throw new Error(get(data, 'MT_CRBK_RECEIVER.EV_MESSAGE'));
  }
  if (get(data, 'ErrorCode') === 0) return data;
  throw new HttpRequestError(data.ErrorCode, data.Messages);
}
