import { createAction } from 'redux-unfold-saga';

export const QUET_NHAN = 'QUET_NHAN';

export const actionQuetNhan = createAction<QuetNhanRequestType, {}>(QUET_NHAN);
