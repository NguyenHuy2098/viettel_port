import { get, size } from 'lodash';
import { AppStateType } from 'redux/store';

export function makeSelectorListChuyenThu(state: AppStateType): API.RowResponseZTMI023OUT[] {
  return get(state, 'MIOA_ZTMI023.response.MT_ZTMI023_OUT.row', []);
}

export function makeSelectorChuyenThu(state: AppStateType): API.RowResponseZTMI023OUT {
  return get(makeSelectorListChuyenThu(state), '[0]');
}

export function makeSelectorCountNhanChuyenThu(state: AppStateType): number {
  return size(makeSelectorListChuyenThu(state));
}
