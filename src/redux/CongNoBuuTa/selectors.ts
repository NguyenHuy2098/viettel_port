/* eslint-disable no-console */
import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export const select_COD_Chua_Chot = (state: AppStateType): API.TEST[] => {
  return get(state, 'GACH.response', []);
};

// export function select_MT_ZTMI031_INSTANE(state: AppStateType): API.RowMTZTMI031OUT {
//   return get(select_MT_ZTMI031_OUT(state), '[0]', defaultInstance);
// }
// export function makeSelectThongTinPhieuGui(state: AppStateType): API.RowMTZTMI031OUT {
//   return state.MIOA_ZTMI031[0];
// }
