import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export const select_ZFI002 = (state: AppStateType): API.ListMTBKRECEIVER[] => {
  return get(state, 'ZFI002.response.MT_BK_RECEIVER.List', []);
};
