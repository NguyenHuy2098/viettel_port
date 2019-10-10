import { AppStateType } from 'redux/store';
import { get, size } from 'lodash';

export const select_ZTMI0240 = (state: AppStateType): MTZTMI240Row[] => {
  return get(state, 'ZTMI240.MT_ZTMI240_OUT.Row', []);
};

export const select_CountZTMI0240 = (state: AppStateType): number => size(select_ZTMI0240(state));
