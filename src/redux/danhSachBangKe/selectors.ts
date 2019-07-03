import { createSelector } from 'reselect';
import { AppStateType } from 'redux/store';

export const selectBangKe = (state: AppStateType): API.MIOAZTMI047Response => state.bangKe;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeSelectMTZTMI047OUT = createSelector<any, any, any>(
  selectBangKe,
  (bangKe: API.MIOAZTMI047Response): API.MTZTMI047OUT | undefined => bangKe && bangKe.MT_ZTMI047_OUT,
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeSelectRow = createSelector<any, any, any>(
  makeSelectMTZTMI047OUT,
  (MT_ZTMI047_OUT: API.MTZTMI047OUT): API.RowMTZTMI047OUT[] | [] => MT_ZTMI047_OUT && (MT_ZTMI047_OUT.Row || []),
);
