import { get, toNumber } from 'lodash';

import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import { select } from 'utils/stateHelpers';
import { makeSelectorBPOrg } from '../GetProfileByUsername/selectors';

export async function post_MIOA_ZTMI054(payload: Partial<API.MIOAZTMI054Request>): Promise<API.MIOAZTMI054Response> {
  const { data } = await sapApi.post(sapApiMap.MIOA_ZTMI054, {
    iv_post: select(makeSelectorBPOrg),
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '10',
    ...payload,
  });
  if (toNumber(get(data, 'MT_ZTMI054_OUT.EV_ERROR')) === 1) return data;
  throw new Error('Không tìm thấy.');
}
