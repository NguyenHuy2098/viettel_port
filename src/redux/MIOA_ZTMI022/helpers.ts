import { get, toNumber } from 'lodash';

import { makeSelectorPreferredUsername } from 'redux/auth/selectors';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import { select } from 'utils/stateHelpers';
import { makeSelectorBPOrg } from '../GetProfileByUsername/selectors';

export async function post_MIOA_ZTMI022(payload: Partial<API.RowRequestZTMI022>): Promise<API.MIOAZTMI022Response> {
  const maBP = select(makeSelectorBPOrg);
  const userId = select(makeSelectorPreferredUsername);
  const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI022, {
    row: {
      CU_NO: '',
      FU_NO: '',
      LOC_ID: maBP,
      STATUS_ID: '',
      USER_ID: userId,
      ...payload,
    },
  });
  if (toNumber(get(data, 'MT_ZTMI022_OUT.EV_ERROR')) === 1) return data;
  throw new Error(get(data, 'MT_ZTMI236_OUT.RETURN_MESSAGE[0].MESSAGE'));
}
