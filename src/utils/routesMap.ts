export const AUTH = '/auth';
export const AUTH_LOGIN = `${AUTH}/login`;
export const AUTH_LOGIN_CALLBACK = `${AUTH}/login-callback`;
export const AUTH_LOGOUT_CALLBACK = `${AUTH}/logout-callback`;
export const AUTH_SILENT_CALLBACK = `${AUTH}/silent-callback`;

export const ERROR = '/error';
export const ERROR_404 = `${ERROR}/404`;
export const ERROR_500 = `${ERROR}/500`;
export const ERROR_NO_DATA = `${ERROR}/no-data`;

export const BAO_CAO = '/bao-cao';
export const BAO_CAO_1 = `${BAO_CAO}/bao-cao-1`;

export const KHAI_THAC_DI = '/khai-thac-di';
export const DONG_BANG_KE = `${KHAI_THAC_DI}/dong-bang-ke`;
export const DONG_BANG_KE_NOI_TINH = `${KHAI_THAC_DI}/dong-bang-ke-noi-tinh`;
export const THONG_TIN_BANG_KE = `${KHAI_THAC_DI}/thong-tin-bang-ke`;
export const DONG_TAI = `${KHAI_THAC_DI}/dong-tai`;
export const DANH_SACH_PHIEU_GUI_TRONG_TAI = `${KHAI_THAC_DI}/danh-sach-phieu-gui-trong-tai/:idTai`;
export const DANH_SACH_PHIEU_GUI_TRONG_TAI_DA_DONG = `${KHAI_THAC_DI}/danh-sach-phieu-gui-trong-tai-da-dong/:idTai`;
export const DANH_SACH_PHIEU_GUI_TRONG_BANG_KE = `${KHAI_THAC_DI}/danh-sach-phieu-gui-trong-bang-ke/:idBangKe`;
export const DANH_SACH_PHIEU_GUI_TRONG_BANG_KE_DA_DONG = `${KHAI_THAC_DI}/danh-sach-phieu-gui-trong-bang-ke-da-dong/:idBangKe`;
export const DONG_CHUYEN_THU = `${KHAI_THAC_DI}/dong-chuyen-thu`;
export const DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU = `${KHAI_THAC_DI}/danh-sach-tai-kien-trong-chuyen-thu/:idChuyenThu`;
export const DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU_DA_DONG = `${KHAI_THAC_DI}/danh-sach-tai-kien-trong-chuyen-thu-da-dong/:idChuyenThu`;
export const TACH_PHIEU_GUI = `${KHAI_THAC_DI}/tach-phieu-gui`;

export const NHAP_PHIEU_GUI = '/nhap-phieu-gui';
export const NHAP_PHIEU_GUI_TRONG_NUOC = `${NHAP_PHIEU_GUI}/phieu-gui-trong-nuoc/tao-don`;
export const PHIEU_GUI_TRONG_NUOC = `${NHAP_PHIEU_GUI}/phieu-gui-trong-nuoc/:idDonHang`;
export const NHAP_PHIEU_GUI_QUOC_TE = `${NHAP_PHIEU_GUI}/phieu-gui-quoc-te`;
export const NHAP_TU_FILE_EXCEL = `${NHAP_PHIEU_GUI}/nhap-tu-file-excel`;
export const NHAN_TAI_BUU_CUC_GOC = `${NHAP_PHIEU_GUI}/nhan-tai-buu-cuc-goc`;

export const DIEU_HANH = '/dieu-hanh';
export const BIEN_BAN_NOI_BO = `${DIEU_HANH}/bien-ban-noi-bo`;
export const SUA_BIEN_BAN = `${DIEU_HANH}/sua-bien-ban`;
export const XAC_MINH_BIEN_BAN = `${DIEU_HANH}/xac-minh-bien-ban`;
export const KHIEU_NAI_KHACH_HANG = `${DIEU_HANH}/khieu-nai-khach-hang`;
export const CHI_TIET_KHIEU_NAI = `${DIEU_HANH}/chi-tiet-khieu-nai`;
export const LAP_BIEN_BAN = `${DIEU_HANH}/lap-bien-ban`;
export const TRA_CUU_BIEN_BAN = `${DIEU_HANH}/tra-cuu-bien-ban`;

export const KHAI_THAC_DEN = '/khai-thac-den';
export const NHAN_CHUYEN_THU = `${KHAI_THAC_DEN}/nhan-chuyen-thu`;
export const NHAN_TAI_KIEN = `${KHAI_THAC_DEN}/nhan-tai-kien`;
export const THONG_TIN_CHUYEN_THU = `${KHAI_THAC_DEN}/nhan-chuyen-thu/:idChuyenThu`;
export const THONG_TIN_TAI = `${KHAI_THAC_DEN}/nhan-chuyen-thu/:idChuyenThu/:idTaiKien`;
export const KHAI_THAC_CHUYEN_THU_DEN = `${KHAI_THAC_DEN}/khai-thac-chuyen-thu-den`;
export const KHAI_THAC_TAI = `${KHAI_THAC_DEN}/khai-thac-tai`;
export const NHAN_BANG_KE_PHIEU_GUI = `${KHAI_THAC_DEN}/nhan-bang-ke-phieu-gui/:idTaiKien`;
export const PHAN_CONG_PHAT_NHAN = `${KHAI_THAC_DEN}/phan-cong-phat-nhan`;

export const KHACH_HANG = '/khach-hang';
export const TIEP_XUC_KHACH_HANG = `${KHACH_HANG}/tiep-xuc-khach-hang`;

export default {
  ROOT: '/',
  HOME: '/home',
  /**
   * Error
   */
  ERROR,
  ERROR_404,
  ERROR_500,
  ERROR_NO_DATA,
  /**
   * Authentication
   */
  AUTH,
  AUTH_LOGIN,
  AUTH_LOGIN_CALLBACK,
  AUTH_LOGOUT_CALLBACK,
  AUTH_SILENT_CALLBACK,
  /**
   * Báo cáo
   */
  BAO_CAO,
  BAO_CAO_1,
  /**
   * Khai thác đi
   */
  KHAI_THAC_DI,
  DONG_BANG_KE,
  DONG_BANG_KE_NOI_TINH,
  THONG_TIN_BANG_KE,
  DONG_TAI,
  DANH_SACH_PHIEU_GUI_TRONG_TAI,
  DANH_SACH_PHIEU_GUI_TRONG_TAI_DA_DONG,
  DANH_SACH_PHIEU_GUI_TRONG_BANG_KE,
  DANH_SACH_PHIEU_GUI_TRONG_BANG_KE_DA_DONG,
  DONG_CHUYEN_THU,
  DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU,
  DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU_DA_DONG,
  TACH_PHIEU_GUI,
  /**
   * Nhập phiếu gửi
   */
  NHAP_PHIEU_GUI,
  PHIEU_GUI_TRONG_NUOC,
  NHAP_PHIEU_GUI_TRONG_NUOC,
  NHAP_PHIEU_GUI_QUOC_TE,
  NHAP_TU_FILE_EXCEL,
  NHAN_TAI_BUU_CUC_GOC,
  /**
   * Điều hành
   */
  DIEU_HANH,
  BIEN_BAN_NOI_BO,
  SUA_BIEN_BAN,
  XAC_MINH_BIEN_BAN,
  KHIEU_NAI_KHACH_HANG,
  CHI_TIET_KHIEU_NAI,
  LAP_BIEN_BAN,
  TRA_CUU_BIEN_BAN,
  /**
   * Khai thác đến
   */
  KHAI_THAC_DEN,
  NHAN_CHUYEN_THU,
  NHAN_TAI_KIEN,
  KHAI_THAC_CHUYEN_THU_DEN,
  THONG_TIN_CHUYEN_THU,
  THONG_TIN_TAI,
  KHAI_THAC_TAI,
  NHAN_BANG_KE_PHIEU_GUI,
  PHAN_CONG_PHAT_NHAN,
  /**
   * Khách hàng
   */
  KHACH_HANG,
  TIEP_XUC_KHACH_HANG,
  /**
   * Thong tin don hang
   */
  THONG_TIN_KIEN_HANG: '/thong-tin-kien-hang/:idDonHang/:idKienHang',
  THONG_TIN_DON_HANG_NEW: '/thong-tin-don-hang-new',
  THONG_TIN_DON_HANG: '/thong-tin-don-hang/:idDonHang',
  THONG_TIN_DON_HANG_ORIGIN: '/thong-tin-don-hang',
};
