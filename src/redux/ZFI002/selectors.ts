import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export const select_ZFI002 = (state: AppStateType): API.ListMTBKRECEIVER[] => {
  const thisList = get(state, 'ZFI002.response.MT_BK_RECEIVER.List');
  return thisList ? thisList : [];
};

export const select_ZFI002Count = (state: AppStateType): number => {
  return parseInt(get(state, 'ZFI002.response.MT_BK_RECEIVER.Paging.EV_TOTAL_PAGE', 0));
};
