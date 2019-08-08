import { useSelector, shallowEqual } from 'react-redux';
import { AppStateType } from 'redux/store';
import { filter, get, size } from 'lodash';

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

export function makeSelectorKienChuaNhan(state: AppStateType): API.Child[] | null {
  // @ts-ignore
  return filter(makeSelectorMT_ZTMI046(state), { LIFECYCLE: 106 });
}

export function makeSelectorKienDaNhan(state: AppStateType): API.Child[] | null {
  // @ts-ignore
  return filter(makeSelectorMT_ZTMI046(state), { LIFECYCLE: 107 });
}
export function makeSelectorBangKeDaNhan(state: AppStateType): API.Child[] | null {
  // @ts-ignore
  return filter(makeSelectorMT_ZTMI046(state), { LIFECYCLE: 107 });
}
export function makeSelectorBangKeChuaNhan(state: AppStateType): API.Child[] | null {
  // @ts-ignore
  return filter(makeSelectorMT_ZTMI046(state), { LIFECYCLE: 107 });
}

export function makeSelectorCountKienChuaNhan(state: AppStateType): number {
  return size(makeSelectorKienChuaNhan(state));
}
export function makeSelectorCountKienDaNhan(state: AppStateType): number {
  return size(makeSelectorKienDaNhan(state));
}
export function makeSelectorCountBangKeDaNhan(state: AppStateType): number {
  return size(makeSelectorBangKeDaNhan(state));
}

export function makeSelectorCountBangKeChuaNhan(state: AppStateType): number {
  return size(makeSelectorBangKeChuaNhan(state));
}
