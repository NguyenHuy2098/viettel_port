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
const InternationalForwardingOrder = Loadable({
  loader: (): any => import('containers/NhapPhieuGui/PhieuGuiQuocTe'),
  loading: Loading,
});
const NhapDoanhThu = Loadable({
  loader: (): any => import('containers/NhapPhieuGui/NhapDoanhThu'),
  loading: Loading,
});
const NhanTaiBuuCucGoc = Loadable({
  loader: (): any => import('containers/NhapPhieuGui/NhanTaiBuuCucGoc'),
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
const DanhSachBangKe = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DanhSachBangKe/DanhSachBangKe'),
  loading: Loading,
});
const DanhSachPhieuGuiTrongBangKe = Loadable({
  loader: (): any => import('containers/NhapPhieuGui/NhanTaiBuuCucGoc/DanhSachPhieuGuiTrongBangKe'),
  loading: Loading,
});
const DanhSachPhieuGui = Loadable({
  loader: (): any => import('containers/KhaiThacDi/BangKe/DanhSachPhieuGui'),
  loading: Loading,
});
const DongTai = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongTai'),
  loading: Loading,
});
const DongChuyenThu = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongChuyenThu'),
  loading: Loading,
});
const DanhSachTaiKien = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DanhSachTaiKien'),
  loading: Loading,
});
const TachPhieuGui = Loadable({
  loader: (): any => import('containers/KhaiThacDi/TachPhieuGui'),
  loading: Loading,
});

// =============== KhaiThacDen =====================

const NhanChuyenThu = Loadable({
  loader: (): any => import('containers/KhaiThacDen/NhanChuyenThu'),
  loading: Loading,
});
const KhaiThacChuyenThuDen = Loadable({
  loader: (): any => import('containers/KhaiThacDen/KhaiThacChuyenThuDen'),
  loading: Loading,
});
const ThongTinTai = Loadable({
  loader: (): any => import('containers/KhaiThacDen/NhanTaiKien/ThongTinTai'),
  loading: Loading,
});
const KhaiThacTai = Loadable({
  loader: (): any => import('containers/KhaiThacDen/KhaiThacDen'),
  loading: Loading,
});
const NhanBangKePhieuGui = Loadable({
  loader: (): any => import('containers/KhaiThacDen/NhanBangKePhieuGui/NhanBangKePhieuGui'),
  loading: Loading,
});

// =========== unsorted components ==========

const ThongTinDonHang = Loadable({
  loader: (): any => import('containers/ThongTinDonHang'),
  loading: Loading,
});
const ThongTinDonHang2 = Loadable({
  loader: (): any => import('containers/ThongTinDonHang2'),
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

const routes = (t: i18next.TFunction): SIPRoutePropsType[] => {
  return [
    { path: routesMap.root, exact: true, name: t('Root'), component: RedirectToHome },
    { path: routesMap.home, exact: true, name: t('Home'), component: Home },
    { path: routesMap.phieuGuiTrongNuoc, name: t('Phiếu gửi trong nước'), component: PhieuGuiTrongNuoc },
    {
      path: routesMap.phieuGuiQuocTe,
      name: t('Phiếu gửi quốc tế'),
      component: InternationalForwardingOrder,
    },
    { path: routesMap.dongBangKeNoiTinh, name: t('Đóng bảng kê nội tỉnh'), component: DongBangKeNoiTinh },
    { path: routesMap.dongBangKe, name: t('Đóng bảng kê'), component: DongBangKe },
    { path: routesMap.nhapDoanhThu, name: t('Nhập doanh thu'), component: NhapDoanhThu },
    { path: routesMap.thongTinBangKe, name: t('Thông tin bảng kê'), component: ThongTinBangKe },
    { path: routesMap.dongTai, name: t('Đóng tải'), component: DongTai },
    { path: routesMap.danhSachTaiKien, name: t('Danh sách tải kiện'), component: DanhSachTaiKien },
    { path: routesMap.dongChuyenThu, name: t('Đóng chuyến thư'), component: DongChuyenThu },
    { path: routesMap.nhanTaiKien, name: t('Nhận tải kiện'), component: ThongTinTai },
    {
      path: routesMap.nhanBangKePhieuGui,
      name: t('Nhận bảng kê phiếu gưi'),
      component: NhanBangKePhieuGui,
    },
    {
      path: routesMap.danhSachPhieuGuiTrongBangKe,
      name: t('Danh sách phiếu gửi trong bảng kê'),
      component: DanhSachPhieuGuiTrongBangKe,
    },
    { path: routesMap.danhSachBangKe, name: t('Danh sách bảng kê'), component: DanhSachBangKe },
    { path: routesMap.khaiThacTai, name: t('Khai thác tải'), component: KhaiThacTai },
    { path: routesMap.danhSachPhieuGui, name: t('Danh sách phiếu gửi'), component: DanhSachPhieuGui },
    { path: routesMap.nhanChuyenThu, name: t('Nhận chuyến thư'), component: NhanChuyenThu },
    { path: routesMap.khaiThacChuyenThuDen, name: t('Khai thác chuyển thư đến'), component: KhaiThacChuyenThuDen },
    { path: routesMap.pageNoData, name: t('Chưa có dữ liệu'), component: PageNoData },
    { path: routesMap.tiepXucKhachHang, name: t('Tiếp xúc khách hàng'), component: TiepXucKhachHang },
    { path: routesMap.thongTinDonHang, name: t('Thông tin đơn hàng'), component: ThongTinDonHang },
    { path: routesMap.thongTinDonHang2, name: t('Thông tin đơn hàng 2'), component: ThongTinDonHang2 },
    { path: routesMap.thongTinDonHangNew, name: t('Thông tin đơn hàng new'), component: ThongTinDonHangNew },
    { path: routesMap.tachPhieuGui, name: t('Tách phiếu gửi'), component: TachPhieuGui },
    { path: routesMap.bienBanNoiBo, name: t('Biên bản nội bộ'), component: BienBanNoiBo },
    { path: routesMap.lapBienBan, name: t('Lập biên bản'), component: LapBienBan },
    { path: routesMap.traCuuBienBan, name: t('Tra cứu biên bản'), component: TraCuuBienBan },
    { path: routesMap.suaBienBan, name: t('Sửa biên bản'), component: SuaBienBan },
    { path: routesMap.xacMinhBienBan, name: t('Xác minh biên bản'), component: XacMinhBienBan },
    { path: routesMap.khieuNaiKhachHang, name: t('Khiếu nại khách hàng'), component: KhieuNaiKhachHang },
    { path: routesMap.chiTietKhieuNai, name: t('Chi tiết khiếu nại'), component: ChiTietKhieuNai },
    { path: routesMap.baoCao, name: t('Báo cáo'), component: BaoCao },
    { path: routesMap.nhanTaiBuuCucGoc, name: t('Nhận tại bưu cục gốc'), component: NhanTaiBuuCucGoc },
  ];
};

const useRoutes = (): SIPRoutePropsType[] => {
  const { t } = useTranslation();
  return routes(t);
};

export default useRoutes;
