import { useSelector, shallowEqual } from 'react-redux';
import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export function useGet_SearchLocation_OUT(): API.VtpAddressResponse | null {
  return useSelector((state: AppStateType): API.VtpAddressResponse | null => {
    return get(state, 'SearchLocation.LocationModels', null);
  }, shallowEqual);
}
