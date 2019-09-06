import { get, size, trim } from 'lodash';
import { AppStateType } from 'redux/store';

export function makeSelectorBangKeChuaDongTai(state: AppStateType): API.RowMTZTMI047OUT[] | null {
  return get(state, 'MIOA_ZTMI047.ZC3.104.MT_ZTMI047_OUT.Row', null);
}

//__________________________________________________
export function makeSelectorBangKeChuaHoanThanh(state: AppStateType): API.RowMTZTMI047OUT[] | null {
  return get(state, 'MIOA_ZTMI047.ZC1.101.MT_ZTMI047_OUT.Row', null);
}
export function getTotalPageBangKe(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC1.101.MT_ZTMI047_OUT.Paging.EV_TOTAL_PAGE', '0')));
}
export function makeSelectorCountBangKeChuaHoanThanh(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC1.101.MT_ZTMI047_OUT.Paging.EV_TOTAL_ITEM', '0')));
}

//__________________________________________________
export function makeSelectorBangKeDaDong(state: AppStateType): API.RowMTZTMI047OUT[] | null {
  return get(state, 'MIOA_ZTMI047.ZC1.102.MT_ZTMI047_OUT.Row', null);
}
export function getTotalPageBangKeDaDong(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC1.102.MT_ZTMI047_OUT.Paging.EV_TOTAL_PAGE', '0')));
}
export function makeSelectorCountBangKeDaDong(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC1.102.MT_ZTMI047_OUT.Paging.EV_TOTAL_ITEM', '0')));
}
//__________________________________________________

export function makeSelectorTaiChuaHoanThanh(state: AppStateType): API.RowMTZTMI047OUT[] {
  return get(state, 'MIOA_ZTMI047.ZC2.101.MT_ZTMI047_OUT.Row', []);
}
export function getTotalPageTai(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC2.101.MT_ZTMI047_OUT.Paging.EV_TOTAL_PAGE', '0')));
}
export function makeSelectorCountTaiChuaHoanThanh(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC2.101.MT_ZTMI047_OUT.Paging.EV_TOTAL_ITEM', '0')));
}
//__________________________________________________

export function makeSelectorTaiDaDong(state: AppStateType): API.RowMTZTMI047OUT[] {
  return get(state, 'MIOA_ZTMI047.ZC2.103.MT_ZTMI047_OUT.Row', []);
}
export function getTotalPageTaiDaDong(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC2.103.MT_ZTMI047_OUT.Paging.EV_TOTAL_PAGE', '0')));
}
export function makeSelectorCountTaiDaDong(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC2.103.MT_ZTMI047_OUT.Paging.EV_TOTAL_ITEM', '0')));
}
//__________________________________________________

export function makeSelectorTai_BangKeChuaDongTai(state: AppStateType): API.RowMTZTMI047OUT[] {
  return get(state, 'MIOA_ZTMI047.ZC1.101.MT_ZTMI047_OUT.Row', []);
}
export function getTotalPageTai_BangKeChuaDongTai(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC1.101.MT_ZTMI047_OUT.Paging.EV_TOTAL_PAGE', '0')));
}
export function makeSelectorCountTai_BangKeChuaDongTai(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC1.101.MT_ZTMI047_OUT.Paging.EV_TOTAL_ITEM', '0')));
}

//__________________________________________________

export function makeSelectorChuyenThuChuaHoanThanh(state: AppStateType): API.RowMTZTMI047OUT[] {
  return get(state, 'MIOA_ZTMI047.ZC3.101.MT_ZTMI047_OUT.Row', []);
}
export function getTotalPageChuyenThu(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC3.101.MT_ZTMI047_OUT.Paging.EV_TOTAL_PAGE', '0')));
}
export function makeSelectorCountChuyenThuChuaHoanThanh(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC3.101.MT_ZTMI047_OUT.Paging.EV_TOTAL_ITEM', '0')));
}
//__________________________________________________

export function makeSelectorChuyenThuDaDong(state: AppStateType): API.RowMTZTMI047OUT[] {
  return get(state, 'MIOA_ZTMI047.ZC3.104.MT_ZTMI047_OUT.Row', []);
}
export function getTotalPageChuyenThuDaDong(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC3.104.MT_ZTMI047_OUT.Paging.EV_TOTAL_PAGE', '0')));
}
export function makeSelectorCountChuyenThuDaDong(state: AppStateType): number {
  return parseInt(trim(get(state, 'MIOA_ZTMI047.ZC3.104.MT_ZTMI047_OUT.Paging.EV_TOTAL_ITEM', '0')));
}
//__________________________________________________
export function makeSelectorChuyenThuDaQuetNhan(state: AppStateType): API.RowMTZTMI047OUT[] {
  return get(state, 'MIOA_ZTMI047.ZC3.106.MT_ZTMI047_OUT.Row', []);
}
export function makeSelectorKienChuaDongChuyenThu(state: AppStateType): API.RowMTZTMI047OUT[] | [] {
  return get(state, 'MIOA_ZTMI047.ZBIG.BHD.101.MT_ZTMI047_OUT.Row', []);
}

export function makeSelectorNhanRiengTaiKien(state: AppStateType): API.RowMTZTMI047OUT[] {
  return get(state, 'MIOA_ZTMI047.ZC2.106.MT_ZTMI047_OUT.Row', []);
}

export function makeSelectorCountBangKeChuaDongTai(state: AppStateType): number {
  return size(makeSelectorBangKeChuaDongTai(state));
}

export function makeSelectorCountKienChuaDongChuyenThu(state: AppStateType): number {
  return size(makeSelectorTaiDaDong(state));
}
