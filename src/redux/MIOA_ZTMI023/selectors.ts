import { get, size } from 'lodash';
import { AppStateType } from 'redux/store';

export function makeSelectorNhanChuyenThu(state: AppStateType): API.RowResponseZTMI023OUT[] | [] {
  return get(state, 'MIOA_ZTMI023.ZC3.MT_ZTMI023_OUT.row', []);
}

export function makeSelectorCountNhanChuyenThu(state: AppStateType): number {
  return size(makeSelectorNhanChuyenThu(state));
}
