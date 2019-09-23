import { filter, get, isEmpty, size, toNumber, trim } from 'lodash';
import { AppStateType } from 'redux/store';
import { SipDataState, SipDataType } from 'utils/enums';

export function makeSelectorBangKeChuaDongTai(state: AppStateType): API.RowMTZTMI047OUT[] | null {
  return get(state, 'MIOA_ZTMI047.ZC3.104.MT_ZTMI047_OUT.Row', null);
}

export function makeSelectorCountBangKeChuaDongTai(state: AppStateType): number {
  return size(makeSelectorBangKeChuaDongTai(state));
}

//__________________________________________________

export function makeSelectorKienChuaDongChuyenThu(state: AppStateType): API.RowMTZTMI047OUT[] | [] {
  return get(state, 'MIOA_ZTMI047.ZBIG.BHD.101.MT_ZTMI047_OUT.Row', []);
}
export function makeSelectorTaiChuaNhanBKPhieuGui(state: AppStateType): API.RowMTZTMI047OUT[] {
  return get(state, 'MIOA_ZTMI047.ZC2.108.MT_ZTMI047_OUT.Row', []);
}
export function makeSelectorBangKeChuaNhanPhieuGui(state: AppStateType): API.RowMTZTMI047OUT[] {
  return get(state, 'MIOA_ZTMI047.ZC1.109.MT_ZTMI047_OUT.Row', []);
}

/**
 * @param IV_TOR_TYPE
 * @param IV_CUST_STATUS
 */
export function makeSelectorPaging(IV_TOR_TYPE: string, IV_CUST_STATUS: number) {
  return (state: AppStateType): API.Paging =>
    get(state, `MIOA_ZTMI047.${IV_TOR_TYPE}.${IV_CUST_STATUS}.MT_ZTMI047_OUT.Paging`, {});
}

/**
 * @param IV_TOR_TYPE
 * @param IV_CUST_STATUS
 */
export function makeSelectorTotalPage(IV_TOR_TYPE: string, IV_CUST_STATUS: number) {
  return (state: AppStateType): number =>
    toNumber(get(state, `MIOA_ZTMI047.${IV_TOR_TYPE}.${IV_CUST_STATUS}.MT_ZTMI047_OUT.Paging.EV_TOTAL_PAGE`, 1));
}

/**
 * @param IV_TOR_TYPE
 * @param IV_CUST_STATUS
 */
export function makeSelectorTotalItem(IV_TOR_TYPE: string, IV_CUST_STATUS: number) {
  return (state: AppStateType): string =>
    get(state, `MIOA_ZTMI047.${IV_TOR_TYPE}.${IV_CUST_STATUS}.MT_ZTMI047_OUT.Paging.EV_TOTAL_ITEM`, '0');
}

/**
 * @param IV_TOR_TYPE
 * @param IV_CUST_STATUS
 */
export function makeSelectorRow(IV_TOR_TYPE: string, IV_CUST_STATUS: number) {
  return (state: AppStateType): API.RowMTZTMI047OUT[] =>
    get(state, `MIOA_ZTMI047.${IV_TOR_TYPE}.${IV_CUST_STATUS}.MT_ZTMI047_OUT.Row`, []);
}

/**
 * @param IV_TOR_TYPE
 * @param IV_CUST_STATUS
 */
export function makeSelectorRowSize(IV_TOR_TYPE: string, IV_CUST_STATUS: number) {
  return (state: AppStateType): number => size(makeSelectorRow(IV_TOR_TYPE, IV_CUST_STATUS)(state));
}

/**
 * @param IV_TOR_TYPE
 * @param IV_CUST_STATUS
 */
export function makeSelectorPagingCount(IV_TOR_TYPE: string, IV_CUST_STATUS: number) {
  return (state: AppStateType): number =>
    toNumber(
      trim(get(state, `MIOA_ZTMI047.${IV_TOR_TYPE}.${IV_CUST_STATUS}.MT_ZTMI047_OUT.Paging.EV_TOTAL_ITEM`, '0')),
    );
}

/**
 * Select chuyến thư chưa nhận tải/kiện
 */
export const makeSelectorChuyenThuChuaNhanTaiKien = (state: AppStateType): API.RowMTZTMI047OUT[] =>
  filter(
    makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.CHUYEN_THU_DA_QUET_NHAN)(state),
    (chuyenThu: API.RowMTZTMI047OUT): boolean => {
      return !isEmpty(
        filter(get(chuyenThu, 'Childs'), (child: API.Child): boolean => {
          if (
            get(child, 'TOR_TYPE') === SipDataType.TAI &&
            toNumber(get(child, 'LIFECYCLE')) === SipDataState.CHUYEN_THU_DA_QUET_NHAN
          ) {
            return true;
          }

          if (
            get(child, 'TOR_TYPE') === SipDataType.KIEN &&
            (toNumber(get(child, 'LIFECYCLE')) === SipDataState.KIEN_CHUA_QUET_NHAN_THUOC_CHUYEN_THU_DA_NHAN_TAI_TTKT ||
              toNumber(get(child, 'LIFECYCLE')) ===
                SipDataState.KIEN_CHUA_QUET_NHAN_THUOC_CHUYEN_THU_DA_NHAN_TAI_BUU_CUC)
          ) {
            return true;
          }

          return false;
        }),
      );
    },
  );

/**
 * Count chuyến thư chưa nhận tải/kiện
 */
export const makeSelectorCountChuyenThuChuaNhanTaiKien = (state: AppStateType): number =>
  size(makeSelectorChuyenThuChuaNhanTaiKien(state));
