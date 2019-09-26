import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export const select_ZTMI241 = (state: AppStateType): API.MTZTMI241OUT | null => get(state, 'ZTMI241', null);
