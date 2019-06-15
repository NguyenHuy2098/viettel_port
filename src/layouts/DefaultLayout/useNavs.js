import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const nav = t => {
  return {
    items: [
      {
        name: 'Nhập phiếu gửi',
        icon: 'icon-note',
        children: [
          {
            name: t('Phiếu gửi trong nước'),
            url: '/phieu-gui-trong-nuoc',
          },
          {
            name: 'Phiếu gửi quốc tế',
            url: '/international-forwarding-order',
          },
          {
            name: t('Nhập doanh thu'),
            url: '/input-revenue',
          },
        ],
      },
      {
        name: 'Khai thác đi',
        icon: 'fa fa-truck',
        children: [
          {
            name: t('Đóng bảng kê'),
            url: '/dong-bang-ke',
          },
          {
            name: t('Đóng tải'),
            url: '/close-sack',
          },
          {
            name: t('Đóng chuyển thư'),
            url: '/mail-truck-closing',
          },
          {
            name: t('Đóng bảng kê nội tỉnh'),
            url: '/dong-bang-ke-noi-tinh',
          },
        ],
      },
      {
        name: 'Khai thác đến',
        icon: 'fa fa-cubes',
        children: [
          {
            name: t('Nhận chuyến thư'),
            url: '/nhan-chuyen-thu',
          },
        ],
      },
      {
        name: t('Thông tin bảng kê'),
        url: '/thong-tin-bang-ke',
      },
      {
        name: t('Danh sách tải kiện'),
        url: '/danh-sach-tai-kien',
      },
      {
        name: t('Thông tin tải'),
        url: '/thong-tin-tai',
      },
      {
        name: t('Danh sách bảng kê'),
        url: '/danh-sach-bang-ke',
      },
      {
        name: t('Danh sách phiếu gửi trong bảng kê'),
        url: '/danh-sach-phieu-gui-trong-bang-ke',
      },
      {
        name: t('Khai thác tải'),
        url: '/operation-sack',
      },
      {
        name: t('Danh sách phiếu gửi'),
        url: '/danh-sach-phieu-gui',
      },
      {
        name: t('Khai thác chuyển thư đến'),
        url: '/freight-order-receive',
      },
      {
        name: t('Thông tin đơn hàng'),
        url: '/order-information',
      },
      {
        name: t('Tiếp xúc khách hàng'),
        url: '/tiep-xuc-khach-hang',
      },
      {
        name: t('Tách phiếu gửi'),
        url: '/tach-phieu-gui',
      },
    ],
  };
};

const useNavs = () => {
  const { t } = useTranslation();
  return nav(t);
};

export default useNavs;
