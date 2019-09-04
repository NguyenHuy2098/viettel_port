import { useSelector, shallowEqual } from 'react-redux';
import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export function useGet_MT_ZTMI045_OUT(): API.MTZTMI045OUT | null {
  return useSelector((state: AppStateType): API.MTZTMI045OUT | null => {
    return get(state, 'response.MIOA_ZTMI045.MT_ZTMI045_OUT', null);
  }, shallowEqual);
}
