import { useTranslation } from 'react-i18next';
import Loadable from 'react-loadable';
import i18next from 'i18next';
import Loading from 'components/Loading';
import routesMap from 'utils/routesMap';

import { SIPRoutePropsType } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any*/

// =============== DieuHanh =====================

const communicateCustomer = Loadable({
  loader: (): any => import('containers/DieuHanh/TiepXucKhachHang'),
  loading: Loading,
});
const internalRecord = Loadable({
  loader: (): any => import('containers/DieuHanh/BienBanNoiBo'),
  loading: Loading,
});
const lapBienBan = Loadable({
  loader: (): any => import('containers/DieuHanh/BienBanNoiBo/LapBienBan'),
  loading: Loading,
});
const traCuuBienBan = Loadable({
  loader: (): any => import('containers/DieuHanh/BienBanNoiBo/TraCuuBienBan'),
  loading: Loading,
});
const suaBienBan = Loadable({
  loader: (): any => import('containers/DieuHanh/BienBanNoiBo/SuaBienBan'),
  loading: Loading,
});
const xacMinhBienBan = Loadable({
  loader: (): any => import('containers/DieuHanh/BienBanNoiBo/XacMinhBienBan'),
  loading: Loading,
});
const khieuNaiKhachHang = Loadable({
  loader: (): any => import('containers/DieuHanh/KhieuNaiKhachHang'),
  loading: Loading,
});
const chiTietKhieuNai = Loadable({
  loader: (): any => import('containers/DieuHanh/KhieuNaiKhachHang/ChiTiet'),
  loading: Loading,
});
const BaoCao = Loadable({
  loader: (): any => import('containers/BaoCao'),
  loading: Loading,
});

// =============== NhapPhieuGui =====================

const phieuGuiTrongNuoc = Loadable({
  loader: (): any => import('containers/NhapPhieuGui/PhieuGuiTrongNuoc'),
  loading: Loading,
});
const internationalForwardingOrder = Loadable({
  loader: (): any => import('containers/NhapPhieuGui/PhieuGuiQuocTe'),
  loading: Loading,
});
const inputRevenue = Loadable({
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
const dongBangKeNoiTinh = Loadable({
  loader: (): any => import('containers/KhaiThacDi/BangKe/DongBangKeNoiTinh'),
  loading: Loading,
});
const thongTinBangKe = Loadable({
  loader: (): any => import('containers/KhaiThacDi/BangKe/ThongTinBangKe'),
  loading: Loading,
});
const danhSachBangKe = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DanhSachBangKe/DanhSachBangKe'),
  loading: Loading,
});
const danhSachPhieuGuiTrongBangKe = Loadable({
  loader: (): any => import('containers/NhapPhieuGui/NhanTaiBuuCucGoc/DanhSachPhieuGuiTrongBangKe'),
  loading: Loading,
});
const danhSachPhieuGui = Loadable({
  loader: (): any => import('containers/KhaiThacDi/BangKe/DanhSachPhieuGui'),
  loading: Loading,
});
const dongTai = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongTai'),
  loading: Loading,
});
const dongChuyenThu = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DongChuyenThu'),
  loading: Loading,
});
const danhSachTaiKien = Loadable({
  loader: (): any => import('containers/KhaiThacDi/DanhSachTaiKien'),
  loading: Loading,
});
const splitCoupon = Loadable({
  loader: (): any => import('containers/KhaiThacDi/TachPhieuGui'),
  loading: Loading,
});

// =============== KhaiThacDen =====================

const nhanChuyenThu = Loadable({
  loader: (): any => import('containers/KhaiThacDen/NhanChuyenThu'),
  loading: Loading,
});
const freightOrderReceive = Loadable({
  loader: (): any => import('containers/KhaiThacDen/KhaiThacChuyenThuDen'),
  loading: Loading,
});
const thongTinTai = Loadable({
  loader: (): any => import('containers/KhaiThacDen/NhanTaiKien/ThongTinTai'),
  loading: Loading,
});
const operationSack = Loadable({
  loader: (): any => import('containers/KhaiThacDen/KhaiThacDen'),
  loading: Loading,
});
const nhanBangKePhieuGui = Loadable({
  loader: (): any => import('containers/KhaiThacDen/NhanBangKePhieuGui/NhanBangKePhieuGui'),
  loading: Loading,
});

// =========== unsorted components ==========

const orderInformation = Loadable({
  loader: (): any => import('containers/ThongTinDonHang'),
  loading: Loading,
});
const orderInformationTabType = Loadable({
  loader: (): any => import('containers/ThongTinDonHang2'),
  loading: Loading,
});
const orderInformationNew = Loadable({
  loader: (): any => import('containers/ThongTinDonHangNew'),
  loading: Loading,
});
const pageNoData = Loadable({
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
    { path: routesMap.phieuGuiTrongNuoc, name: t('Phiếu gửi trong nước'), component: phieuGuiTrongNuoc },
    {
      path: routesMap.internationalForwardingOrder,
      name: t('Phiếu gửi quốc tế'),
      component: internationalForwardingOrder,
    },
    { path: routesMap.dongBangKeNoiTinh, name: t('Đóng bảng kê nội tỉnh'), component: dongBangKeNoiTinh },
    { path: routesMap.dongBangKe, name: t('Đóng bảng kê'), component: DongBangKe },
    { path: routesMap.inputRevenue, name: t('Nhập doanh thu'), component: inputRevenue },
    { path: routesMap.thongTinBangKe, name: t('Thông tin bảng kê'), component: thongTinBangKe },
    { path: routesMap.dongTai, name: t('Đóng tải'), component: dongTai },
    { path: routesMap.danhSachTaiKien, name: t('Danh sách tải kiện'), component: danhSachTaiKien },
    { path: routesMap.dongChuyenThu, name: t('Đóng chuyến thư'), component: dongChuyenThu },
    { path: routesMap.thongTinTai + '/:idChuyenThu', name: t('Nhận tải kiện'), component: thongTinTai },
    {
      path: routesMap.nhanBangKePhieuGui + '/:idTaiKien',
      name: t('Nhận bảng kê phiếu gưi'),
      component: nhanBangKePhieuGui,
    },
    {
      path: `${routesMap.danhSachPhieuGuiTrongBangKe}/:manifestId`,
      name: t('Danh sách phiếu gửi trong bảng kê'),
      component: danhSachPhieuGuiTrongBangKe,
    },
    { path: routesMap.danhSachBangKe, name: t('Danh sách bảng kê'), component: danhSachBangKe },
    { path: routesMap.operationSack, name: t('Khai thác tải'), component: operationSack },
    { path: routesMap.danhSachPhieuGui, name: t('Danh sách phiếu gửi'), component: danhSachPhieuGui },
    { path: routesMap.nhanChuyenThu, name: t('Nhận chuyến thư'), component: nhanChuyenThu },
    { path: routesMap.freightOrderReceive, name: t('Khai thác chuyển thư đến'), component: freightOrderReceive },
    { path: routesMap.pageNoData, name: t('Chưa có dữ liệu'), component: pageNoData },
    { path: routesMap.communicateCustomer, name: t('Tiếp xúc khách hàng'), component: communicateCustomer },
    { path: routesMap.orderInformation, name: t('Thông tin đơn hàng'), component: orderInformation },
    { path: routesMap.orderInformationNew, name: t('Thông tin đơn hàng new'), component: orderInformationNew },
    { path: routesMap.orderInformationTabType, name: t('Thông tin đơn hàng 2'), component: orderInformationTabType },
    { path: routesMap.splitCoupon, name: t('Tách phiếu gửi'), component: splitCoupon },
    { path: routesMap.internalRecord, name: t('Biên bản nội bộ'), component: internalRecord },
    { path: routesMap.lapBienBan, name: t('Lập biên bản'), component: lapBienBan },
    { path: routesMap.traCuuBienBan, name: t('Tra cứu biên bản'), component: traCuuBienBan },
    { path: routesMap.suaBienBan, name: t('Sửa biên bản'), component: suaBienBan },
    { path: routesMap.xacMinhBienBan, name: t('Xác minh biên bản'), component: xacMinhBienBan },
    { path: routesMap.khieuNaiKhachHang, name: t('Khiếu nại khách hàng'), component: khieuNaiKhachHang },
    { path: routesMap.chiTietKhieuNai, name: t('Chi tiết khiếu nại'), component: chiTietKhieuNai },
    { path: '/bao-cao', name: t('Báo cáo'), component: BaoCao },
    { path: routesMap.nhanTaiBuuCucGoc, name: t('Nhận tại bưu cục gốc'), component: NhanTaiBuuCucGoc },
  ];
};

const useRoutes = (): SIPRoutePropsType[] => {
  const { t } = useTranslation();
  return routes(t);
};

export default useRoutes;
