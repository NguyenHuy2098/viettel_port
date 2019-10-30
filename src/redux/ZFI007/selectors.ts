import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export const select_ZFI007 = (state: AppStateType): ZFI007StateType => {
  return get(state, 'ZFI007.response');
};

export const select_ZFI007_list = (state: AppStateType): API.LISTMTDETAILRECEIVER[] => {
  return get(select_ZFI007(state), 'MT_DETAIL_RECEIVER.list') || [];
};

export const select_ZFI007_MT_DETAIL_RECEIVER = (state: AppStateType): API.MTDETAILRECEIVER => {
  return get(state, 'ZFI007.response.MT_DETAIL_RECEIVER', []);
};

export const select_ZFI007_header = (state: AppStateType): number => {
  return get(state, 'ZFI007.response.MT_DETAIL_RECEIVER.header') || {};
};
