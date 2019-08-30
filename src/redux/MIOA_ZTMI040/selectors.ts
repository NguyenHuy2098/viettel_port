import { get } from 'lodash';
import { AppStateType } from 'redux/store';

export const select_MIOA_ZTMI040 = (state: AppStateType): MIOAZTMI040StateType => {
  return get(state, 'MIOA_ZTMI040');
};

export const selectPhanCongPhat = (state: AppStateType): API.RowResponseZTMI040[] =>
  get(select_MIOA_ZTMI040(state), 'response.MT_ZTMI040_OUT.row', []);
