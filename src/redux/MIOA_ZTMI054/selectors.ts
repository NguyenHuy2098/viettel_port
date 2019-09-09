import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export function makeSelectorGet_MT_ZTMI054_OUT(state: AppStateType): API.RowMTZTMI054OUT[] {
  return get(state, 'MIOA_ZTMI054.response.MT_ZTMI054_OUT.Row', []);
}
