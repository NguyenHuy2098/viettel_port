import { AppStateType } from 'redux/store';
import { filter, get, size } from 'lodash';

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
export function makeSelector046ChildrenByLifecycle(LIFECYCLE: number) {
  return (state: AppStateType): API.Child[] => filter(makeSelector046ListChildren(state), { LIFECYCLE });
}

/**
 * Count list Child theo trạng thái
 * @param LIFECYCLE
 */
export function makeSelector046CountChildrenByLifecycle(LIFECYCLE: number) {
  return (state: AppStateType): number => size(makeSelector046ChildrenByLifecycle(LIFECYCLE)(state));
}
