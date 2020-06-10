interface ImportDataType {
  STT: string;
  FWO: string;
  ADDRESS_CONSIG: string;
  ADDRESS_OP: string;
  ADDRESS_SHIPPER: string;
  BUYERS_REFERENCE_NUMBER: string;
  CAMPAIGN: string;
  CITY_DES: string;
  CITY_SRC: string;
  CONSIGNEE: string;
  COUNTRY_DES: string;
  COUNTRY_SRC: string;
  CUS_ID: string;
  DISTRICT_DES: string;
  DISTRICT_SRC: string;
  EMAIL_CONSIG: string;
  EMAIL_OP: string;
  EMAIL_SHIPPER: string;
  FREIGH_TERM: string;
  HOUSE_ID_SRC: string;
  HOUSE_ID_DES: string;
  ITEM: [
    {
      Width: string;
      COMMODITY_CODE: string;
      COMMODITY_TYPE: string;
      PACKAGE_TYPE: string;
      QUANTITY_OF_UNIT: string;
      GOODS_VALUE: string;
      GROSS_WEIGHT: string;
      Length: string;
      Hight: string;
      PACKAGING_MATERIAL: string;
      QUANTITY_OF_PACKAGE: string;
      Description: string;
      NET_WEIGHT_OF_UNIT: string;
      Currency: string;
      GROSS_WEIGHT_OF_UNIT: string;
      Flag: string;
      COD: string;
      NET_WEIGHT: string;
      NHOM_HANG_HOA: string;
      LOAI_HANG_HOA: string;
    },
    {
      SERVICE_TYPE: string;
      QUANTITY_OF_PACKAGE: string;
      QUANTITY_OF_UNIT: string;
    },
  ];
  LOCATION_ID_SRC: string;
  MOVEMENT_TYPE: string;
  NAME_CONSIG: string;
  NAME_OP: string;
  NAME_SHIPPER: string;
  NOTE: string;
  OLD_CAMPAIGN_ID: number;
  ORDERING_PARTY: string;
  ORDER_TYPE: string;
  PHONE_CONSIG: string;
  PHONE_OP: string;
  PHONE_SHIPPER: string;
  POSTAL_CODE_DES: string;
  POSTAL_CODE_SRC: string;
  REQUEST_PICK_DATE: string;
  REQUEST_DELIV_DATE: string;
  SALE_OFFICE: string;
  SHIPPER: string;
  SOURCE_TYPE: string;
  STREET_NAME_DES: string;
  STREET_NAME_SRC: string;
  TEL_DES: string;
  TEL_SRC: string;
  TRANSPORTATION_MODE: string;
  WARD_DES: string;
  WARD_SRC: string;
  NGUOI_TRA_CUOC: string;
  STATUS: string;
  errorMes: string;
  DATE_IMPORT: string;
  POSTOFFICE: string;
  BPCode: string;
}
