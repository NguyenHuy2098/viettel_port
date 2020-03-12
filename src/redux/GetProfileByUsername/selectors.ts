import { get } from 'lodash';
import { AppStateType } from 'redux/store';

export function makeSelectorBPOrg(state: AppStateType): string {
  return get(state, 'profileByUsername.currentPostOffice.PostOfficeCode', '');
}

export function makeSelectorCurrentPostOffice(state: AppStateType): SSOAPI.PostOffice | undefined {
  return get(state, 'profileByUsername.currentPostOffice', undefined);
}
