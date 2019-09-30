import { createAction } from 'redux-unfold-saga';

export const DONG_CHUYEN_THU = 'DONG_CHUYEN_THU';
export const QUET_NHAN = 'QUET_NHAN';

export const actionDongChuyenThu = createAction(DONG_CHUYEN_THU);
export const actionQuetNhan = createAction<QuetNhanRequestType, {}>(QUET_NHAN);
