import { AppStateType } from 'redux/store';
import { get, size } from 'lodash';

export const select_ZTMI0240 = (state: AppStateType): MTZTMI240Row[] => get(state, 'ZTMI240', []);

export const select_CountZTMI0240 = (state: AppStateType): number => size(select_ZTMI0240(state));
