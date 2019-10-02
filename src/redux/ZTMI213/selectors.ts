import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export const select_ZTMI213 = (state: AppStateType): API.RowMTZTMI213OUT[] => {
  return get(state, 'ZTMI213.response', []);
};
