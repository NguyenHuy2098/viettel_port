export enum SipDataType {
  BANG_KE = 'ZC1',
  BUU_GUI = 'ZSML',
  CHUYEN_THU = 'ZC3',
  KIEN = 'ZBIG',
  TAI = 'ZC2',
}

export enum SipDataTorType {
  ZC1 = 'Bảng kê',
  ZC2 = 'Tải',
  ZC3 = 'Chuyến thư',
  ZBIG = 'Kiện',
  ZSML = 'Bưu gửi',
}

export enum SipDataState {
  /**
   * Tai/Bang ke/Chuyen thu - 1xx
   */
  TAO_MOI = 101,
  CHUA_HOAN_THANH = 101,
  GAN_BANG_KE_VAO_TAI = 102,
  DA_DONG = 102,
  GAN_TAI_KIEN_VAO_CHUYEN_THU = 103,
  HOAN_THANH_CHUYEN_THU = 104,
  CHUYEN_THU_XUAT_PHAT = 105,
  CHUYEN_THU_DEN = 106,
  CHUYEN_THU_DA_QUET_NHAN = 107,
  TAI_KIEN_DA_QUET_NHAN = 108,
  BANG_KE_DA_QUET_NHAN = 109,
  /**
   * Kien/Phieu gui/Buu gui - 3xx~8xx
   */
  NHAN_TAI_BUU_CUC_GOC = 306,
  KIEN_CHUA_QUET_NHAN_THUOC_CHUYEN_THU_DA_NHAN_TAI_TTKT = 401,
  BUU_GUI_CHUA_QUET_NHAN_TAI_TTKT = 403,
  BUU_GUI_DA_QUET_NHAN_TAI_TTKT = 404,
  KIEN_CHUA_QUET_NHAN_THUOC_CHUYEN_THU_DA_NHAN_TAI_BUU_CUC = 601,
  BUU_GUI_CHUA_QUET_NHAN_TAI_BUU_CUC = 603,
  BUU_GUI_DA_QUET_NHAN_TAI_BUU_CUC = 604,
}

export enum SipFlowType {
  KHAI_THAC_DEN = 'KHAI_THAC_DEN',
  KHAI_THAC_DI = 'KHAI_THAC_DI',
  BUU_CUC_GOC = 'BUU_CUC_GOC',
}

export enum IV_FLAG {
  TAO = 1,
  SUA = 2,
  XOA = 3,
  REMOVE = 4,
}
