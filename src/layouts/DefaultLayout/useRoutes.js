import React from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard = React.lazy(() => import('containers/Dashboard/index'));
const DongBangKeNoiTinh = React.lazy(() => import('containers/BangKe/DongBangKeNoiTinh'));
const DongBangKe = React.lazy(() => import('containers/BangKe/DongBangKe'));
const PhieuGuiTrongNuocPa2 = React.lazy(() => import('containers/PhieuGuiTrongNuocPa2'));
const InputRevenue = React.lazy(() => import('containers/InputRevenue'));
const ThongTinBangKe = React.lazy(() => import('containers/BangKe/ThongTinBangKe'));
const CloseSack = React.lazy(() => import('containers/CloseSack'));
const DanhSachTaiKien = React.lazy(() => import('containers/CloseSack/DanhSachTaiKien'));
const MailTruckClosing = React.lazy(() => import('containers/MailTruckClosing'));
const ThongTinTai = React.lazy(() => import('containers/NhanTaiKien/ThongTinTai'));
const ForwardingOrderListInManifest = React.lazy(() => import('../../containers/ForwardingOrderListInManifest'));
const DanhSachBangKe = React.lazy(() => import('containers/DongTai/DanhSachBangKe'));
const OperationSack = React.lazy(() => import('containers/OperationSack'));
const KhaiThacDi = React.lazy(() => import('containers/OrderShippingInformation'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = t => {
  return [
    { path: '/', exact: true, name: t('Home') },
    { path: '/dashboard', name: t('Dashboard'), component: Dashboard },
    { path: '/phieu-gui-trong-nuoc-pa2', name: t('PhieuGuiTrongNuocPa2'), component: PhieuGuiTrongNuocPa2 },
    { path: '/dong-bang-ke-noi-tinh', name: t('Đóng bảng kê nội tỉnh'), component: DongBangKeNoiTinh },
    { path: '/dong-bang-ke', name: t('Đóng bảng kê'), component: DongBangKe },
    { path: '/input-revenue', name: t('InputRevenue'), component: InputRevenue },
    { path: '/thong-tin-bang-ke', name: t('Đóng bảng kê nội tỉnh'), component: ThongTinBangKe },
    { path: '/close-sack', name: t('CloseSack'), component: CloseSack },
    { path: '/danh-sach-tai-kien', name: t('Danh sách tải kiện'), component: DanhSachTaiKien },
    { path: '/mail-truck-closing', name: t('Đóng chuyển thư'), component: MailTruckClosing },
    { path: '/thong-tin-tai', name: t('ThongTinTai'), component: ThongTinTai },
    {
      path: '/danh-sach-phieu-gui-trong-bang-ke',
      name: t('Forwarding order list in Manifest'),
      component: ForwardingOrderListInManifest,
    },
    { path: '/danh-sach-bang-ke', name: t('DanhSachBangKe'), component: DanhSachBangKe },
    { path: '/operation-sack', name: 'Khai thác tải', component: OperationSack },
    { path: '/khai-thac-di', name: 'Khai thác đi', component: KhaiThacDi },
  ];
};

const useRoutes = () => {
  const { t } = useTranslation();
  return routes(t);
};

export default useRoutes;
