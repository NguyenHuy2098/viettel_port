import { useSelector, shallowEqual } from 'react-redux';
import { AppStateType } from 'redux/store';
import { get, size } from 'lodash';

export function useGet_MT_ZTMI046_OUT(): API.MTZTMI046OUT | null {
  return useSelector((state: AppStateType): API.MTZTMI046OUT | null => {
    return get(state, 'MIOA_ZTMI046.MT_ZTMI046_OUT', null);
  }, shallowEqual);
}

export function makeSelectorMT_ZTMI046(state: AppStateType): API.MTZTMI046OUT[] | null {
  return get(state, 'MIOA_ZTMI046.MT_ZTMI046_OUT.Row[0].CHILDS', null);
}

export function makeSelectorCountMT_ZTMI046(state: AppStateType): number {
  return size(makeSelectorMT_ZTMI046(state));
}
