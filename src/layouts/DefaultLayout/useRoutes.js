import { useTranslation } from 'react-i18next';
import Loading from 'components/Loading';
import Loadable from 'react-loadable';

const DanhSachPhieuGui = Loadable({
  loader: () => import('containers/BangKe/DanhSachPhieuGui'),
  loading: Loading,
});
const NhanChuyenThu = Loadable({
  loader: () => import('containers/ShippingInformation'),
  loading: Loading,
});
const InternationalForwardingOrder = Loadable({
  loader: () => import('containers/InternationalForwardingOrder'),
  loading: Loading,
});
const CommunicateCustomer = Loadable({
  loader: () => import('containers/CommunicateCustomer'),
  loading: Loading,
});
const OrderInformation = Loadable({
  loader: () => import('containers/OrderInformation'),
  loading: Loading,
});
const OrderInformationTabType = Loadable({
  loader: () => import('containers/OrderInformationTabType'),
  loading: Loading,
});
const DongBangKeNoiTinh = Loadable({
  loader: () => import('containers/BangKe/DongBangKeNoiTinh'),
  loading: Loading,
});
const DongBangKe = Loadable({
  loader: () => import('containers/BangKe/DongBangKe'),
  loading: Loading,
});
const PhieuGuiTrongNuoc = Loadable({
  loader: () => import('containers/PhieuGuiTrongNuoc'),
  loading: Loading,
});
const InputRevenue = Loadable({
  loader: () => import('containers/InputRevenue'),
  loading: Loading,
});
const ThongTinBangKe = Loadable({
  loader: () => import('containers/BangKe/ThongTinBangKe'),
  loading: Loading,
});
const CloseSack = Loadable({
  loader: () => import('containers/CloseSack'),
  loading: Loading,
});
const DanhSachTaiKien = Loadable({
  loader: () => import('containers/CloseSack/DanhSachTaiKien'),
  loading: Loading,
});
const MailTruckClosing = Loadable({
  loader: () => import('containers/MailTruckClosing'),
  loading: Loading,
});
const ThongTinTai = Loadable({
  loader: () => import('containers/NhanTaiKien/ThongTinTai'),
  loading: Loading,
});
const ForwardingOrderListInManifest = Loadable({
  loader: () => import('containers/ForwardingOrderListInManifest'),
  loading: Loading,
});
const DanhSachBangKe = Loadable({
  loader: () => import('containers/DongTai/DanhSachBangKe'),
  loading: Loading,
});
const OperationSack = Loadable({
  loader: () => import('containers/OperationSack'),
  loading: Loading,
});
const FreightOrderReceive = Loadable({
  loader: () => import('containers/FreightOrderReceive'),
  loading: Loading,
});
const PageNoData = Loadable({
  loader: () => import('containers/PageNoData'),
  loading: Loading,
});
const SplitCoupon = Loadable({
  loader: () => import('containers/SplitCoupon'),
  loading: Loading,
});
const InternalRecord = Loadable({
  loader: () => import('containers/Operating/InternalRecord'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = t => {
  return [
    { path: '/', exact: true, name: t('Home') },
    { path: '/phieu-gui-trong-nuoc', name: t('PhieuGuiTrongNuoc'), component: PhieuGuiTrongNuoc },
    {
      path: '/international-forwarding-order',
      name: t('InternationalForwardingOrder'),
      component: InternationalForwardingOrder,
    },
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
    { path: '/operation-sack', name: t('Khai thác tải'), component: OperationSack },
    { path: '/danh-sach-phieu-gui', name: t('Danh sách phiếu gửi'), component: DanhSachPhieuGui },
    { path: '/nhan-chuyen-thu', name: t('Nhận chuyến thư'), component: NhanChuyenThu },
    { path: '/freight-order-receive', name: t('Khai thác chuyển thư đến'), component: FreightOrderReceive },
    { path: '/no-data', name: t('Chưa có dữ liệu'), component: PageNoData },
    { path: '/tiep-xuc-khach-hang', name: t('Tiếp xúc khách hàng'), component: CommunicateCustomer },
    { path: '/order-information', name: t('Thông tin đơn hàng'), component: OrderInformation },
    { path: '/order-information-2', name: t('Thông tin đơn hàng 2'), component: OrderInformationTabType },
    { path: '/tach-phieu-gui', name: t('Tách phiếu gửi'), component: SplitCoupon },
    { path: '/bien-ban-noi-bo', name: t('Biên bản nội bộ'), component: InternalRecord },
  ];
};

const useRoutes = () => {
  const { t } = useTranslation();
  return routes(t);
};

export default useRoutes;
