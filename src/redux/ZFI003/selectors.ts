import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export const select_ZFI003 = (state: AppStateType): API.ListMTBKRECEIVER[] => {
  const thisList = get(state, 'ZFI003.response.MT_BK_RECEIVER.List');
  return thisList ? thisList : [];
};

export const select_ZFI003Count = (state: AppStateType): number => {
  return parseInt(get(state, 'ZFI003.response.MT_BK_RECEIVER.Paging.EV_TOTAL_PAGE', 0));
};
