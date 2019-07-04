import { useSelector, shallowEqual } from 'react-redux';
import { AppStateType } from 'redux/store';

export function useGetManifestForwardingOrderList() {
  const listRows: API.Child[] | null = useSelector((state: AppStateType) => {
    return (
      state.danhSachPhieuGuiTrongBangKe &&
      state.danhSachPhieuGuiTrongBangKe.MT_ZTMI046_OUT &&
      state.danhSachPhieuGuiTrongBangKe.MT_ZTMI046_OUT.Row &&
      state.danhSachPhieuGuiTrongBangKe.MT_ZTMI046_OUT.Row.CHILDS
    );
  }, shallowEqual);
  return listRows;
}
