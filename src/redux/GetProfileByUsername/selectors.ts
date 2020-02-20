import { get } from 'lodash';
import { AppStateType } from 'redux/store';

export function makeSelectorBPOrg(state: AppStateType): string {
  return get(state, 'profileByUsername.currentPostOffice.PostOfficeCode', '');
}

export function makeSelectorCurrentPostOffice(state: AppStateType): PostOfficeType | undefined {
  return get(state, 'profileByUsername.currentPostOffice', undefined);
}
