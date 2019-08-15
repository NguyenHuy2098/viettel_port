import { useSelector, shallowEqual } from 'react-redux';
import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export function useGet_SearchLocation_OUT(): API.MTZTMI068Response | null {
  return useSelector((state: AppStateType): API.MTZTMI068Response | null => {
    return get(state, 'MT_ZTMI068_OUT', null);
  }, shallowEqual);
}
