import React from 'react';

const Dashboard = React.lazy(() => import('containers/Dashboard'));
const About = React.lazy(() => import('containers/About'));
const DongBangKeNoiTinh = React.lazy(() => import('containers/Manifest'));
const PhieuGuiTrongNuocPa2 = React.lazy(() => import('containers/PhieuGuiTrongNuocPa2'));
const InputRevenue = React.lazy(() => import('containers/InputRevenue'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/about', name: 'About', component: About },
  { path: '/phieu-gui-trong-nuoc-pa2', name: 'PhieuGuiTrongNuocPa2', component: PhieuGuiTrongNuocPa2 },
  { path: '/dong-bang-ke-noi-tinh', name: 'Đóng bảng kê nội tỉnh', component: DongBangKeNoiTinh },
  { path: '/input-revenue', name: 'InputRevenue', component: InputRevenue },
];

export default routes;
