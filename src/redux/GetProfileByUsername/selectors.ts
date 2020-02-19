import { get } from 'lodash';
import { AppStateType } from 'redux/store';

export function makeSelectorBPOrg(state: AppStateType): string {
  return get(state, 'profileByUsername.BPOrg', '');
}
