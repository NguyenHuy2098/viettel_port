import { useTranslation } from 'react-i18next';
import Loadable from 'react-loadable';
import i18next from 'i18next';

import Loading from 'components/Loading';
import routesMap from 'utils/routesMap';
import { SIPRoutePropsType } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */

// =============== DieuHanh =====================

const TiepXucKhachHang = Loadable({
  loader: (): any => import('containers/DieuHanh/TiepXucKhachHang'),
  loading: Loading,
});
const BienBanNoiBo = Loadable({
  loader: (): any => import('containers/DieuHanh/BienBanNoiBo'),
  loading: Loading,
});
const LapBienBan = Loadable({
  loader: (): any => import('containers/DieuHanh/BienBanNoiBo/LapBienBan'),
  loading: Loading,
});
const TraCuuBienBan = Loadable({
  loader: (): any => import('containers/DieuHanh/BienBanNoiBo/TraCuuBienBan'),
  loading: Loading,
});
const SuaBienBan = Loadable({
  loader: (): any => import('containers/DieuHanh/BienBanNoiBo/SuaBienBan'),
  loading: Loading,
});
const XacMinhBienBan = Loadable({
  loader: (): any => import('containers/DieuHanh/BienBanNoiBo/XacMinhBienBan'),
  loading: Loading,
});
const KhieuNaiKhachHang = Loadable({
  loader: (): any => import('containers/DieuHanh/KhieuNaiKhachHang'),
  loading: Loading,
});
const ChiTietKhieuNai = Loadable({
  loader: (): any => import('containers/DieuHanh/KhieuNaiKhachHang/ChiTiet'),
  loading: Loading,
});
const BaoCao = Loadable({
  loader: (): any => import('containers/BaoCao'),
  loading: Loading,
});

// =============== NhapPhieuGui =====================

const PhieuGuiTrongNuoc = Loadable({
  loader: (): any => import('containers/NhapPhieuGui/PhieuGuiTrongNuoc'),
  loading: Loading,
});
const PhieuGuiQuocTe = Loadable({
  loader: (): any => import('containers/NhapPhieuGui/PhieuGuiQuocTe'),
  loading: Loading,
});
const NhapTuFileExcel = Loadable({
  loader: (): any => import('containers/NhapPhieuGui/NhapTuFileExcel'),
  loading: Loading,
});
const NhanTaiBuuCucGoc = Loadable({
  loader: (): any => import('containers/NhapPhieuGui/NhanTaiBuuCucGoc'),
  loading: Loading,
});
const ChiTietNhomHangHoa = Loadable({
  loader: (): any => import('containers/NhapPhieuGui/NhanTaiBuuCucGoc/ChiTietNhomHangHoa'),
  loading: Loading,
});

// =============== KhaiThacDi =====================

const DongBangKe = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongBangKe/index'),
  loading: Loading,
});
const DongBangKeNoiTinh = Loadable({
  loader: (): any => import('containers/KhaiThacDi/BangKe/DongBangKeNoiTinh'),
  loading: Loading,
});
const ThongTinBangKe = Loadable({
  loader: (): any => import('containers/KhaiThacDi/BangKe/ThongTinBangKe'),
  loading: Loading,
});
const DanhSachPhieuGuiTrongBangKe = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongBangKe/DanhSachPhieuGuiTrongBangKe'),
  loading: Loading,
});
const DanhSachPhieuGuiTrongBangKeDaDong = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongBangKe/DanhSachPhieuGuiTrongBangKeDaDong'),
  loading: Loading,
});
const DongTai = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongTai'),
  loading: Loading,
});
const DanhSachPhieuGuiTrongTai = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongTai/DanhSachPhieuGuiTrongTai'),
  loading: Loading,
});
const DanhSachPhieuGuiTrongTaiDaDong = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongTai/DanhSachPhieuGuiTrongTaiDaDong'),
  loading: Loading,
});
const DongChuyenThu = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongChuyenThu'),
  loading: Loading,
});
const DanhSachTaiKienTrongChuyenThu = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongChuyenThu/DanhSachTaiKienTrongChuyenThu'),
  loading: Loading,
});
const DanhSachTaiKienTrongChuyenThuDaDong = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongChuyenThu/DanhSachTaiKienTrongChuyenThuDaDong'),
  loading: Loading,
});
const TachPhieuGui = Loadable({
  loader: (): any => import('containers/KhaiThacDi/TachPhieuGui'),
  loading: Loading,
});
const ChiTietBuuGuiChuaDongBangKe = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongBangKe/ChiTietBuuGuiChuaDongBangKe'),
  loading: Loading,
});

// =============== KhaiThacDen =====================

const NhanChuyenThu = Loadable({
  loader: (): any => import('containers/KhaiThacDen/NhanChuyenThu'),
  loading: Loading,
});
const NhanTaiKien = Loadable({
  loader: (): any => import('containers/KhaiThacDen/NhanTaiKien'),
  loading: Loading,
});
const KhaiThacChuyenThuDen = Loadable({
  loader: (): any => import('containers/KhaiThacDen/KhaiThacChuyenThuDen'),
  loading: Loading,
});
const ThongTinChuyenThu = Loadable({
  loader: (): any => import('containers/KhaiThacDen/ThongTinChuyenThu'),
  loading: Loading,
});
const ThongTinTai = Loadable({
  loader: (): any => import('containers/KhaiThacDen/ThongTinTai'),
  loading: Loading,
});
const ThongTinBangKePhieuGui = Loadable({
  loader: (): any => import('containers/KhaiThacDen/ThongTinBangKe'),
  loading: Loading,
});
const KhaiThacTai = Loadable({
  loader: (): any => import('containers/KhaiThacDen/KhaiThacTai'),
  loading: Loading,
});
const NhanBangKePhieuGui = Loadable({
  loader: (): any => import('containers/KhaiThacDen/NhanBangKePhieuGui'),
  loading: Loading,
});
const PhanCongPhatNhan = Loadable({
  loader: (): any => import('containers/KhaiThacDen/PhanCongPhatNhan'),
  loading: Loading,
});

// =========== unsorted components ==========

const ThongTinKienHang = Loadable({
  loader: (): any => import('containers/ThongTinKienHang'),
  loading: Loading,
});
const ThongTinDonHang = Loadable({
  loader: (): any => import('containers/ThongTinDonHang'),
  loading: Loading,
});
const ThongTinDonHangNew = Loadable({
  loader: (): any => import('containers/ThongTinDonHangNew'),
  loading: Loading,
});
const PageNoData = Loadable({
  loader: (): any => import('containers/PageNoData'),
  loading: Loading,
});
const Home = Loadable({
  loader: (): any => import('containers/Home'),
  loading: Loading,
});
const RedirectToHome = Loadable({
  loader: (): any => import('./RedirectToHome'),
  loading: Loading,
});
/* eslint-enable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line max-lines-per-function
const routes = (t: i18next.TFunction): SIPRoutePropsType[] => {
  return [
    { path: routesMap.ROOT, exact: true, name: t('Root'), component: RedirectToHome },
    { path: routesMap.HOME, exact: true, name: t('Home'), component: Home },
    {
      path: routesMap.NHAP_PHIEU_GUI_TRONG_NUOC,
      exact: true,
      name: t('Phiếu gửi trong nước'),
      component: PhieuGuiTrongNuoc,
    },
    {
      path: routesMap.PHIEU_GUI_TRONG_NUOC,
      name: t('Phiếu gửi trong nước'),
      component: PhieuGuiTrongNuoc,
    },
    {
      path: routesMap.NHAP_PHIEU_GUI_QUOC_TE,
      exact: true,
      name: t('Phiếu gửi quốc tế'),
      component: PhieuGuiQuocTe,
    },
    {
      path: routesMap.PHIEU_GUI_QUOC_TE,
      name: t('Phiếu gửi trong nước'),
      component: PhieuGuiQuocTe,
    },
    { path: routesMap.DONG_BANG_KE_NOI_TINH, name: t('Đóng bảng kê nội tỉnh'), component: DongBangKeNoiTinh },
    { path: routesMap.DONG_BANG_KE, name: t('Đóng bảng kê'), component: DongBangKe },
    { path: routesMap.NHAP_TU_FILE_EXCEL, name: t('Nhập từ file excel'), component: NhapTuFileExcel },
    { path: routesMap.THONG_TIN_BANG_KE, name: t('Thông tin bảng kê'), component: ThongTinBangKe },
    { path: routesMap.DONG_TAI, name: t('Đóng tải'), component: DongTai },
    {
      path: routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI,
      name: t('Danh sách phiêu gửi trong tải'),
      component: DanhSachPhieuGuiTrongTai,
    },
    {
      path: routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI_DA_DONG,
      name: t('Danh sách phiêu gửi trong tải đã đóng'),
      component: DanhSachPhieuGuiTrongTaiDaDong,
    },
    { path: routesMap.DONG_CHUYEN_THU, name: t('Đóng chuyến thư'), component: DongChuyenThu },
    { path: routesMap.THONG_TIN_TAI, name: t('Thông tin tải'), component: ThongTinTai },
    {
      path: routesMap.THONG_TIN_BANG_KE_PHIEU_GUI,
      name: t('Thông tin bảng kê/phiếu gửi'),
      component: ThongTinBangKePhieuGui,
    },
    { path: routesMap.THONG_TIN_CHUYEN_THU, name: t('Thông tin chuyến thư'), component: ThongTinChuyenThu },
    {
      path: routesMap.NHAN_BANG_KE_PHIEU_GUI,
      name: t('Nhận bảng kê phiếu gưi'),
      component: NhanBangKePhieuGui,
    },
    {
      path: routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE,
      name: t('Danh sách phiếu gửi trong bảng kê'),
      component: DanhSachPhieuGuiTrongBangKe,
    },
    {
      path: routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE_DA_DONG,
      name: t('Danh sách phiếu gửi trong bảng kê đã đóng'),
      component: DanhSachPhieuGuiTrongBangKeDaDong,
    },
    {
      path: routesMap.DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU,
      name: t('Danh sách tải kiện trong chuyến thư'),
      component: DanhSachTaiKienTrongChuyenThu,
    },
    {
      path: routesMap.DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU_DA_DONG,
      name: t('Danh sách tải kiện trong chuyến thư đã đóng'),
      component: DanhSachTaiKienTrongChuyenThuDaDong,
    },
    { path: routesMap.KHAI_THAC_TAI, name: t('Khai thác tải'), component: KhaiThacTai },
    { path: routesMap.NHAN_CHUYEN_THU, name: t('Nhận chuyến thư'), component: NhanChuyenThu },
    { path: routesMap.NHAN_TAI_KIEN, name: t('Nhận tải kiện'), component: NhanTaiKien },
    { path: routesMap.KHAI_THAC_CHUYEN_THU_DEN, name: t('Khai thác chuyển thư đến'), component: KhaiThacChuyenThuDen },
    { path: routesMap.ERROR_NO_DATA, name: t('Chưa có dữ liệu'), component: PageNoData },
    { path: routesMap.TIEP_XUC_KHACH_HANG, name: t('Tiếp xúc khách hàng'), component: TiepXucKhachHang },
    { path: routesMap.THONG_TIN_KIEN_HANG, name: t('Thông tin kiện hàng'), component: ThongTinKienHang },
    { path: routesMap.THONG_TIN_DON_HANG, name: t('Thông tin đơn hàng'), component: ThongTinDonHang },
    { path: routesMap.THONG_TIN_DON_HANG_NEW, name: t('Thông tin đơn hàng new'), component: ThongTinDonHangNew },
    { path: routesMap.TACH_PHIEU_GUI, name: t('Tách phiếu gửi'), component: TachPhieuGui },
    { path: routesMap.BIEN_BAN_NOI_BO, name: t('Biên bản nội bộ'), component: BienBanNoiBo },
    { path: routesMap.LAP_BIEN_BAN, name: t('Lập biên bản'), component: LapBienBan },
    { path: routesMap.TRA_CUU_BIEN_BAN, name: t('Tra cứu biên bản'), component: TraCuuBienBan },
    { path: routesMap.SUA_BIEN_BAN, name: t('Sửa biên bản'), component: SuaBienBan },
    { path: routesMap.XAC_MINH_BIEN_BAN, name: t('Xác minh biên bản'), component: XacMinhBienBan },
    { path: routesMap.KHIEU_NAI_KHACH_HANG, name: t('Khiếu nại khách hàng'), component: KhieuNaiKhachHang },
    { path: routesMap.CHI_TIET_KHIEU_NAI, name: t('Chi tiết khiếu nại'), component: ChiTietKhieuNai },
    { path: routesMap.BAO_CAO, name: t('Báo cáo'), component: BaoCao },
    { path: routesMap.NHAN_TAI_BUU_CUC_GOC, name: t('Quét mã phiếu gửi'), component: NhanTaiBuuCucGoc },
    { path: routesMap.PHAN_CONG_PHAT_NHAN, name: t('Phân công phát nhận'), component: PhanCongPhatNhan },
    { path: routesMap.CHI_TIET_NHOM_HANG_HOA, name: t('Chi tiết nhóm hàng hóa'), component: ChiTietNhomHangHoa },
    {
      path: routesMap.CHI_TIET_BUU_BUI_CHUA_DONG_BANG_KE,
      name: t('Chi tiết nhóm hàng hóa'),
      component: ChiTietBuuGuiChuaDongBangKe,
    },
  ];
};

const useRoutes = (): SIPRoutePropsType[] => {
  const { t } = useTranslation();
  return routes(t);
};

export default useRoutes;
