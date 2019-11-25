import { filter, get, includes, isArray, isNumber, size, toNumber } from 'lodash';

import { SipDataState, SipDataType } from 'utils/enums';
import { AppStateType } from 'redux/store';

/**
 * Info
 * @param state
 */
export function makeSelector046OUT(state: AppStateType): API.MTZTMI046OUT | undefined {
  return get(state, 'response.MIOA_ZTMI046.MT_ZTMI046_OUT');
}

/**
 * Info
 * @param state
 */
export function makeSelector046RowFirstChild(state: AppStateType): API.RowMTZTMI046OUT | undefined {
  return get(state, 'MIOA_ZTMI046.response.MT_ZTMI046_OUT.Row[0]');
}

/**
 * List Child
 * @param state
 */
export function makeSelector046ListChildren(state: AppStateType): API.Child[] {
  return get(state, 'MIOA_ZTMI046.response.MT_ZTMI046_OUT.Row[0].CHILDS', []) || [];
}

/**
 * Count list Child
 * @param state
 */
export function makeSelector046CountChildren(state: AppStateType): number {
  return size(makeSelector046ListChildren(state));
}

/**
 * Count total page
 * @param state
 */
export function makeSelector046TotalPage(state: AppStateType): number {
  return toNumber(get(state, 'MIOA_ZTMI046.response.MT_ZTMI046_OUT.Paging.EV_TOTAL_PAGE', 1));
}
/**
 * totalItem
 * @param state
 */
export function makeSelector046EVTotalItem(state: AppStateType): number {
  return toNumber(get(state, 'MIOA_ZTMI046.response.MT_ZTMI046_OUT.Paging.EV_TOTAL_ITEM', 1));
}

/**
 * List Child theo trạng thái
 * @param LIFECYCLE
 */
export function makeSelector046ChildrenByLifecycle(LIFECYCLE: number | number[]): (state: AppStateType) => API.Child[] {
  if (isNumber(LIFECYCLE)) {
    return (state: AppStateType): API.Child[] => filter(makeSelector046ListChildren(state), { LIFECYCLE });
  } else if (isArray(LIFECYCLE)) {
    return (state: AppStateType): API.Child[] =>
      filter(makeSelector046ListChildren(state), child => includes(LIFECYCLE, get(child, 'LIFECYCLE')));
  } else {
    return (state: AppStateType): [] => [];
  }
}

export function makeSelector046ChildrenTaiKienChuaNhan(state: AppStateType): API.Child[] {
  const thisData = filter(makeSelector046ListChildren(state), (item: API.Child): boolean => {
    return (
      (item.TOR_TYPE === SipDataType.TAI && item.LIFECYCLE === SipDataState.CHUYEN_THU_DA_QUET_NHAN) ||
      (item.TOR_TYPE === SipDataType.KIEN &&
        (item.LIFECYCLE === SipDataState.KIEN_CHUA_QUET_NHAN_THUOC_CHUYEN_THU_DA_NHAN_TAI_BUU_CUC ||
          item.LIFECYCLE === SipDataState.KIEN_CHUA_QUET_NHAN_THUOC_CHUYEN_THU_DA_NHAN_TAI_TTKT))
    );
  });
  return thisData;
}

export function makeSelector046ChildrenTaiKienDaNhan(state: AppStateType): API.Child[] {
  const thisData = filter(makeSelector046ListChildren(state), (item: API.Child): boolean => {
    return (
      (item.TOR_TYPE === SipDataType.TAI && item.LIFECYCLE === SipDataState.TAI_KIEN_DA_QUET_NHAN) ||
      (item.TOR_TYPE === SipDataType.KIEN && (item.LIFECYCLE === 602 || item.LIFECYCLE === 402))
    );
  });
  return thisData;
}

export function makeSelector046ChildrenTaiKienDaNhanCount(state: AppStateType): number {
  return size(makeSelector046ChildrenTaiKienDaNhan(state));
}

export function makeSelector046ChildrenTaiKienChuaNhanCount(state: AppStateType): number {
  return size(makeSelector046ChildrenTaiKienChuaNhan(state));
}

export function makeSelector046ChildrenTaiKienCount(state: AppStateType): number {
  return size(makeSelector046ChildrenTaiKienDaNhan(state)) + size(makeSelector046ChildrenTaiKienChuaNhan(state));
}

/**
 * Count list Child theo trạng thái
 * @param LIFECYCLE
 */
export function makeSelector046CountChildrenByLifecycle(LIFECYCLE: number | number[]) {
  return (state: AppStateType): number => size(makeSelector046ChildrenByLifecycle(LIFECYCLE)(state));
}

/**
 * List Child theo filter
 * @param criteria
 */
export function makeSelector046ChildrenByFilter(criteria: API.Child) {
  return (state: AppStateType): API.Child[] => filter(makeSelector046ListChildren(state), criteria);
}

/**
 * List Child theo filter
 * @param criteria
 */
export function makeSelector046CountChildrenByFilter(criteria: API.Child) {
  return (state: AppStateType): number => size(makeSelector046ChildrenByFilter(criteria)(state));
}
