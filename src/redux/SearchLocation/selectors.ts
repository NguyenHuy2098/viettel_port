import { useSelector, shallowEqual } from 'react-redux';
import { AppStateType } from 'redux/store';
import { get, size } from 'lodash';

export function useGet_SearchLocation_OUT(): API.VtpProvinceResponse | null {
  return useSelector((state: AppStateType): API.VtpProvinceResponse | null => {
    return get(state, 'SearchLocation.LocationModels', null);
  }, shallowEqual);
}
