import { get, size } from 'lodash';
import { AppStateType } from 'redux/store';

export function makeSelectorTaiChuaHoanThanh(state: AppStateType): API.RowMTZTMI047OUT[] | null {
  return get(state, 'MIOA_ZTMI047.ZC2.101.MT_ZTMI047_OUT.Row', null);
}

export function makeSelectorBangKeChuaDongTai(state: AppStateType): API.RowMTZTMI047OUT[] | null {
  return get(state, 'MIOA_ZTMI047.ZC1.101.MT_ZTMI047_OUT.Row', null);
}

export function makeSelectorCountTaiChuaHoanThanh(state: AppStateType): number {
  return size(makeSelectorTaiChuaHoanThanh(state));
}

export function makeSelectorCountBangKeChuaDongTai(state: AppStateType): number {
  return size(makeSelectorBangKeChuaDongTai(state));
}
