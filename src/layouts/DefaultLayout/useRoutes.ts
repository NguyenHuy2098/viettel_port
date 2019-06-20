import { useTranslation } from 'react-i18next';
import Loadable from 'react-loadable';
import i18next from 'i18next';
import Loading from 'components/Loading';
import routesMap from 'utils/routesMap';

import { SIPRoutePropsType } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any*/

// =============== DieuHanh =====================

const CommunicateCustomer = Loadable({
  loader: (): any => import('containers/DieuHanh/TiepXucKhachHang'),
  loading: Loading,
});
const InternalRecord = Loadable({
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
  loader: () => import('containers/DieuHanh/KhieuNaiKhachHang'),
  loading: Loading,
});
const ChiTietKhieuNai = Loadable({
  loader: () => import('containers/DieuHanh/KhieuNaiKhachHang/ChiTiet'),
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
const InputRevenue = Loadable({
  loader: (): any => import('containers/NhapPhieuGui/NhapDoanhThu'),
  loading: Loading,
});

// =============== KhaiThacDi =====================

const DongBangKe = Loadable({
  loader: (): any => import('containers/KhaiThacDi/BangKe/DongBangKe'),
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
  loader: (): any => import('containers/KhaiThacDi/DongTai/DanhSachBangKe'),
  loading: Loading,
});
const ForwardingOrderListInManifest = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DanhSachPhieGuiTrongBangKe'),
  loading: Loading,
});
const DanhSachPhieuGui = Loadable({
  loader: (): any => import('containers/KhaiThacDi/BangKe/DanhSachPhieuGui'),
  loading: Loading,
});
const CloseSack = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongTai2'),
  loading: Loading,
});
const MailTruckClosing = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongChuyenThu'),
  loading: Loading,
});
const DanhSachTaiKien = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongTai2/DanhSachTaiKien'),
  loading: Loading,
});
const SplitCoupon = Loadable({
  loader: (): any => import('containers/KhaiThacDi/TachPhieuGui'),
  loading: Loading,
});

// =============== KhaiThacDen =====================

const NhanChuyenThu = Loadable({
  loader: (): any => import('containers/KhaiThacDen/NhanChuyenThu'),
  loading: Loading,
});
const FreightOrderReceive = Loadable({
  loader: (): any => import('containers/KhaiThacDen/KhaiThacChuyenThuDen'),
  loading: Loading,
});
const ThongTinTai = Loadable({
  loader: (): any => import('containers/KhaiThacDen/NhanTaiKien/ThongTinTai'),
  loading: Loading,
});
const OperationSack = Loadable({
  loader: (): any => import('containers/KhaiThacDen/KhaiThacDen'),
  loading: Loading,
});

// =========== unsorted components ==========

const OrderInformation = Loadable({
  loader: (): any => import('containers/ThongTinDonHang'),
  loading: Loading,
});
const OrderInformationTabType = Loadable({
  loader: (): any => import('containers/ThongTinDonHang2'),
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

/* eslint-enable @typescript-eslint/no-explicit-any*/

const routes = (t: i18next.TFunction): SIPRoutePropsType[] => {
  return [
    { path: routesMap.home, exact: true, name: t('Home'), component: Home },
    { path: routesMap.PhieuGuiTrongNuoc, name: t('Phiếu gửi trong nước'), component: PhieuGuiTrongNuoc },
    {
      path: routesMap.InternationalForwardingOrder,
      name: t('Phiếu gửi quốc tế'),
      component: InternationalForwardingOrder,
    },
    { path: routesMap.DongBangKeNoiTinh, name: t('Đóng bảng kê nội tỉnh'), component: DongBangKeNoiTinh },
    { path: routesMap.DongBangKe, name: t('Đóng bảng kê'), component: DongBangKe },
    { path: routesMap.InputRevenue, name: t('Nhập doanh thu'), component: InputRevenue },
    { path: routesMap.ThongTinBangKe, name: t('Thông tin bảng kê'), component: ThongTinBangKe },
    { path: routesMap.CloseSack, name: t('Đóng tải'), component: CloseSack },
    { path: routesMap.DanhSachTaiKien, name: t('Danh sách tải kiện'), component: DanhSachTaiKien },
    { path: routesMap.MailTruckClosing, name: t('Đóng chuyển thư'), component: MailTruckClosing },
    { path: routesMap.ThongTinTai, name: t('Nhận tải kiện'), component: ThongTinTai },
    {
      path: routesMap.ForwardingOrderListInManifest,
      name: t('Danh sách phiếu gửi trong bảng kê'),
      component: ForwardingOrderListInManifest,
    },
    { path: routesMap.DanhSachBangKe, name: t('Danh sách bảng kê'), component: DanhSachBangKe },
    { path: routesMap.OperationSack, name: t('Khai thác tải'), component: OperationSack },
    { path: routesMap.DanhSachPhieuGui, name: t('Danh sách phiếu gửi'), component: DanhSachPhieuGui },
    { path: routesMap.NhanChuyenThu, name: t('Nhận chuyến thư'), component: NhanChuyenThu },
    { path: routesMap.FreightOrderReceive, name: t('Khai thác chuyển thư đến'), component: FreightOrderReceive },
    { path: routesMap.PageNoData, name: t('Chưa có dữ liệu'), component: PageNoData },
    { path: routesMap.CommunicateCustomer, name: t('Tiếp xúc khách hàng'), component: CommunicateCustomer },
    { path: routesMap.OrderInformation, name: t('Thông tin đơn hàng'), component: OrderInformation },
    { path: routesMap.OrderInformationTabType, name: t('Thông tin đơn hàng 2'), component: OrderInformationTabType },
    { path: routesMap.SplitCoupon, name: t('Tách phiếu gửi'), component: SplitCoupon },
    { path: routesMap.InternalRecord, name: t('Biên bản nội bộ'), component: InternalRecord },
    { path: routesMap.LapBienBan, name: t('Lập biên bản'), component: LapBienBan },
    { path: routesMap.TraCuuBienBan, name: t('Tra cứu biên bản'), component: TraCuuBienBan },
    { path: routesMap.SuaBienBan, name: t('Sửa biên bản'), component: SuaBienBan },
    { path: routesMap.XacMinhBienBan, name: t('Xác minh biên bản'), component: XacMinhBienBan },
    { path: routesMap.KhieuNaiKhachHang, name: t('Khiếu nại khách hàng'), component: KhieuNaiKhachHang },
    { path: routesMap.ChiTietKhieuNai, name: t('Chi tiết khiếu nại'), component: ChiTietKhieuNai },
  ];
};

const useRoutes = (): SIPRoutePropsType[] => {
  const { t } = useTranslation();
  return routes(t);
};

export default useRoutes;
