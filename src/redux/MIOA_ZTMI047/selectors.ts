import { filter, get, isArray, isEmpty, size, toNumber, trim } from 'lodash';
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
  return (state: AppStateType): API.RowMTZTMI047OUT[] => {
    const result = get(state, `MIOA_ZTMI047.${IV_TOR_TYPE}.${IV_CUST_STATUS}.MT_ZTMI047_OUT.Row`, []);

    if (isArray(result)) {
      return result;
    }

    return [];
  };
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
 * @param state
 */
export const makeSelectorChuyenThuChuaNhanTaiKien = (state: AppStateType): API.RowMTZTMI047OUT[] => {
  return filter(
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
};

/**
 * Count chuyến thư chưa nhận tải/kiện
 */
export const makeSelectorCountChuyenThuChuaNhanTaiKien = (state: AppStateType): number =>
  size(makeSelectorChuyenThuChuaNhanTaiKien(state));

/**
 * Select tải chưa nhận bảng kê phiếu gửi
 * @param state
 */
export const makeSelectorTaiChuaNhanBangKePhieuGui = (state: AppStateType): API.RowMTZTMI047OUT[] => {
  return filter(
    makeSelectorRow(SipDataType.TAI, SipDataState.TAI_KIEN_DA_QUET_NHAN)(state),
    (tai: API.RowMTZTMI047OUT): boolean => {
      return !isEmpty(
        filter(get(tai, 'Childs'), (child: API.Child) => {
          return toNumber(get(child, 'LIFECYCLE')) === SipDataState.TAI_KIEN_DA_QUET_NHAN;
        }),
      );
    },
  );
};

/**
 * Count tải chưa nhận bảng kê phiếu gửi
 */
export const makeSelectorCountTaiChuaNhanBangKePhieuGui = (state: AppStateType): number =>
  size(makeSelectorTaiChuaNhanBangKePhieuGui(state));

/**
 * Select bảng kê chưa nhận phiếu gửi
 * @param state
 */
export const makeSelectorBangKeChuaNhanPhieuGui = (state: AppStateType): API.RowMTZTMI047OUT[] => {
  return filter(
    makeSelectorRow(SipDataType.BANG_KE, SipDataState.BANG_KE_DA_QUET_NHAN)(state),
    (tai: API.RowMTZTMI047OUT): boolean => {
      return !isEmpty(
        filter(get(tai, 'Childs'), (child: API.Child) => {
          return (
            toNumber(get(child, 'LIFECYCLE')) === SipDataState.PHIEU_GUI_CHUA_QUET_NHAN_TAI_TTKT ||
            toNumber(get(child, 'LIFECYCLE')) === SipDataState.PHIEU_GUI_CHUA_QUET_NHAN_TAI_BUU_CUC
          );
        }),
      );
    },
  );
};

/**
 * Count tải chưa nhận bảng kê phiếu gửi
 */
export const makeSelectorCountBangKeChuaNhanPhieuGui = (state: AppStateType): number =>
  size(makeSelectorBangKeChuaNhanPhieuGui(state));
