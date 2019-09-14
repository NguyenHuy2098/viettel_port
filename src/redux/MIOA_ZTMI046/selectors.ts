import { AppStateType } from 'redux/store';
import { filter, get, includes, isArray, isNumber, size } from 'lodash';

/**
 * Info
 * @param state
 */
export function makeSelector046OUT(state: AppStateType): API.MTZTMI046OUT | null {
  return get(state, 'response.MIOA_ZTMI046.MT_ZTMI046_OUT', null);
}

/**
 * Info
 * @param state
 */
export function makeSelector046RowFirstChild(state: AppStateType): API.RowMTZTMI046OUT | null {
  return get(state, 'MIOA_ZTMI046.response.MT_ZTMI046_OUT.Row[0]', null);
}

/**
 * List Child
 * @param state
 */
export function makeSelector046ListChildren(state: AppStateType): API.Child[] {
  return get(state, 'MIOA_ZTMI046.response.MT_ZTMI046_OUT.Row[0].CHILDS', []);
}

/**
 * Count list Child
 * @param state
 */
export function makeSelector046CountChildren(state: AppStateType): number {
  return size(makeSelector046ListChildren(state));
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

/**
 * Count list Child theo trạng thái
 * @param LIFECYCLE
 */
export function makeSelector046CountChildrenByLifecycle(LIFECYCLE: number | number[]) {
  return (state: AppStateType): number => size(makeSelector046ChildrenByLifecycle(LIFECYCLE)(state));
}
