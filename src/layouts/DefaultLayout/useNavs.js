import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const nav = t => {
  return {
    items: [
      {
        name: t('Dashboard'),
        url: '/dashboard',
        icon: 'icon-pencil',
      },
      {
        name: t('Phiếu gửi trong nước PA2'),
        url: '/phieu-gui-trong-nuoc-pa2',
        icon: '',
      },
      {
        name: t('Đóng bảng kê nội tỉnh'),
        url: '/dong-bang-ke-noi-tinh',
        icon: 'icon-drop',
      },
      {
        name: t('Đóng bảng kê'),
        url: '/dong-bang-ke',
        icon: 'icon-drop',
      },
      {
        name: t('Nhập doanh thu'),
        url: '/input-revenue',
        icon: 'icon-drop',
      },
      {
        name: t('Thông tin bảng kê'),
        url: '/thong-tin-bang-ke',
        icon: 'icon-drop',
      },
      {
        name: t('Đóng tải'),
        url: '/close-sack',
        icon: 'icon-drop',
      },
      {
        name: t('Danh sách tải kiện'),
        url: '/danh-sach-tai-kien',
        icon: 'icon-drop',
      },
      {
        name: t('Thông tin tải'),
        url: '/thong-tin-tai',
        icon: 'icon-drop',
      },
      {
        name: t('Đóng chuyển thư'),
        url: '/mail-truck-closing',
        icon: 'icon-drop',
      },
      {
        name: t('Danh sách bảng kê'),
        url: '/danh-sach-bang-ke',
        icon: 'icon-drop',
      },
      {
        name: t('Danh sách phiếu gửi trong bảng kê'),
        url: '/danh-sach-phieu-gui-trong-bang-ke',
        icon: 'icon-drop',
      },
      {
        name: t('Khai thác tải'),
        url: '/operation-sack',
        icon: 'icon-drop',
      },
      {
        name: t('Danh sách phiếu gửi'),
        url: '/danh-sach-phieu-gui',
        icon: 'icon-drop',
      },
      {
        name: t('Nhận chuyến thư'),
        url: '/nhan-chuyen-thu',
        icon: 'icon-drop',
      },
      {
        name: t('Khai thác chuyển thư đến'),
        url: '/freight-order-receive',
        icon: 'icon-drop',
      },
      {
        name: t('Thông tin đơn hàng'),
        url: '/order-information',
        icon: 'icon-drop',
      },
      {
        name: t('Tiếp xúc khách hàng'),
        url: '/tiep-xuc-khach-hang',
        icon: 'icon-drop',
      },
    ],
  };
};

const useNavs = () => {
  const { t } = useTranslation();
  return nav(t);
};

export default useNavs;
