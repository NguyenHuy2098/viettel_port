import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export const select_ZFI001 = (state: AppStateType): API.LIST[] => {
  return get(state, 'ZFI001.response.MT_KM_RECEIVER.list', []);
};
