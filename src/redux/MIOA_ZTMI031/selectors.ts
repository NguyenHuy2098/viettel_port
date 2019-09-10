import { AppStateType } from 'redux/store';
import { get } from 'lodash';

export const select_MT_ZTMI031_OUT = (state: AppStateType): API.RowMTZTMI031OUT[] => get(state, 'MIOA_ZTMI031', []);

const defaultInstance = {
  FWO: '',
  ORDERING_PARTY: '9999999999',
  SHIPER_ID: '',
  SHIPER_NAME: '',
  MOBILE_PHONE_SRT: '',
  CONSIGNEE_ID: '',
  CONSIGNEE_NAME: '',
  MOBILE_PHONE_DES: '',
  BUYER_REFERENCE_NUMBER: null,
  SALES_GROUP: '',
  SOURCE_LOCATION: '',
  SOURCE_LOCATION_DESCRIPTION: '',
  HOUSE_NO_SOURCE: null,
  STREET_ID_SOURCE: '',
  WARD_ID_SOURCE: null,
  DISTRICT_ID_SOURCE: '',
  PROVINCE_ID_SOURCE: '',
  COUNTRY_ID_SOURCE: '',
  DESTINATION_LOCATION: '',
  DESTINATION_LOCATION_NAME: '',
  HOUSE_NO_DES: null,
  STREET_ID_DES: '',
  WARD_ID_DES: null,
  DISTRICT_ID_DES: '',
  PROVINCE_ID_DES: null,
  COUNTRY_ID_DES: '',
  FREIGHT_UNIT: '',
  PACKAGE_ID: '',
  ITEM_DESCRIPTION: '',
  GROSS_WEIGHT: '',
  CHARGED_WEIGHT: '',
  Quantity: '',
  WEIGHT_UOM: '',
  Length: '',
  Width: '',
  Height: '',
  DIMENSION_UOM: '',
  SERVICE_TYPE: '',
  FREIGHT_TERM: '',
  COD: '',
  PICKUP_POSTMAN_ID: '',
  PICKUP_POSTMAN_NAME: '',
  PICKUP_POSTMAN_PHONE: '',
  DELIVERY_POSTMAN_ID: '',
  DELIVERY_POSTMAN_NAME: '',
  DELIVERY_POSTMAN_PHONE: '',
  Execution: [],
  Item: [],
};

export function select_MT_ZTMI031_INSTANE(state: AppStateType): API.RowMTZTMI031OUT {
  return get(select_MT_ZTMI031_OUT(state), '[0]', defaultInstance);
}
export function makeSelectThongTinPhieuGui(state: AppStateType): API.RowMTZTMI031OUT {
  return state.MIOA_ZTMI031[0];
}
