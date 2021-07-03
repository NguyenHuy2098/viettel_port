import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import routesMap from 'utils/routesMap';
import { SIPRoutePropsType } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */

// =============== DieuHanh =====================

const TiepXucKhachHang = lazy(() => import('containers/DieuHanh/TiepXucKhachHang'));
const BienBanNoiBo = lazy(() => import('containers/DieuHanh/BienBanNoiBo'));
const LapBienBan = lazy(() => import('containers/DieuHanh/BienBanNoiBo/LapBienBan'));
const TraCuuBienBan = lazy(() => import('containers/DieuHanh/BienBanNoiBo/TraCuuBienBan'));
const SuaBienBan = lazy(() => import('containers/DieuHanh/BienBanNoiBo/SuaBienBan'));
const XacMinhBienBan = lazy(() => import('containers/DieuHanh/BienBanNoiBo/XacMinhBienBan'));
const KhieuNaiKhachHang = lazy(() => import('containers/DieuHanh/KhieuNaiKhachHang'));
const ChiTietKhieuNai = lazy(() => import('containers/DieuHanh/KhieuNaiKhachHang/ChiTiet'));
const BaoCao = lazy(() => import('containers/BaoCao'));

// =============== NhapPhieuGui =====================

const PhieuGuiTrongNuoc = lazy(() => import('containers/NhapPhieuGui/PhieuGuiTrongNuoc'));
const PhieuGuiQuocTe = lazy(() => import('containers/NhapPhieuGui/PhieuGuiQuocTe'));
const NhapTuFileExcel = lazy(() => import('containers/NhapPhieuGui/NhapTuFileExcel'));
const ChiTietLichSu = lazy(() => import('containers/NhapPhieuGui/NhapTuFileExcel/ChiTietLichSu'));
const NhanTaiBuuCucGoc = lazy(() => import('containers/NhapPhieuGui/NhanTaiBuuCucGoc'));
const ChiTietNhomHangHoa = lazy(() => import('containers/NhapPhieuGui/NhanTaiBuuCucGoc/ChiTietNhomHangHoa'));

// =============== KhaiThacDi =====================

const DongBangKe = lazy(() => import('containers/KhaiThacDi/DongBangKe/index'));
const DongBangKeNoiTinh = lazy(() => import('containers/KhaiThacDi/BangKe/DongBangKeNoiTinh'));
const ThongTinBangKe = lazy(() => import('containers/KhaiThacDi/BangKe/ThongTinBangKe'));
const DanhSachPhieuGuiTrongBangKe = lazy(() => import('containers/KhaiThacDi/DongBangKe/DanhSachPhieuGuiTrongBangKe'));
const DanhSachPhieuGuiTrongBangKeDaDong = lazy(() =>
  import('containers/KhaiThacDi/DongBangKe/DanhSachPhieuGuiTrongBangKeDaDong'),
);
const DongTai = lazy(() => import('containers/KhaiThacDi/DongTai'));
const DanhSachPhieuGuiTrongTai = lazy(() => import('containers/KhaiThacDi/DongTai/DanhSachPhieuGuiTrongTai'));
const DanhSachPhieuGuiTrongTaiDaDong = lazy(() =>
  import('containers/KhaiThacDi/DongTai/DanhSachPhieuGuiTrongTaiDaDong'),
);
const DongChuyenThu = lazy(() => import('containers/KhaiThacDi/DongChuyenThu'));
const DanhSachTaiKienTrongChuyenThu = lazy(() =>
  import('containers/KhaiThacDi/DongChuyenThu/DanhSachTaiKienTrongChuyenThu'),
);
const DanhSachTaiKienTrongChuyenThuDaDong = lazy(() =>
  import('containers/KhaiThacDi/DongChuyenThu/DanhSachTaiKienTrongChuyenThuDaDong'),
);
const TachPhieuGui = lazy(() => import('containers/KhaiThacDi/TachPhieuGui'));
const ChiTietBuuGuiChuaDongBangKe = lazy(() => import('containers/KhaiThacDi/DongBangKe/ChiTietBuuGuiChuaDongBangKe'));

// =============== KhaiThacDen =====================

const NhanChuyenThu = lazy(() => import('containers/KhaiThacDen/NhanChuyenThu'));
const NhanTaiKien = lazy(() => import('containers/KhaiThacDen/NhanTaiKien'));
const KhaiThacChuyenThuDen = lazy(() => import('containers/KhaiThacDen/KhaiThacChuyenThuDen'));
const ThongTinChuyenThu = lazy(() => import('containers/KhaiThacDen/ThongTinChuyenThu'));
const ThongTinTai = lazy(() => import('containers/KhaiThacDen/ThongTinTai'));
const ThongTinBangKePhieuGui = lazy(() => import('containers/KhaiThacDen/ThongTinBangKe'));
const KhaiThacTai = lazy(() => import('containers/KhaiThacDen/KhaiThacTai'));
const NhanBangKePhieuGui = lazy(() => import('containers/KhaiThacDen/NhanBangKePhieuGui'));
const PhanCongPhatNhan = lazy(() => import('containers/KhaiThacDen/PhanCongPhatNhan'));

// =========== unsorted components ==========

const ThongTinKienHang = lazy(() => import('containers/ThongTinKienHang'));
const ThongTinDonHang = lazy(() => import('containers/ThongTinDonHang'));
const InDonHang = lazy(() => import('containers/InDonHang'));
const ThongTinDonHangNew = lazy(() => import('containers/ThongTinDonHangNew'));
const PageNoData = lazy(() => import('containers/PageNoData'));
const Home = lazy(() => import('containers/Home'));
const RedirectToHome = lazy(() => import('./RedirectToHome'));

const KeKhaiChiPhi = lazy(() => import('containers/KeKhaiChiPhi/DanhSachBangKe'));
const TaoMoiBangKe = lazy(() => import('containers/KeKhaiChiPhi/TaoMoiBangKe'));
const ChiTietBangKe = lazy(() => import('containers/KeKhaiChiPhi/ChiTietBangKe'));

/* eslint-enable @typescript-eslint/no-explicit-any */
const CongNoBuuTa = lazy(() => import('containers/Gach/CongNoBuuTa'));
const ChiCOD = lazy(() => import('containers/Gach/ChiCOD'));
// eslint-disable-next-line max-lines-per-function
const routes = (t: TFunction): SIPRoutePropsType[] => {
  return [
    { path: routesMap.ROOT, exact: true, name: t('Root'), component: RedirectToHome },
    { path: routesMap.HOME, exact: true, name: t('Home'), component: Home },
    { path: routesMap.CHI_TIET_BANG_KE, exact: true, name: t('Chi tiết bảng kê'), component: ChiTietBangKe },
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
    {
      path: routesMap.CHI_TIET_LICH_SU,
      name: t('Phiếu gửi trong nước'),
      component: ChiTietLichSu,
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
    { path: routesMap.IN_DON_HANG, name: t('In đơn hàng'), component: InDonHang },
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
    { path: routesMap.TAO_MOI_BANG_KE, name: t('Tạo mới bảng kê'), component: TaoMoiBangKe },
    { path: routesMap.KE_KHAI_CHI_PHI, name: t('Kê khai chi phí'), component: KeKhaiChiPhi },
    {
      path: routesMap.CHI_TIET_BUU_BUI_CHUA_DONG_BANG_KE,
      name: t('Chi tiết nhóm hàng hóa'),
      component: ChiTietBuuGuiChuaDongBangKe,
    },
    { path: routesMap.CONG_NO_BUU_TA, name: t('Công nợ bưu tá'), component: CongNoBuuTa },
    { path: routesMap.CHI_COD, name: t('Chi COD'), component: ChiCOD },
  ];
};

const useRoutes = (): SIPRoutePropsType[] => {
  const { t } = useTranslation();
  return routes(t);
};

export default useRoutes;
