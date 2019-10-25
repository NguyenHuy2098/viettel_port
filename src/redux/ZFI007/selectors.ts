import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export const select_ZFI007 = (state: AppStateType): API.LISTMTDETAILRECEIVER[] => {
  return get(state, 'ZFI007.response.MT_DETAIL_RECEIVER.list', []);
};

export const select_MT_DETAIL_RECEIVER_ZFI007 = (state: AppStateType): API.MTDETAILRECEIVER => {
  return get(state, 'ZFI007.response.MT_DETAIL_RECEIVER', []);
};

export const select_ZFI007Count = (state: AppStateType): number => {
  return parseInt(get(state, 'ZFI007.response.MT_BK_RECEIVER.Paging.EV_TOTAL_PAGE', 0));
};
