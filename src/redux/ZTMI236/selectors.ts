import { get, size, toNumber } from 'lodash';
import { AppStateType } from 'redux/store';

export const makeSelectorZTMI236response = (state: AppStateType): API.ZTMI236Response => get(state, 'ZTMI236.response');

export const makeSelectorZTMI236OUT = (state: AppStateType): API.MTZTMI236OUT | undefined =>
  get(makeSelectorZTMI236response(state), 'MT_ZTMI236_OUT');

export const makeSelectorZTMI236OUTPaging = (state: AppStateType): API.Paging | undefined =>
  get(makeSelectorZTMI236OUT(state), 'PAGING');

export const makeSelectorZTMI236OUTPagingTotalPage = (state: AppStateType): number =>
  toNumber(get(makeSelectorZTMI236OUTPaging(state), 'EV_TOTAL_PAGE', 1));

export const makeSelectorZTMI236OUTRow = (state: AppStateType): API.RowMTZTMI236OUT[] =>
  get(makeSelectorZTMI236OUT(state), 'Row', []) || [];

export const makeSelectorZTMI236OUTRowCount = (state: AppStateType): number => size(makeSelectorZTMI236OUTRow(state));
