import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export function makeSelectorGet_MT_ZTMI055_OUT(state: AppStateType): API.MTZTMI055OUT[] {
  return get(state, 'MIOA_ZTMI055.response', null);
}
