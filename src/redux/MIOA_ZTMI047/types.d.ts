interface MIOAZTMI047PayloadType {
  data: API.MIOAZTMI047Response;
  params: {
    IV_TOR_TYPE: string;
    IV_CUST_STATUS: string;
  };
}

interface MIOAZTMI047StateType {
  // Loại (Bảng kê: ZC1, Tải: ZC2, chuyến thư: ZC3)
  [IV_TOR_TYPE: string]: {
    // Trạng thái tải/bảng kê/chuyến thư
    [IV_CUST_STATUS: string]: API.MIOAZTMI047Response;
  };
}

interface ForwardingItem {
  ITEM_ID: string;
  ITEM_TYPE: string;
}
