import moment from 'moment';
import numeral from 'numeral';
import { WorkSheet } from 'xlsx';
import uuid from 'uuid';
import * as yup from 'yup';
import { find, get, isEmpty, isObject, split, toNumber, filter } from 'lodash';
import parse_query_string from './parse_query_string';
import { toastError } from '../components/Toast';
import { loaiHangHoaList, nhomHangHoaList } from '../containers/NhapPhieuGui/NhapTuFileExcel/LoaiHangHoa';

export const cleanAccents = (str: string): string => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Combining Diacritical Marks
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)

  return str;
};

export function validateXlsxBangKe(workSheet: WorkSheet): boolean {
  return (
    get(workSheet, 'A1.v') === 'Khoản mục chi phí' &&
    get(workSheet, 'B1.v') === 'Mẫu hóa đơn' &&
    get(workSheet, 'C1.v') === 'Ký hiệu hóa đơn' &&
    get(workSheet, 'D1.v') === 'Ngày hóa đơn' &&
    get(workSheet, 'E1.v') === 'Số hóa đơn' &&
    get(workSheet, 'F1.v') === 'Tên người bán' &&
    get(workSheet, 'G1.v') === 'Mã số thuế người bán' &&
    get(workSheet, 'H1.v') === 'Hàng hóa, dịch vụ' &&
    get(workSheet, 'I1.v') === 'Hàng hóa, dịch vụ chưa thuế' &&
    get(workSheet, 'J1.v') === 'Phụ phí' &&
    get(workSheet, 'K1.v') === 'Thuế suất' &&
    get(workSheet, 'L1.v') === 'Thuế GTGT' &&
    get(workSheet, 'M1.v') === 'Tổng cộng' &&
    get(workSheet, 'N1.v') === 'Link URL'
  );
}

export function validateXlsxNhapDon(workSheet: WorkSheet): boolean {
  return (
    get(workSheet, 'A7.v') === 'STT' &&
    get(workSheet, 'B7.v') === 'Mã KH' &&
    get(workSheet, 'C7.v') === 'Mã đơn hàng ' &&
    get(workSheet, 'D7.v') === 'Tên người nhận (*)' &&
    get(workSheet, 'E7.v') === 'Số ĐT người nhận (*)' &&
    get(workSheet, 'F7.v') === 'Địa chỉ nhận (*)' &&
    get(workSheet, 'G7.v') === 'Tỉnh đến (*)' &&
    get(workSheet, 'H7.v') === 'Quận/Huyện đến (*)' &&
    get(workSheet, 'I7.v') === 'Phường/Xã đến' &&
    get(workSheet, 'J7.v') === 'Nhóm hàng hóa (*)' &&
    get(workSheet, 'K7.v') === 'Loại hàng hóa (*)' &&
    get(workSheet, 'L7.v') === 'Tên hàng hóa (*)' &&
    get(workSheet, 'M7.v') === 'Số lượng' &&
    get(workSheet, 'N7.v') === 'Trọng lượng (gram) (*)' &&
    get(workSheet, 'O7.v') === 'Giá trị hàng (VND)' &&
    get(workSheet, 'P7.v') === 'Tiền thu hộ COD (VND)' &&
    get(workSheet, 'Q7.v') === 'Dịch vụ (*)' &&
    get(workSheet, 'R7.v') === 'Dài (cm)' &&
    get(workSheet, 'S7.v') === 'Rộng (cm)' &&
    get(workSheet, 'T7.v') === 'Cao (cm)' &&
    get(workSheet, 'U7.v') === 'Dịch vụ cộng thêm ' &&
    get(workSheet, 'V7.v') === 'Người trả cước' &&
    get(workSheet, 'W7.v') === 'Địa điểm giao nhận hàng' &&
    get(workSheet, 'X7.v') === 'Ghi chú' &&
    get(workSheet, 'Y7.v') === 'Thời gian giao' &&
    get(workSheet, 'Z7.v') === 'ID tỉnh' &&
    get(workSheet, 'AA7.v') === 'Mã tỉnh' &&
    get(workSheet, 'AB7.v') === 'Mã huyện' &&
    get(workSheet, 'AC7.v') === 'Mã xã'
  );
}

const BKRowSchema = yup.object().shape({
  'Hàng hóa, dịch vụ': yup.string().required(`Trường "Hàng hóa, dịch vụ" không được để trống`),
  'Hàng hóa, dịch vụ chưa thuế': yup.number().required(`Trường "Hàng hóa, dịch vụ chưa thuế" chưa đúng định dạng`),
  'Khoản mục chi phí': yup.string().required(`Trường "Khoản mục chi phí" không được để trống`),
  'Ký hiệu hóa đơn': yup.string().required(`Trường "Ký hiệu hóa đơn" không được để trống`),
  'Link URL': yup
    .string()
    // .required(`Trường "Link URL" không được phép để trống`)
    // eslint-disable-next-line no-useless-escape
    .matches(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'link URL không hợp lệ'),
  'Mã số thuế người bán': yup.string().required(`Trường "Mã số thuế người bán" không được để trống`),
  'Mẫu hóa đơn': yup.string().required(`Trường "Mẫu hóa đơn" không được để trống`),
  'Ngày hóa đơn': yup.string().required(`Trường "Ngày hóa đơn" không được để trống`),
  'Phụ phí': yup.number().required(`Trường "Phụ phí" không đúng định dạng`),
  'Số hóa đơn': yup.string().required(`Trường "Số hóa đơn" không được để trống`),
  'Thuế GTGT': yup.number().required(`Trường "Thuế GTGT" không được để trống`),
  'Thuế suất': yup.number().required(`Trường "Thuế suất" không được để trống`),
  'Tên người bán': yup.string().required(`Trường "Tên người bán" không được để trống`),
  'Tổng cộng': yup.number().required(`Trường "Tổng cộng" không được để trống`),
});

const BKRowSchemaTaoDon = yup.object().shape({
  // 'Tên người nhận (*)': yup.string().required(`Trường "Hàng hóa, dịch vụ" không được để trống`),
  // 'Số ĐT người nhận (*)': yup.string().required(`Trường "Hàng hóa, dịch vụ chưa thuế" chưa đúng định dạng`),
  // 'Nhóm hàng hóa (*)': yup.string().required(`Trường "Khoản mục chi phí" không được để trống`),
  // 'Loại hàng hóa (*)': yup.string().required(`Trường "Ký hiệu hóa đơn" không được để trống`),
  // 'Tên hàng hóa (*)': yup.string().required(`Trường "Mã số thuế người bán" không được để trống`),
  // 'Trọng lượng (gram) (*)': yup.string().required(`Trường "Mẫu hóa đơn" không được để trống`),
  // 'Dịch vụ (*)': yup.string().required(`Trường "Ngày hóa đơn" không được để trống`),
  // 'Địa chỉ nhận (*)': yup.string().required(`Trường "Phụ phí" không đúng định dạng`),
  // 'Tỉnh đến (*)': yup.string().required(`Trường "Số hóa đơn" không được để trống`),
  // 'Quận/Huyện đến (*)': yup.string().required(`Trường "Thuế GTGT" không được để trống`),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateBKRow = (row: any): boolean => {
  try {
    BKRowSchema.validateSync(row);
  } catch (error) {
    toastError(error.message);
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateBKRowTaoDon = (row: any): boolean => {
  try {
    BKRowSchemaTaoDon.validateSync(row);
  } catch (error) {
    toastError(error.message);
    return false;
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformXlsxRowToBangKeItem(row: any): API.ITEMBK {
  if (isEmpty(row) || !isObject(row)) return {};
  const km = split(get(row, 'Khoản mục chi phí') || '', '-');
  return {
    AMOUNT: get(row, 'Hàng hóa, dịch vụ chưa thuế', ''),
    DESCR: get(row, 'Hàng hóa, dịch vụ', ''),
    KHOAN_MUC: get(km, '[0]', ''),
    KIHIEU_HD: get(row, 'Ký hiệu hóa đơn', ''),
    LINE_ITEM: get(row, '', `CG-${uuid()}`),
    MAU_HD: get(row, 'Mẫu hóa đơn', ''),
    MST: get(row, 'Mã số thuế người bán', ''),
    NGAY_HD: moment(get(row, 'Ngày hóa đơn'), 'DD/MM/YYYY').format('YYYYMMDD'),
    NGUOI_BAN: get(row, 'Tên người bán', ''),
    PHU_PHI: get(row, 'Phụ phí', ''),
    SO_HD: get(row, 'Số hóa đơn', ''),
    SUM_AMOUNT: get(row, 'Tổng cộng', ''),
    TAX: `${toNumber(get(row, 'Thuế suất', '')) * 100}%`,
    TAX_AMOUNT: get(row, 'Thuế GTGT', ''),
    TEN_KM: get(km, '[1]', ''),
    URL: get(row, 'Link URL', ''),
  };
}

// eslint-disable-next-line
export function transformXlsxRowToTaoDonItem(row: any): any {
  const SDT: string = get(row, 'Số ĐT người nhận (*)', '');
  const FWO_ID = get(row, 'Mã đơn hàng ', '');
  const COD = get(row, 'Tiền thu hộ COD (VND)', '');
  const VALUE = get(row, 'Giá trị hàng (VND)', '0');
  const WEIGHT = get(row, 'Trọng lượng (gram) (*)', '');

  const address: string = get(row, 'Địa chỉ nhận (*)', '');
  let street = '';
  if (address.indexOf(',') > 0) street = address.slice(0, address.indexOf(','));

  let dichVuCongThem: string = get(row, 'Dịch vụ cộng thêm ', '');
  const listDichVuCongThem: string[] = [];
  const index = 0;
  while (dichVuCongThem.length > 0) {
    if (dichVuCongThem.indexOf(' ') > 0) {
      listDichVuCongThem.push(dichVuCongThem.slice(index, dichVuCongThem.indexOf(' ')));
      dichVuCongThem = dichVuCongThem.replace(dichVuCongThem.slice(index, dichVuCongThem.indexOf(' ') + 1), '');
      //  index = dichVuCongThem.indexOf(" ") + 1;
    } else {
      listDichVuCongThem.push(dichVuCongThem.slice(index, dichVuCongThem.length));
      dichVuCongThem = dichVuCongThem.replace(dichVuCongThem.slice(index, dichVuCongThem.length), '');
      //  index = dichVuCongThem.length;
    }
  }
  const service = {
    SERVICE_TYPE: get(row, 'Dịch vụ (*)', ''), // chuyen sang ma
    QUANTITY_OF_PACKAGE: '1',
    QUANTITY_OF_UNIT: 'ST',
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nhomHangHoa = filter(nhomHangHoaList, (item: any) => {
    return item.label === get(row, 'Nhóm hàng hóa (*)', '');
  })[0];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loaiHangHoa = filter(loaiHangHoaList, (item: any) => {
    return item.label === get(row, 'Loại hàng hóa (*)', '');
  })[0];

  const item = {
    Width: get(row, 'Rộng (cm)', ''),
    COMMODITY_CODE: get(loaiHangHoa, 'id', ''),
    COMMODITY_TYPE: get(nhomHangHoa, 'id', ''),
    PACKAGE_TYPE: '',
    QUANTITY_OF_UNIT: 'EA',
    GOODS_VALUE: VALUE,
    GROSS_WEIGHT: WEIGHT,
    Length: get(row, 'Dài (cm)', ''),
    Hight: get(row, 'Cao (cm)', ''),
    PACKAGING_MATERIAL: '',
    QUANTITY_OF_PACKAGE: get(row, 'Số lượng', ''),
    Description: get(row, 'Tên hàng hóa (*)', ''),
    NET_WEIGHT_OF_UNIT: '',
    Currency: 'VND',
    GROSS_WEIGHT_OF_UNIT: 'G',
    Flag: '',
    COD: COD,
    NET_WEIGHT: '',
    NHOM_HANG_HOA: get(row, 'Nhóm hàng hóa (*)', ''),
    LOAI_HANG_HOA: get(row, 'Loại hàng hóa (*)', ''),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listDonHang: any[] = [];
  listDonHang.push(item);
  listDonHang.push(service);

  for (let index = 0; index < listDichVuCongThem.length; index++) {
    listDonHang.push({
      SERVICE_TYPE: listDichVuCongThem[index], // chuyen sang ma
      QUANTITY_OF_PACKAGE: '1',
      QUANTITY_OF_UNIT: 'ST',
    });
  }
  const SoTT = get(row, 'STT', '');

  return {
    STT: SoTT.toString(),
    ID: get(row, 'Id', ''),
    FWO: FWO_ID.toString(),
    ADDRESS_CONSIG: get(row, 'Địa chỉ nhận (*)', ''),
    ADDRESS_OP: '',
    ADDRESS_SHIPPER: '',
    BUYERS_REFERENCE_NUMBER: '',
    CAMPAIGN: '',
    CITY_DES: get(row, 'ID tỉnh', ''),
    CITY_SRC: get(row, 'CITY_SRC', ''),
    CONSIGNEE: get(row, 'Mã KH', '') === '' ? '9999999999' : get(row, 'Mã KH', ''),
    COUNTRY_DES: 'VN',
    COUNTRY_SRC: get(row, 'COUNTRY_SRC', ''),
    CUS_ID: '',
    DISTRICT_DES: get(row, 'Mã huyện', ''),
    DISTRICT_SRC: get(row, 'DISTRICT_SRC', ''),
    EMAIL_CONSIG: '',
    EMAIL_OP: '',
    EMAIL_SHIPPER: '',
    FREIGH_TERM:
      get(row, 'Người trả cước', '') === '' ? '' : get(row, 'Người trả cước', '') === 'Người gửi trả' ? 'F1' : 'F2',
    HOUSE_ID_SRC: '',
    HOUSE_ID_DES: '',
    ITEM: listDonHang,
    LOCATION_ID_SRC: '',
    MOVEMENT_TYPE:
      get(row, 'Địa điểm giao nhận hàng', 'Giao nhận hàng tại nhà') === 'Giao nhận hàng tại nhà' ? 'ZDD' : 'ZPP',
    NAME_CONSIG: get(row, 'Tên người nhận (*)', ''),
    NAME_OP: '',
    NAME_SHIPPER: '',
    NOTE: get(row, 'Ghi chú', ''),
    OLD_CAMPAIGN_ID: 0,
    ORDERING_PARTY: '',
    ORDER_TYPE: 'V001',
    PHONE_CONSIG: SDT.split(' ').join(''),
    PHONE_OP: '',
    PHONE_SHIPPER: '',
    POSTAL_CODE_DES: '',
    POSTAL_CODE_SRC: '',
    REQUEST_PICK_DATE: null,
    REQUEST_DELIV_DATE: get(row, 'Thời gian giao', 'Cả ngày'),
    SALE_OFFICE: get(row, 'POSTOFFICE', ''),
    SHIPPER: '',
    SOURCE_TYPE: '03',
    STREET_NAME_DES: street,
    STREET_NAME_SRC: get(row, 'STREET_SRC', ''),
    TEL_DES: SDT.split(' ').join(''),
    TEL_SRC: '',
    TRANSPORTATION_MODE: '01',
    WARD_DES: get(row, 'Mã xã', ''),
    WARD_SRC: '',
    NGUOI_TRA_CUOC: get(row, 'Người trả cước', ''),
    FILE_NAME: get(row, 'FileName', ''),
    STATUS: 'LOADING...',
    errorMes: '',
    DATE_IMPORT: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    POSTOFFICE: get(row, 'POSTOFFICE', ''),
    BPCode: '',
    TOTAL_ORDER: 0,
    AMOUNT_ITEM: '',
  };
}
export function formatNumber(value: number): string {
  let str = numeral(value).format('0,0');
  const newchar = '.';
  str = str.split(',').join(newchar);
  return str;
}

export function getValueOfNumberFormat(value: string): string {
  if (isNaN(parseFloat(value))) {
    return value;
  } else {
    return numeral(value)
      .value()
      .toString();
  }
}

export function numberFormatDecimal(value: string): string {
  return numeral(toNumber(value)).format('0.0,0');
}

export function numberFormat(value: string): string {
  return numeral(toNumber(value)).format('0,0');
}

export const getAddressNameById = (id: string, data: VtpAddress[]): string => {
  return get(find(data, { I: id }), 'N', '');
};

export function sleep(ms: number): Promise<unknown> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const badgeFicoStateMap = ['Tạo mới', 'Chờ phê duyệt', 'Đã phê duyệt', 'Duyệt 1 phần', 'Từ chối'];

export const detailBangkeFicoStateMap = ['Tạo mới', 'Chờ phê duyệt', 'Đã phê duyệt', 'Từ chối phê duyệt'];

export const pageItemsDefault = '20';

export function getPageItems(): string {
  return parse_query_string('pageitems', pageItemsDefault);
}
