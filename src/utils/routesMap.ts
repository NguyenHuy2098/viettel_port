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
export const DANH_SACH_BANG_KE = `${KHAI_THAC_DI}/danh-sach-bang-ke`;
export const DANH_SACH_PHIEU_GUI = `${KHAI_THAC_DI}/danh-sach-phieu-gui`;
export const DANH_SACH_PHIEU_GUI_TRONG_BANG_KE = `${KHAI_THAC_DI}/danh-sach-phieu-gui-trong-bang-ke/:manifestId`;
export const DONG_TAI = `${KHAI_THAC_DI}/dong-tai`;
export const DONG_CHUYEN_THU = `${KHAI_THAC_DI}/dong-chuyen-thu`;
export const DANH_SACH_TAI_KIEN = `${KHAI_THAC_DI}/danh-sach-tai-kien`;
export const TACH_PHIEU_GUI = `${KHAI_THAC_DI}/tach-phieu-gui`;

export const NHAP_PHIEU_GUI = '/nhap-phieu-gui';
export const NHAP_PHIEU_GUI_TRONG_NUOC = `${NHAP_PHIEU_GUI}/phieu-gui-trong-nuoc`;
export const NHAP_PHIEU_GUI_QUOC_TE = `${NHAP_PHIEU_GUI}/phieu-gui-quoc-te`;
export const NHAP_DOANH_THU = `${NHAP_PHIEU_GUI}/nhap-doanh-thu`;
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
export const KHAI_THAC_CHUYEN_THU_DEN = `${KHAI_THAC_DEN}/khai-thac-chuyen-thu-den`;
export const NHAN_TAI_KIEN = `${KHAI_THAC_DEN}/nhan-tai-kien/:idChuyenThu`;
export const KHAI_THAC_TAI = `${KHAI_THAC_DEN}/khai-thac-tai`;
export const NHAN_BANG_KE_PHIEU_GUI = `${KHAI_THAC_DEN}/nhan-bang-ke-phieu-gui/:idTaiKien`;

export const KHACH_HANG = '/khach-hang';
export const TIEP_XUC_KHACH_HANG = `${KHACH_HANG}/tiep-xuc-khach-hang`;

export default {
  root: '/',
  home: '/home',
  /**
   * Error
   */
  error: ERROR,
  error404: ERROR_404,
  error500: ERROR_500,
  pageNoData: ERROR_NO_DATA,
  /**
   * Authentication
   */
  auth: AUTH,
  login: AUTH_LOGIN,
  loginCallback: AUTH_LOGIN_CALLBACK,
  logoutCallback: AUTH_LOGOUT_CALLBACK,
  silentCallback: AUTH_SILENT_CALLBACK,
  /**
   * Báo cáo
   */
  baoCao: BAO_CAO,
  baoCao1: BAO_CAO_1,
  /**
   * Khai thác đi
   */
  khaiThacDi: KHAI_THAC_DI,
  dongBangKe: DONG_BANG_KE,
  dongBangKeNoiTinh: DONG_BANG_KE_NOI_TINH,
  thongTinBangKe: THONG_TIN_BANG_KE,
  danhSachBangKe: DANH_SACH_BANG_KE,
  danhSachPhieuGui: DANH_SACH_PHIEU_GUI,
  danhSachPhieuGuiTrongBangKe: DANH_SACH_PHIEU_GUI_TRONG_BANG_KE,
  dongTai: DONG_TAI,
  dongChuyenThu: DONG_CHUYEN_THU,
  danhSachTaiKien: DANH_SACH_TAI_KIEN,
  tachPhieuGui: TACH_PHIEU_GUI,
  /**
   * Nhập phiếu gửi
   */
  nhapPhieuGui: NHAP_PHIEU_GUI,
  phieuGuiTrongNuoc: NHAP_PHIEU_GUI_TRONG_NUOC,
  phieuGuiQuocTe: NHAP_PHIEU_GUI_QUOC_TE,
  nhapDoanhThu: NHAP_DOANH_THU,
  nhanTaiBuuCucGoc: NHAN_TAI_BUU_CUC_GOC,
  /**
   * Điều hành
   */
  dieuHanh: DIEU_HANH,
  bienBanNoiBo: BIEN_BAN_NOI_BO,
  suaBienBan: SUA_BIEN_BAN,
  xacMinhBienBan: XAC_MINH_BIEN_BAN,
  khieuNaiKhachHang: KHIEU_NAI_KHACH_HANG,
  chiTietKhieuNai: CHI_TIET_KHIEU_NAI,
  lapBienBan: LAP_BIEN_BAN,
  traCuuBienBan: TRA_CUU_BIEN_BAN,
  /**
   * Khai thác đến
   */
  khaiThacDen: KHAI_THAC_DEN,
  nhanChuyenThu: NHAN_CHUYEN_THU,
  khaiThacChuyenThuDen: KHAI_THAC_CHUYEN_THU_DEN,
  nhanTaiKien: NHAN_TAI_KIEN,
  khaiThacTai: KHAI_THAC_TAI,
  nhanBangKePhieuGui: NHAN_BANG_KE_PHIEU_GUI,
  /**
   * Khách hàng
   */
  khachHang: KHACH_HANG,
  tiepXucKhachHang: TIEP_XUC_KHACH_HANG,
  /**
   * Thong tin don hang
   */
  thongTinDonHang: '/thong-tin-don-hang',
  thongTinDonHang2: '/thong-tin-don-hang-2',
  thongTinDonHangNew: '/thong-tin-don-hang-new',
};
