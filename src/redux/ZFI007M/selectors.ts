import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export const select_ZFI007M = (state: AppStateType): ZFI007MStateType => {
  return get(state, 'ZFI007M.response');
};

export const select_ZFI007M_collection = (state: AppStateType): API.LISTMTDETAILRECEIVER[] => {
  return get(select_ZFI007M(state), 'MT_DETAIL_RECEIVER.collection') || [];
};
