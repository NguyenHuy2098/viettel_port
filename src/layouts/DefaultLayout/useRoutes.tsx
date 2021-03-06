import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import routesMap from 'utils/routesMap';
import { SIPRoutePropsType } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */

// =============== DieuHanh =====================

const TiepXucKhachHang = lazy(() => import('containers/DieuHanh/TiepXucKhachHang'));
const BienBanNoiBo = lazy(() => import('containers/DieuHanh/BienBanNoiBo'));
const LapBienBan = lazy(() => import('containers/DieuHanh/BienBanNoiBo/LapBienBan'));
const TraCuuBienBan = lazy(() => import('containers/DieuHanh/BienBanNoiBo/TraCuuBienBan'));
const SuaBienBan = lazy(() => import('containers/DieuHanh/BienBanNoiBo/SuaBienBan'));
const XacMinhBienBan = lazy(() => import('containers/DieuHanh/BienBanNoiBo/XacMinhBienBan'));
const KhieuNaiKhachHang = lazy(() => import('containers/DieuHanh/KhieuNaiKhachHang'));
const ChiTietKhieuNai = lazy(() => import('containers/DieuHanh/KhieuNaiKhachHang/ChiTiet'));
const BaoCao = lazy(() => import('containers/BaoCao'));

// =============== NhapPhieuGui =====================

const PhieuGuiTrongNuoc = lazy(() => import('containers/NhapPhieuGui/PhieuGuiTrongNuoc'));
const PhieuGuiQuocTe = lazy(() => import('containers/NhapPhieuGui/PhieuGuiQuocTe'));
const NhapTuFileExcel = lazy(() => import('containers/NhapPhieuGui/NhapTuFileExcel'));
const ChiTietLichSu = lazy(() => import('containers/NhapPhieuGui/NhapTuFileExcel/ChiTietLichSu'));
const NhanTaiBuuCucGoc = lazy(() => import('containers/NhapPhieuGui/NhanTaiBuuCucGoc'));
const ChiTietNhomHangHoa = lazy(() => import('containers/NhapPhieuGui/NhanTaiBuuCucGoc/ChiTietNhomHangHoa'));

// =============== KhaiThacDi =====================

const DongBangKe = lazy(() => import('containers/KhaiThacDi/DongBangKe/index'));
const DongBangKeNoiTinh = lazy(() => import('containers/KhaiThacDi/BangKe/DongBangKeNoiTinh'));
const ThongTinBangKe = lazy(() => import('containers/KhaiThacDi/BangKe/ThongTinBangKe'));
const DanhSachPhieuGuiTrongBangKe = lazy(() => import('containers/KhaiThacDi/DongBangKe/DanhSachPhieuGuiTrongBangKe'));
const DanhSachPhieuGuiTrongBangKeDaDong = lazy(() =>
  import('containers/KhaiThacDi/DongBangKe/DanhSachPhieuGuiTrongBangKeDaDong'),
);
const DongTai = lazy(() => import('containers/KhaiThacDi/DongTai'));
const DanhSachPhieuGuiTrongTai = lazy(() => import('containers/KhaiThacDi/DongTai/DanhSachPhieuGuiTrongTai'));
const DanhSachPhieuGuiTrongTaiDaDong = lazy(() =>
  import('containers/KhaiThacDi/DongTai/DanhSachPhieuGuiTrongTaiDaDong'),
);
const DongChuyenThu = lazy(() => import('containers/KhaiThacDi/DongChuyenThu'));
const DanhSachTaiKienTrongChuyenThu = lazy(() =>
  import('containers/KhaiThacDi/DongChuyenThu/DanhSachTaiKienTrongChuyenThu'),
);
const DanhSachTaiKienTrongChuyenThuDaDong = lazy(() =>
  import('containers/KhaiThacDi/DongChuyenThu/DanhSachTaiKienTrongChuyenThuDaDong'),
);
const TachPhieuGui = lazy(() => import('containers/KhaiThacDi/TachPhieuGui'));
const ChiTietBuuGuiChuaDongBangKe = lazy(() => import('containers/KhaiThacDi/DongBangKe/ChiTietBuuGuiChuaDongBangKe'));

// =============== KhaiThacDen =====================

const NhanChuyenThu = lazy(() => import('containers/KhaiThacDen/NhanChuyenThu'));
const NhanTaiKien = lazy(() => import('containers/KhaiThacDen/NhanTaiKien'));
const KhaiThacChuyenThuDen = lazy(() => import('containers/KhaiThacDen/KhaiThacChuyenThuDen'));
const ThongTinChuyenThu = lazy(() => import('containers/KhaiThacDen/ThongTinChuyenThu'));
const ThongTinTai = lazy(() => import('containers/KhaiThacDen/ThongTinTai'));
const ThongTinBangKePhieuGui = lazy(() => import('containers/KhaiThacDen/ThongTinBangKe'));
const KhaiThacTai = lazy(() => import('containers/KhaiThacDen/KhaiThacTai'));
const NhanBangKePhieuGui = lazy(() => import('containers/KhaiThacDen/NhanBangKePhieuGui'));
const PhanCongPhatNhan = lazy(() => import('containers/KhaiThacDen/PhanCongPhatNhan'));

// =========== unsorted components ==========

const ThongTinKienHang = lazy(() => import('containers/ThongTinKienHang'));
const ThongTinDonHang = lazy(() => import('containers/ThongTinDonHang'));
const InDonHang = lazy(() => import('containers/InDonHang'));
const ThongTinDonHangNew = lazy(() => import('containers/ThongTinDonHangNew'));
const PageNoData = lazy(() => import('containers/PageNoData'));
const Home = lazy(() => import('containers/Home'));
const RedirectToHome = lazy(() => import('./RedirectToHome'));

const KeKhaiChiPhi = lazy(() => import('containers/KeKhaiChiPhi/DanhSachBangKe'));
const TaoMoiBangKe = lazy(() => import('containers/KeKhaiChiPhi/TaoMoiBangKe'));
const ChiTietBangKe = lazy(() => import('containers/KeKhaiChiPhi/ChiTietBangKe'));

/* eslint-enable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line max-lines-per-function
const routes = (t: TFunction): SIPRoutePropsType[] => {
  return [
    { path: routesMap.ROOT, exact: true, name: t('Root'), component: RedirectToHome },
    { path: routesMap.HOME, exact: true, name: t('Home'), component: Home },
    { path: routesMap.CHI_TIET_BANG_KE, exact: true, name: t('Chi ti???t b???ng k??'), component: ChiTietBangKe },
    {
      path: routesMap.NHAP_PHIEU_GUI_TRONG_NUOC,
      exact: true,
      name: t('Phi???u g???i trong n?????c'),
      component: PhieuGuiTrongNuoc,
    },
    {
      path: routesMap.PHIEU_GUI_TRONG_NUOC,
      name: t('Phi???u g???i trong n?????c'),
      component: PhieuGuiTrongNuoc,
    },
    {
      path: routesMap.NHAP_PHIEU_GUI_QUOC_TE,
      exact: true,
      name: t('Phi???u g???i qu???c t???'),
      component: PhieuGuiQuocTe,
    },
    {
      path: routesMap.PHIEU_GUI_QUOC_TE,
      name: t('Phi???u g???i trong n?????c'),
      component: PhieuGuiQuocTe,
    },
    {
      path: routesMap.CHI_TIET_LICH_SU,
      name: t('Phi???u g???i trong n?????c'),
      component: ChiTietLichSu,
    },
    { path: routesMap.DONG_BANG_KE_NOI_TINH, name: t('????ng b???ng k?? n???i t???nh'), component: DongBangKeNoiTinh },
    { path: routesMap.DONG_BANG_KE, name: t('????ng b???ng k??'), component: DongBangKe },
    { path: routesMap.NHAP_TU_FILE_EXCEL, name: t('Nh???p t??? file excel'), component: NhapTuFileExcel },
    { path: routesMap.THONG_TIN_BANG_KE, name: t('Th??ng tin b???ng k??'), component: ThongTinBangKe },
    { path: routesMap.DONG_TAI, name: t('????ng t???i'), component: DongTai },
    {
      path: routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI,
      name: t('Danh s??ch phi??u g???i trong t???i'),
      component: DanhSachPhieuGuiTrongTai,
    },
    {
      path: routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI_DA_DONG,
      name: t('Danh s??ch phi??u g???i trong t???i ???? ????ng'),
      component: DanhSachPhieuGuiTrongTaiDaDong,
    },
    { path: routesMap.DONG_CHUYEN_THU, name: t('????ng chuy???n th??'), component: DongChuyenThu },
    { path: routesMap.THONG_TIN_TAI, name: t('Th??ng tin t???i'), component: ThongTinTai },
    {
      path: routesMap.THONG_TIN_BANG_KE_PHIEU_GUI,
      name: t('Th??ng tin b???ng k??/phi???u g???i'),
      component: ThongTinBangKePhieuGui,
    },
    { path: routesMap.THONG_TIN_CHUYEN_THU, name: t('Th??ng tin chuy???n th??'), component: ThongTinChuyenThu },
    {
      path: routesMap.NHAN_BANG_KE_PHIEU_GUI,
      name: t('Nh???n b???ng k?? phi???u g??i'),
      component: NhanBangKePhieuGui,
    },
    {
      path: routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE,
      name: t('Danh s??ch phi???u g???i trong b???ng k??'),
      component: DanhSachPhieuGuiTrongBangKe,
    },
    {
      path: routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE_DA_DONG,
      name: t('Danh s??ch phi???u g???i trong b???ng k?? ???? ????ng'),
      component: DanhSachPhieuGuiTrongBangKeDaDong,
    },
    {
      path: routesMap.DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU,
      name: t('Danh s??ch t???i ki???n trong chuy???n th??'),
      component: DanhSachTaiKienTrongChuyenThu,
    },
    {
      path: routesMap.DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU_DA_DONG,
      name: t('Danh s??ch t???i ki???n trong chuy???n th?? ???? ????ng'),
      component: DanhSachTaiKienTrongChuyenThuDaDong,
    },
    { path: routesMap.KHAI_THAC_TAI, name: t('Khai th??c t???i'), component: KhaiThacTai },
    { path: routesMap.NHAN_CHUYEN_THU, name: t('Nh???n chuy???n th??'), component: NhanChuyenThu },
    { path: routesMap.NHAN_TAI_KIEN, name: t('Nh???n t???i ki???n'), component: NhanTaiKien },
    { path: routesMap.KHAI_THAC_CHUYEN_THU_DEN, name: t('Khai th??c chuy???n th?? ?????n'), component: KhaiThacChuyenThuDen },
    { path: routesMap.ERROR_NO_DATA, name: t('Ch??a c?? d??? li???u'), component: PageNoData },
    { path: routesMap.TIEP_XUC_KHACH_HANG, name: t('Ti???p x??c kh??ch h??ng'), component: TiepXucKhachHang },
    { path: routesMap.THONG_TIN_KIEN_HANG, name: t('Th??ng tin ki???n h??ng'), component: ThongTinKienHang },
    { path: routesMap.THONG_TIN_DON_HANG, name: t('Th??ng tin ????n h??ng'), component: ThongTinDonHang },
    { path: routesMap.IN_DON_HANG, name: t('In ????n h??ng'), component: InDonHang },
    { path: routesMap.THONG_TIN_DON_HANG_NEW, name: t('Th??ng tin ????n h??ng new'), component: ThongTinDonHangNew },
    { path: routesMap.TACH_PHIEU_GUI, name: t('T??ch phi???u g???i'), component: TachPhieuGui },
    { path: routesMap.BIEN_BAN_NOI_BO, name: t('Bi??n b???n n???i b???'), component: BienBanNoiBo },
    { path: routesMap.LAP_BIEN_BAN, name: t('L???p bi??n b???n'), component: LapBienBan },
    { path: routesMap.TRA_CUU_BIEN_BAN, name: t('Tra c???u bi??n b???n'), component: TraCuuBienBan },
    { path: routesMap.SUA_BIEN_BAN, name: t('S???a bi??n b???n'), component: SuaBienBan },
    { path: routesMap.XAC_MINH_BIEN_BAN, name: t('X??c minh bi??n b???n'), component: XacMinhBienBan },
    { path: routesMap.KHIEU_NAI_KHACH_HANG, name: t('Khi???u n???i kh??ch h??ng'), component: KhieuNaiKhachHang },
    { path: routesMap.CHI_TIET_KHIEU_NAI, name: t('Chi ti???t khi???u n???i'), component: ChiTietKhieuNai },
    { path: routesMap.BAO_CAO, name: t('B??o c??o'), component: BaoCao },
    { path: routesMap.NHAN_TAI_BUU_CUC_GOC, name: t('Qu??t m?? phi???u g???i'), component: NhanTaiBuuCucGoc },
    { path: routesMap.PHAN_CONG_PHAT_NHAN, name: t('Ph??n c??ng ph??t nh???n'), component: PhanCongPhatNhan },
    { path: routesMap.CHI_TIET_NHOM_HANG_HOA, name: t('Chi ti???t nh??m h??ng h??a'), component: ChiTietNhomHangHoa },
    { path: routesMap.TAO_MOI_BANG_KE, name: t('T???o m???i b???ng k??'), component: TaoMoiBangKe },
    { path: routesMap.KE_KHAI_CHI_PHI, name: t('K?? khai chi ph??'), component: KeKhaiChiPhi },
    {
      path: routesMap.CHI_TIET_BUU_BUI_CHUA_DONG_BANG_KE,
      name: t('Chi ti???t nh??m h??ng h??a'),
      component: ChiTietBuuGuiChuaDongBangKe,
    },
  ];
};

const useRoutes = (): SIPRoutePropsType[] => {
  const { t } = useTranslation();
  return routes(t);
};

export default useRoutes;
