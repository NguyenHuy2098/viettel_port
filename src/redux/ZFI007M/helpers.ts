import { get } from 'lodash';
import { sapApiMap } from 'utils/apisMap';
import { sapApi } from 'utils/request';
import { select } from 'utils/stateHelpers';
import { makeSelectorBPOrg } from '../GetProfileByUsername/selectors';

export async function post_ZFI007M(payload: Partial<API.ZFI007MRequest>): Promise<API.ZFI007MResponse> {
  const { data } = await sapApi.post(sapApiMap.ZFI007M, {
    BK_INPUT: [],
    MA_BUU_CUC: select(makeSelectorBPOrg),
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '10000',
    ...payload,
  });
  if (get(data, 'ErrorCode') === 0 && get(data, 'MT_DETAIL_RECEIVER_M.EV_ERROR') === 1) return data;
  throw new Error(get(data, 'MT_DETAIL_RECEIVER_M.EV_MESSAGE') || 'Có lỗi xảy ra!');
}
