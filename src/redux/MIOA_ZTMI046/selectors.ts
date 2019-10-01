import { filter, get, includes, isArray, isNumber, size } from 'lodash';

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
