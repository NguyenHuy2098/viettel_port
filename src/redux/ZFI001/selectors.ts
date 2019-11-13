import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export const select_ZFI001 = (state: AppStateType): API.ZFI001Response => {
  return get(state, 'ZFI001.response');
};

export const select_ZFI001_list = (state: AppStateType): API.LIST[] => {
  return get(select_ZFI001(state), 'MT_KM_RECEIVER.list', []);
};
