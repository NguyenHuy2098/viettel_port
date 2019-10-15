import { createAction } from 'redux-unfold-saga';

export const DONG_TAI_VAO_CHUYEN_THU_CO_SAN = 'DONG_TAI_VAO_CHUYEN_THU_CO_SAN';
export const DONG_TAI_VAO_CHUYEN_THU_TAO_MOI = 'DONG_TAI_VAO_CHUYEN_THU_TAO_MOI';

export const actionDongTaiVaoChuyenThuCoSan = createAction(DONG_TAI_VAO_CHUYEN_THU_CO_SAN);
export const actionDongTaiVaoChuyenThuTaoMoi = createAction(DONG_TAI_VAO_CHUYEN_THU_TAO_MOI);
