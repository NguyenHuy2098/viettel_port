import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

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
            url: '/tiep-xuc-khach-hang',
          },
          {
            name: t('Biên bản nội bộ'),
            url: '/bien-ban-noi-bo',
          },
          {
            name: t('Sủa biên bản'),
            url: '/sua-bien-ban',
          },
          {
            name: t('Xác minh biên bản'),
            url: '/xac-minh-bien-ban',
          },
          {
            name: t('Khiếu nại khách hàng'),
            url: '/khieu-nai-khach-hang',
          },
          {
            name: t('Chi tiết khiếu nại'),
            url: '/chi-tiet-khieu-nai',
          },
        ],
      },
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
            url: '/phieu-gui-quoc-te',
          },
          {
            name: t('Nhập doanh thu'),
            url: '/nhap-doanh-thu',
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
            name: t('Đóng bảng kê nội tỉnh'),
            url: '/dong-bang-ke-noi-tinh',
          },
          {
            name: t('Thông tin bảng kê'),
            url: '/thong-tin-bang-ke',
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
            name: t('Danh sách phiếu gửi'),
            url: '/danh-sach-phieu-gui',
          },
          {
            name: t('Đóng tải'),
            url: '/dong-tai',
          },
          {
            name: t('Đóng chuyển thư'),
            url: '/dong-chuyen-thu',
          },
          {
            name: t('Danh sách tải kiện'),
            url: '/danh-sach-tai-kien',
          },
          {
            name: t('Tách phiếu gửi'),
            url: '/tach-phieu-gui',
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
          {
            name: t('Khai thác chuyển thư đến'),
            url: '/khai-thac-chuyen-thu-den',
          },
          {
            name: t('Nhận tải kiện'),
            url: '/nhan-tai-kien',
          },
          {
            name: t('Khai thác tải'),
            url: '/khai-thac-tai',
          },
        ],
      },
      {
        name: t('Thông tin đơn hàng'),
        url: '/thong-tin-don-hang',
        icon: 'icon-info',
      },
      {
        name: t('Thông tin đơn hàng 2'),
        url: '/thong-tin-don-hang-2',
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
