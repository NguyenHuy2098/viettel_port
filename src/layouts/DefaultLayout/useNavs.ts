import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import routesMap from "../../utils/routesMap";

/* eslint-disable @typescript-eslint/no-explicit-any*/

// eslint-disable-next-line max-lines-per-function
const nav = (t: i18next.TFunction): any => {
  return {
    items: [
      {
        name: 'Điều hành',
        icon: 'fa fa-user-circle-o',
        children: [
          {
            name: t('Tiếp xúc khách hàng'),
            url: routesMap.CommunicateCustomer,
          },
          {
            name: t('Biên bản nội bộ'),
            url: 'routesMap.InternalRecord',
          },
          {
            name: t('Sửa biên bản'),
            url: routesMap.SuaBienBan,
          },
          {
            name: t('Xác minh biên bản'),
            url: routesMap.XacMinhBienBan,
          },
          {
            name: t('Khiếu nại khách hàng'),
            url: routesMap.KhieuNaiKhachHang,
          },
          {
            name: t('Chi tiết khiếu nại'),
            url: routesMap.ChiTietKhieuNai,
          },
        ],
      },
      {
        name: 'Nhập phiếu gửi',
        icon: 'icon-note',
        children: [
          {
            name: t('Phiếu gửi trong nước'),
            url: routesMap.PhieuGuiTrongNuoc,
          },
          {
            name: 'Phiếu gửi quốc tế',
            url: routesMap.InternationalForwardingOrder,
          },
          {
            name: t('Nhập doanh thu'),
            url: routesMap.InputRevenue,
          },
        ],
      },
      {
        name: 'Khai thác đi',
        icon: 'fa fa-truck',
        children: [
          {
            name: t('Đóng bảng kê'),
            url: routesMap.DongBangKe,
          },
          {
            name: t('Đóng bảng kê nội tỉnh'),
            url: routesMap.DongBangKeNoiTinh,
          },
          {
            name: t('Thông tin bảng kê'),
            url: routesMap.ThongTinBangKe,
          },
          {
            name: t('Danh sách bảng kê'),
            url: routesMap.DanhSachBangKe,
          },
          {
            name: t('Danh sách phiếu gửi trong bảng kê'),
            url: routesMap.ForwardingOrderListInManifest,
          },
          {
            name: t('Danh sách phiếu gửi'),
            url: routesMap.DanhSachPhieuGui,
          },
          {
            name: t('Đóng tải'),
            url: routesMap.CloseSack,
          },
          {
            name: t('Đóng chuyển thư'),
            url: routesMap.MailTruckClosing,
          },
          {
            name: t('Danh sách tải kiện'),
            url: routesMap.DanhSachTaiKien,
          },
          {
            name: t('Tách phiếu gửi'),
            url: routesMap.SplitCoupon,
          },
        ],
      },
      {
        name: 'Khai thác đến',
        icon: 'fa fa-cubes',
        children: [
          {
            name: t('Nhận chuyến thư'),
            url: routesMap.NhanChuyenThu,
          },
          {
            name: t('Khai thác chuyển thư đến'),
            url: routesMap.FreightOrderReceive,
          },
          {
            name: t('Nhận tải kiện'),
            url: routesMap.ThongTinTai,
          },
          {
            name: t('Khai thác tải'),
            url: routesMap.OperationSack,
          },
        ],
      },
      {
        name: t('Thông tin đơn hàng'),
        url: routesMap.OrderInformation,
        icon: 'icon-info',
      },
      {
        name: t('Thông tin đơn hàng 2'),
        url: routesMap.OrderInformationTabType,
        icon: 'icon-info',
      },
    ],
  };
};

const useNavs = (): any => {
  const { t } = useTranslation();
  return nav(t);
};

/* eslint-enable @typescript-eslint/no-explicit-any*/

export default useNavs;
