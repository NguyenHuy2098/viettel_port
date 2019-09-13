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

interface PackageItemInputType {
  Flag?: string;
  PACKAGING_MATERIAL?: string;
  Description?: string;
  PACKAGE_TYPE?: string;
  QUANTITY_OF_PACKAGE?: string | undefined;
  QUANTITY_OF_UNIT?: string;
  GROSS_WEIGHT?: string | undefined;
  GROSS_WEIGHT_OF_UNIT?: string;
  NET_WEIGHT?: string;
  NET_WEIGHT_OF_UNIT?: string;
  Length?: string | undefined;
  Hight?: string | undefined;
  Width?: string | undefined;
  Note?: string;
  GOODS_VALUE?: string | undefined;
  Currency?: string;
  COMODITY_CODE?: string;
  COD?: string | undefined;
  Service_type?: string;
  commodity_type?: string;
  commodity_code?: string;
}

interface NationType {
  NATIONAL_ID: number;
  NATIONAL_CODE: string;
  NATIONAL_NAME: string;
}
