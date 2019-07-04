import { useSelector, shallowEqual } from 'react-redux';
import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export function useGetManifestForwardingOrderList(): API.MTZTMI046OUT | {} {
  return useSelector((state: AppStateType): API.MTZTMI046OUT | {} => {
    return get(state, 'danhSachPhieuGuiTrongBangKe.MT_ZTMI046_OUT', {});
  }, shallowEqual);
}
