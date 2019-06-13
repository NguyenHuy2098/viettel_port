import React from 'react';

const Dashboard = React.lazy(() => import('containers/Dashboard/index'));
const About = React.lazy(() => import('containers/About/index'));
const DongBangKeNoiTinh = React.lazy(() => import('containers/BangKe/DongBangKeNoiTinh'));
const DongBangKe = React.lazy(() => import('containers/BangKe/DongBangKe'));
const PhieuGuiTrongNuocPa2 = React.lazy(() => import('containers/PhieuGuiTrongNuocPa2'));
const InputRevenue = React.lazy(() => import('containers/InputRevenue'));
const ThongTinBangKe = React.lazy(() => import('containers/BangKe/ThongTinBangKe'));
const CloseSack = React.lazy(() => import('containers/CloseSack'));
const DanhSachTaiKien = React.lazy(() => import('containers/CloseSack/DanhSachTaiKien'));
const MailTruckClosing = React.lazy(() => import('containers/MailTruckClosing'));
const ThongTinTai = React.lazy(() => import('containers/NhanTaiKien/ThongTinTai'));
const ForwardingOrderListInManifest = React.lazy(() => import('./containers/ForwardingOrderListInManifest'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/about', name: 'About', component: About },
  { path: '/phieu-gui-trong-nuoc-pa2', name: 'PhieuGuiTrongNuocPa2', component: PhieuGuiTrongNuocPa2 },
  { path: '/dong-bang-ke-noi-tinh', name: 'Đóng bảng kê nội tỉnh', component: DongBangKeNoiTinh },
  { path: '/dong-bang-ke', name: 'Đóng bảng kê', component: DongBangKe },
  { path: '/input-revenue', name: 'InputRevenue', component: InputRevenue },
  { path: '/thong-tin-bang-ke', name: 'Đóng bảng kê nội tỉnh', component: ThongTinBangKe },
  { path: '/close-sack', name: 'CloseSack', component: CloseSack },
  { path: '/danh-sach-tai-kien', name: 'Danh sách tải kiện', component: DanhSachTaiKien },
  { path: '/mail-truck-closing', name: 'Đóng chuyển thư', component: MailTruckClosing },
  { path: '/thong-tin-tai', name: 'ThongTinTai', component: ThongTinTai },
  {
    path: '/danh-sach-phieu-gui-trong-bang-ke',
    name: 'Forwarding order list in Manifest',
    component: ForwardingOrderListInManifest,
  },
];

export default routes;
