import { createAction } from 'redux-unfold-saga';

export const DONG_CHUYEN_THU = 'DONG_CHUYEN_THU';
export const QUET_NHAN = 'QUET_NHAN';
export const DONG_BANG_KE_VAO_TAI_CO_SAN = 'DONG_BANG_KE_VAO_TAI_CO_SAN';
export const DONG_BANG_KE_VAO_TAI_MOI_TAO = 'DONG_BANG_KE_VAO_TAI_MOI_TAO';
export const DONG_TAI_VAO_CHUYEN_THU_CO_SAN = 'DONG_TAI_VAO_CHUYEN_THU_CO_SAN';
export const DONG_TAI_VAO_CHUYEN_THU_TAO_MOI = 'DONG_TAI_VAO_CHUYEN_THU_TAO_MOI';

export const actionQuetNhan = createAction<QuetNhanRequestType, {}>(QUET_NHAN);

export const actionDongBanKeVaoTaiCoSan = createAction(DONG_BANG_KE_VAO_TAI_CO_SAN);
export const actionDongBangKeVaoTaiMoiTao = createAction(DONG_BANG_KE_VAO_TAI_MOI_TAO);
export const actionDongTaiVaoChuyenThuCoSan = createAction(DONG_TAI_VAO_CHUYEN_THU_CO_SAN);
export const actionDongTaiVaoChuyenThuTaoMoi = createAction(DONG_TAI_VAO_CHUYEN_THU_TAO_MOI);
