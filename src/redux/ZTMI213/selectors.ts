import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export const select_ZTMI213 = (state: AppStateType): API.MTZTMI213OUT | null => get(state, 'ZTMI213', null);

// export default select_ZTMI213;
