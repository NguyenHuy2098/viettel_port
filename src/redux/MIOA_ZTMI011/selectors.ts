import { useSelector, shallowEqual } from 'react-redux';
import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export function useGet_LocationSearch_OUT(): API.MIOAZTMI011Response | null {
  return useSelector((state: AppStateType): API.MIOAZTMI011Response | null => {
    return get(state, 'MT_ZTMI011_OUT', null);
  }, shallowEqual);
}
