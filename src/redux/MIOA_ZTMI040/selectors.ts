import { get, size } from 'lodash';
import { AppStateType } from 'redux/store';

export const select_MIOA_ZTMI040 = (state: AppStateType): MIOAZTMI040StateType => {
  return get(state, 'MIOA_ZTMI040');
};

export const selectPhanCongPhat = (state: AppStateType): API.RowResponseZTMI040[] =>
  get(select_MIOA_ZTMI040(state), 'response.MT_ZTMI040_OUT.row', []) || [];

export function selectPhanCongPhatListCount(state: AppStateType): number {
  return size(selectPhanCongPhat(state));
}

export const selectPhanCongPhatCount = (state: AppStateType): number => {
  return parseInt(get(state, 'MIOA_ZTMI040.response.MT_ZTMI040_OUT.Paging[0].EV_TOTAL_PAGE', 0));
};
