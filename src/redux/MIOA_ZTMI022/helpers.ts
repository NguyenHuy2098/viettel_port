import { get } from 'lodash';

import { makeSelectorMaBP, makeSelectorPreferredUsername } from 'redux/auth/selectors';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import { select } from 'utils/stateHelpers';

export async function post_MIOA_ZTMI022(payload: Partial<API.RowRequestZTMI022>): Promise<API.MIOAZTMI022Response> {
  const maBP = select(makeSelectorMaBP);
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
  const isSuccessful = !!get(data, 'MT_ZTMI022_OUT.EV_ERROR');
  if (isSuccessful) return data;
  throw new Error('Quét nhận thất bại.');
}
