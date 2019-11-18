import moment from 'moment';
import numeral from 'numeral';
import { WorkSheet } from 'xlsx';
import uuid from 'uuid';
import * as yup from 'yup';
import { find, get, isEmpty, isObject, split, toNumber } from 'lodash';
import parse_query_string from './parse_query_string';
import { toastError } from '../components/Toast';

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

const BKRowSchema = yup.object().shape({
  'Hàng hóa, dịch vụ': yup.string().required(`Trường "Hàng hóa, dịch vụ" không được để trống`),
  'Hàng hóa, dịch vụ chưa thuế': yup.number().required(`Trường "Hàng hóa, dịch vụ chưa thuế" chưa đúng định dạng`),
  'Khoản mục chi phí': yup.string().required(`Trường "Khoản mục chi phí" không được để trống`),
  'Ký hiệu hóa đơn': yup.string().required(`Trường "Ký hiệu hóa đơn" không được để trống`),
  'Link URL': yup
    .string()
    .required(`Trường "Link URL" không được để trống`)
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
