import { AppStateType } from 'redux/store';
import { filter, get, size } from 'lodash';

/**
 * Info
 * @param state
 */
export function makeSelectorOUT(state: AppStateType): API.MTZTMI046OUT | null {
  return get(state, 'response.MIOA_ZTMI046.MT_ZTMI046_OUT', null);
}

/**
 * Info
 * @param state
 */
export function makeSelectorRowFirstChild(state: AppStateType): API.RowMTZTMI046OUT | null {
  return get(state, 'MIOA_ZTMI046.response.MT_ZTMI046_OUT.Row[0]', null);
}

/**
 * List Child
 * @param state
 */
export function makeSelectorListChildren(state: AppStateType): API.Child[] {
  return get(state, 'MIOA_ZTMI046.response.MT_ZTMI046_OUT.Row[0].CHILDS', []);
}

/**
 * Count list Child
 * @param state
 */
export function makeSelectorCountChildren(state: AppStateType): number {
  return size(makeSelectorListChildren(state));
}

/**
 * List Child theo trạng thái
 * @param LIFECYCLE
 */
export function makeSelectorChildrenByLifecycle(LIFECYCLE: number) {
  return (state: AppStateType): API.Child[] => filter(makeSelectorListChildren(state), { LIFECYCLE });
}

/**
 * Count list Child theo trạng thái
 * @param LIFECYCLE
 */
export function makeSelectorCountChildrenByLifecycle(LIFECYCLE: number) {
  return (state: AppStateType): number => size(makeSelectorChildrenByLifecycle(LIFECYCLE)(state));
}
