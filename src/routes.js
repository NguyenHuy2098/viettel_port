import React from 'react';

const Dashboard = React.lazy(() => import('containers/Dashboard/Dashboard'));
const About = React.lazy(() => import('containers/About/About'));
const DongBangKeNoiTinh = React.lazy(() => import('containers/Manifest/DongBangKeNoiTinh'));
const PhieuGuiTrongNuocPa2 = React.lazy(() => import('./containers/PhieuGuiTrongNuocPa2/Index'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/about', name: 'About', component: About },
  { path: '/phieu-gui-trong-nuoc-pa2', name: 'PhieuGuiTrongNuocPa2', component: PhieuGuiTrongNuocPa2 },
  { path: '/dong-bang-ke-noi-tinh', name: 'Đóng bảng kê nội tỉnh', component: DongBangKeNoiTinh },
];

export default routes;
