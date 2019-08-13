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
        url: routesMap.home,
      },
      {
        name: t('Điều hành'),
        icon: 'fa fa-user-circle-o',
        children: [
          {
            name: t('Biên bản nội bộ'),
            url: routesMap.bienBanNoiBo,
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
            url: routesMap.lapBienBan,
          },
          {
            name: t('Tra cứu biên bản'),
            url: routesMap.traCuuBienBan,
          },
        ],
      },
      {
        name: t('Nhập phiếu gửi'),
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
            url: routesMap.nhapDoanhThu,
          },
          {
            name: t('Nhận tại bưu cục gốc'),
            url: routesMap.nhanTaiBuuCucGoc,
          },
        ],
      },
      {
        name: t('Khai thác đi'),
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
            url: routesMap.dongTai,
          },
          {
            name: t('Đóng chuyến thư'),
            url: routesMap.dongChuyenThu,
          },
          {
            name: t('Danh sách tải kiện'),
            url: routesMap.danhSachTaiKien,
          },
          {
            name: t('Tách phiếu gửi'),
            url: routesMap.tachPhieuGui,
          },
        ],
      },
      {
        name: t('Khai thác đến'),
        icon: 'fa fa-cubes',
        children: [
          {
            name: t('Nhận chuyến thư'),
            url: routesMap.nhanChuyenThu,
          },
          {
            name: t('Khai thác chuyển thư đến'),
            url: routesMap.khaiThacChuyenThuDen,
          },
          {
            name: t('Nhận tải kiện'),
            url: routesMap.thongTinTai,
          },
          {
            name: t('Khai thác tải'),
            url: routesMap.khaiThacTai,
          },
          {
            name: t('Nhận bảng kê / Phiếu gửi'),
            url: routesMap.nhanBangKePhieuGui,
          },
        ],
      },
      {
        name: t('Báo cáo'),
        icon: 'fa fa-sticky-note-o',
        children: [
          {
            name: t('Báo cáo (chưa có gì)'),
            url: routesMap.baoCao,
          },
        ],
      },
      {
        name: t('Khách hàng'),
        icon: 'fa fa-handshake-o',
        children: [
          {
            name: t('Tiếp xúc khách hàng'),
            url: routesMap.tiepXucKhachHang,
          },
        ],
      },
      {
        name: t('Thông tin đơn hàng'),
        icon: 'icon-info',
        url: routesMap.thongTinDonHang,
      },
      {
        name: t('Thông tin đơn hàng 2'),
        icon: 'icon-info',
        url: routesMap.thongTinDonHang2,
      },
      {
        name: t('Thông tin đơn hàng new'),
        icon: 'icon-info',
        url: routesMap.thongTinDonHangNew,
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
