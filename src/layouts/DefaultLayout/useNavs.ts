import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function,@typescript-eslint/no-explicit-any
const nav = (t: i18next.TFunction): any => {
  return {
    items: [
      {
        name: t('Trang chủ'),
        icon: 'fa fa-home',
        url: routesMap.HOME,
      },
      {
        name: t('Điều hành'),
        icon: 'fa fa-user-circle-o',
        url: routesMap.DIEU_HANH,
        children: [
          {
            name: t('Biên bản nội bộ'),
            url: routesMap.BIEN_BAN_NOI_BO,
          },
          {
            name: t('Sửa biên bản'),
            url: routesMap.SUA_BIEN_BAN,
          },
          {
            name: t('Xác minh biên bản'),
            url: routesMap.XAC_MINH_BIEN_BAN,
          },
          {
            name: t('Khiếu nại khách hàng'),
            url: routesMap.KHIEU_NAI_KHACH_HANG,
          },
          {
            name: t('Chi tiết khiếu nại'),
            url: routesMap.CHI_TIET_KHIEU_NAI,
          },
          {
            name: t('Lập biên bản'),
            url: routesMap.LAP_BIEN_BAN,
          },
          {
            name: t('Tra cứu biên bản'),
            url: routesMap.TRA_CUU_BIEN_BAN,
          },
        ],
      },
      {
        name: t('Nhận tại bưu cục gốc '),
        icon: 'icon-note',
        url: routesMap.NHAP_PHIEU_GUI,
        children: [
          {
            name: t('Phiếu gửi trong nước'),
            url: routesMap.NHAP_PHIEU_GUI_TRONG_NUOC,
          },
          {
            name: 'Phiếu gửi quốc tế',
            url: routesMap.NHAP_PHIEU_GUI_QUOC_TE,
          },
          {
            name: t('Nhập từ file excel '),
            url: routesMap.NHAP_TU_FILE_EXCEL,
          },
          {
            name: t('Quét mã phiếu gửi'),
            url: routesMap.NHAN_TAI_BUU_CUC_GOC,
          },
        ],
      },
      {
        name: t('Khai thác đi'),
        icon: 'fa fa-truck',
        url: routesMap.KHAI_THAC_DI,
        children: [
          {
            name: t('Đóng bảng kê'),
            url: routesMap.DONG_BANG_KE,
          },
          {
            name: t('Đóng bảng kê nội tỉnh'),
            url: routesMap.DONG_BANG_KE_NOI_TINH,
          },
          {
            name: t('Thông tin bảng kê'),
            url: routesMap.THONG_TIN_BANG_KE,
          },
          {
            name: t('Danh sách bảng kê'),
            url: routesMap.DANH_SACH_BANG_KE,
          },
          {
            name: t('Danh sách phiếu gửi'),
            url: routesMap.DANH_SACH_PHIEU_GUI,
          },
          {
            name: t('Đóng tải'),
            url: routesMap.DONG_TAI,
          },
          {
            name: t('Đóng chuyến thư'),
            url: routesMap.DONG_CHUYEN_THU,
          },
          {
            name: t('Danh sách tải kiện'),
            url: routesMap.DANH_SACH_TAI_KIEN,
          },
          {
            name: t('Tách phiếu gửi'),
            url: routesMap.TACH_PHIEU_GUI,
          },
        ],
      },
      {
        name: t('Khai thác đến'),
        icon: 'fa fa-cubes',
        url: routesMap.KHAI_THAC_DEN,
        children: [
          {
            name: t('Nhận chuyến thư'),
            url: routesMap.NHAN_CHUYEN_THU,
          },
          {
            name: t('Nhận tải kiện'),
            url: routesMap.NHAN_TAI_KIEN,
          },
          {
            name: t('Khai thác chuyển thư đến'),
            url: routesMap.KHAI_THAC_CHUYEN_THU_DEN,
          },
          {
            name: t('Khai thác tải'),
            url: routesMap.KHAI_THAC_TAI,
          },
          {
            name: t('Nhận bảng kê / Phiếu gửi'),
            url: routesMap.NHAN_BANG_KE_PHIEU_GUI,
          },
        ],
      },
      {
        name: t('Báo cáo'),
        icon: 'fa fa-sticky-note-o',
        url: routesMap.BAO_CAO,
        children: [
          {
            name: t('Báo cáo (chưa có gì)'),
            url: routesMap.BAO_CAO_1,
          },
        ],
      },
      {
        name: t('Khách hàng'),
        icon: 'fa fa-handshake-o',
        url: routesMap.KHACH_HANG,
        children: [
          {
            name: t('Tiếp xúc khách hàng'),
            url: routesMap.TIEP_XUC_KHACH_HANG,
          },
        ],
      },
      {
        name: t('Thông tin kiện hàng'),
        icon: 'icon-info',
        url: routesMap.THONG_TIN_KIEN_HANG,
      },
      {
        name: t('Thông tin đơn hàng new'),
        icon: 'icon-info',
        url: routesMap.THONG_TIN_DON_HANG_NEW,
      },
    ],
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useNavs = (): any => {
  const { t } = useTranslation();
  return nav(t);
};

export default useNavs;
