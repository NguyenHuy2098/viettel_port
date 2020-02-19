import { get } from 'lodash';

import { makeSelectorPreferredUsername } from 'redux/auth/selectors';
import { ssoApiMap } from 'utils/apisMap';
import HttpRequestError from 'utils/HttpRequetsError';
import { ssoApi } from 'utils/request';
import { select } from 'utils/stateHelpers';

export async function post_GetProfileByUsername(
  payload: SSOAPI.UserSapMappingGetByUsernameRequest,
): Promise<SSOAPI.UserSapMappingGetByUsernameResponse> {
  const { data } = await ssoApi.post(ssoApiMap['Users/GetProfileByUsername'], {
    Username: select(makeSelectorPreferredUsername),
    BPOrg: '',
    ...payload,
  });
  if (get(data, 'ErrorCode') === 0) return data;
  throw new HttpRequestError(data.ErrorCode, data.Messages);
}
