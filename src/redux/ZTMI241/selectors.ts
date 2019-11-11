import { AppStateType } from 'redux/store';
import { get, size } from 'lodash';

export const select_ZTMI241 = (state: AppStateType): API.MTZTMI241OUT | null => get(state, 'ZTMI241', null);

export const select_ZTMI241TotalItem = (state: AppStateType): number => size(get(state, 'ZTMI241.Row', null));
