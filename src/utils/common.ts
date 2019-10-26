import { get, isEmpty, isObject } from 'lodash';
import numeral from 'numeral';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformXlsxRowToBangKeItem(row: any): API.ITEMBK {
  if (isEmpty(row) || !isObject(row)) return {};
  return {
    AMOUNT: get(row, 'Hàng hóa, dịch vụ chưa thuế', ''),
    DESCR: get(row, 'Hàng hóa, dịch vụ', ''),
    KHOAN_MUC: get(row, 'Khoản mục chi phí', ''),
    KIHIEU_HD: get(row, 'Ký hiệu hóa đơn', ''),
    LINE_ITEM: get(row, '', ''),
    MAU_HD: get(row, 'Mẫu hóa đơn', ''),
    MST: get(row, 'Mã số thuế người bán', ''),
    NGAY_HD: get(row, 'Ngày hóa đơn', ''),
    NGUOI_BAN: get(row, 'Tên người bán', ''),
    PHU_PHI: get(row, 'Phụ phí', ''),
    SO_HD: get(row, 'Số hóa đơn', ''),
    SUM_AMOUNT: get(row, 'Tổng cộng', ''),
    TAX: get(row, 'Thuế suất', ''),
    TAX_AMOUNT: get(row, 'Thuế GTGT', ''),
    URL: get(row, '', ''),
  };
}

export function formatNumber(value: number): string {
  let str = numeral(value).format('0,0');
  const newchar = '.';
  str = str.split(',').join(newchar);
  return str;
}
