import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import routesMap from '../../utils/routesMap';

/* eslint-disable @typescript-eslint/no-explicit-any*/

// eslint-disable-next-line max-lines-per-function
const nav = (t: i18next.TFunction): any => {
  return {
    items: [
      {
        name: 'Trang chủ',
        icon: 'fa fa-home',
      },
      {
        name: 'Điều hành',
        icon: 'fa fa-user-circle-o',
        children: [
          {
            name: t('Biên bản nội bộ'),
            url: routesMap.internalRecord,
          },
          {
            name: t('Sửa biên bản'),
            url: routesMap.suaBienBan,
          },
          {
            name: t('Xác minh biên bản'),
            url: routesMap.xacMinhBienBan,
          },
          {
            name: t('Khiếu nại khách hàng'),
            url: routesMap.khieuNaiKhachHang,
          },
          {
            name: t('Chi tiết khiếu nại'),
            url: routesMap.chiTietKhieuNai,
          },
          {
            name: t('Lập biên bản'),
            url: '/lap-bien-ban',
          },
          {
            name: t('Tra cứu biên bản'),
            url: '/tra-cuu-bien-ban',
          },
        ],
      },
      {
        name: 'Nhập phiếu gửi',
        icon: 'icon-note',
        children: [
          {
            name: t('Phiếu gửi trong nước'),
            url: routesMap.phieuGuiTrongNuoc,
          },
          {
            name: 'Phiếu gửi quốc tế',
            url: routesMap.internationalForwardingOrder,
          },
          {
            name: t('Nhập doanh thu'),
            url: routesMap.inputRevenue,
          },
          {
            name: t('Nhận tại bưu cục gốc'),
            url: routesMap.nhanTaiBuuCucGoc,
          },
        ],
      },
      {
        name: 'Khai thác đi',
        icon: 'fa fa-truck',
        children: [
          {
            name: t('Đóng bảng kê'),
            url: routesMap.dongBangKe,
          },
          {
            name: t('Đóng bảng kê nội tỉnh'),
            url: routesMap.dongBangKeNoiTinh,
          },
          {
            name: t('Thông tin bảng kê'),
            url: routesMap.thongTinBangKe,
          },
          {
            name: t('Danh sách bảng kê'),
            url: routesMap.danhSachBangKe,
          },
          {
            name: t('Danh sách phiếu gửi'),
            url: routesMap.danhSachPhieuGui,
          },
          {
            name: t('Đóng tải'),
            url: routesMap.closeSack,
          },
          {
            name: t('Đóng chuyển thư'),
            url: routesMap.mailTruckClosing,
          },
          {
            name: t('Danh sách tải kiện'),
            url: routesMap.danhSachTaiKien,
          },
          {
            name: t('Tách phiếu gửi'),
            url: routesMap.splitCoupon,
          },
        ],
      },
      {
        name: 'Khai thác đến',
        icon: 'fa fa-cubes',
        children: [
          {
            name: t('Nhận chuyến thư'),
            url: routesMap.nhanChuyenThu,
          },
          {
            name: t('Khai thác chuyển thư đến'),
            url: routesMap.freightOrderReceive,
          },
          {
            name: t('Nhận tải kiện'),
            url: routesMap.thongTinTai,
          },
          {
            name: t('Khai thác tải'),
            url: routesMap.operationSack,
          },
        ],
      },
      {
        name: 'Báo cáo',
        icon: 'fa fa-sticky-note-o',
        children: [
          {
            name: t('Báo cáo (chưa có gì)'),
            url: '/bao-cao',
          },
        ],
      },
      {
        name: 'Khách hàng',
        icon: 'fa fa-handshake-o',
        children: [
          {
            name: t('Tiếp xúc khách hàng'),
            url: routesMap.communicateCustomer,
          },
        ],
      },
      {
        name: t('Thông tin đơn hàng'),
        url: routesMap.orderInformation,
        icon: 'icon-info',
      },
      {
        name: t('Thông tin đơn hàng 2'),
        url: routesMap.orderInformationTabType,
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
