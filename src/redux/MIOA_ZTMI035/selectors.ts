import { get, size } from 'lodash';
import { AppStateType } from 'redux/store';

export const select_MIOA_ZTMI035 = (state: AppStateType): MIOAZTMI035StateType => {
  return get(state, 'MIOA_ZTMI035');
};

export const selectPhanCongNhan = (state: AppStateType): API.RowResponseZTMI035[] =>
  get(select_MIOA_ZTMI035(state), 'response.MT_ZTMI035_OUT.row', []);

export function selectPhanCongNhanListCount(state: AppStateType): number {
  return size(selectPhanCongNhan(state));
}
