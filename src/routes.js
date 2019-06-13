import React from 'react';

const Dashboard = React.lazy(() => import('containers/Dashboard/index'));
const About = React.lazy(() => import('containers/About/index'));
const DongBangKeNoiTinh = React.lazy(() => import('containers/BangKe/DongBangKeNoiTinh'));
const PhieuGuiTrongNuocPa2 = React.lazy(() => import('containers/PhieuGuiTrongNuocPa2/Index'));
const InputRevenue = React.lazy(() => import('containers/InputRevenue'));
const ThongTinBangKe = React.lazy(() => import('containers/BangKe/ThongTinBangKe'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/about', name: 'About', component: About },
  { path: '/phieu-gui-trong-nuoc-pa2', name: 'PhieuGuiTrongNuocPa2', component: PhieuGuiTrongNuocPa2 },
  { path: '/dong-bang-ke-noi-tinh', name: 'Đóng bảng kê nội tỉnh', component: DongBangKeNoiTinh },
  { path: '/input-revenue', name: 'InputRevenue', component: InputRevenue },
  { path: '/thong-tin-bang-ke', name: 'Đóng bảng kê nội tỉnh', component: ThongTinBangKe },
];

export default routes;
