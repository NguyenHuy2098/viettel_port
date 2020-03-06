interface TransportMethodItem {
  SERVICE_TYPE: string;
  SERVICE_TYPE_DES: string;
  SERVICE_GROUP: string;
  SERVICE_GROUP_DES: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TARGET_TIME?: any;
}

interface VtpAddress {
  I: string;
  N: string;
  P?: string;
  type: number;
}

interface PackageItemErrors {
  index: number;
  errors: yup.ValidationError[];
}

interface AddressPopupData {
  province: string;
  district: string;
  ward: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  detailAddress: string;
  fullAddress: string;
}

interface VtpAddressResponse {
  LocationModels: VtpAddress[];
  PageIndex: number;
  PageSize: number;
  TotalRow: number;
  Status: boolean;
  ErrorCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Messages: any[];
  any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ObjectId?: any;
  Version: number;
}

interface TypeaheadOption {
  id: string;
  label: string;
}
