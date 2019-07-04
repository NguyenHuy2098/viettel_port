import { useSelector, shallowEqual } from 'react-redux';
import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export function useGet_MT_ZTMI046_OUT(): API.MTZTMI046OUT | null {
  return useSelector((state: AppStateType): API.MTZTMI046OUT | null => {
    return get(state, 'MIOA_ZTMI046.MT_ZTMI046_OUT', null);
  }, shallowEqual);
}
