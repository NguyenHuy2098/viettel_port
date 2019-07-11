import { get, size } from 'lodash';
import { AppStateType } from 'redux/store';

export function makeSelectorBangKeChuaDongTai(state: AppStateType): API.RowMTZTMI047OUT[] | null {
  return get(state, 'MIOA_ZTMI047.ZC1.101.MT_ZTMI047_OUT.Row', null);
}

export function makeSelectorTaiChuaHoanThanh(state: AppStateType): API.RowMTZTMI047OUT[] | null {
  return get(state, 'MIOA_ZTMI047.ZC2.101.MT_ZTMI047_OUT.Row', null);
}

export function makeSelectorChuyenThuChuaHoanThanh(state: AppStateType): API.RowMTZTMI047OUT[] | null {
  return get(state, 'MIOA_ZTMI047.ZC3.101.MT_ZTMI047_OUT.Row', null);
}

export function makeSelectorCountBangKeChuaDongTai(state: AppStateType): number {
  return size(makeSelectorBangKeChuaDongTai(state));
}

export function makeSelectorCountTaiChuaHoanThanh(state: AppStateType): number {
  return size(makeSelectorTaiChuaHoanThanh(state));
}

export function makeSelectorCountChuyenThuChuaHoanThanh(state: AppStateType): number {
  return size(makeSelectorChuyenThuChuaHoanThanh(state));
}
