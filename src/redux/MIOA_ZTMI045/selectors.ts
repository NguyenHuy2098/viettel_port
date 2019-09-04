import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export function makeSelectorGet_MT_ZTMI045_OUT(state: AppStateType): API.RowMTZTMI045OUT[] {
  return get(state, 'MIOA_ZTMI045.response.MT_ZTMI045_OUT.Row', null);
}
