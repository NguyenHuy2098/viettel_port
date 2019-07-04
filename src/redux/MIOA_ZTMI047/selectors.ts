import { get } from 'lodash';
import { AppStateType } from 'redux/store';
import { useSelector } from 'react-redux';

export function useGet_MT_ZTMI047_OUT_Row(): API.RowMTZTMI047OUT[] | null {
  return useSelector((state: AppStateType): API.RowMTZTMI047OUT[] | null => {
    return get(state, 'MIOA_ZTMI047.MT_ZTMI047_OUT.Row', null);
  });
}
