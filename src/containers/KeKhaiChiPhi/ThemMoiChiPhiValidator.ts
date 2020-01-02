import * as yup from 'yup';

export const schema = yup.object().shape({
  URL: yup
    .string()
    // eslint-disable-next-line no-useless-escape
    .matches(
      /^(|https?:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)$/,
      'URL không hợp lệ',
    ),
  TAX_AMOUNT: yup.string().required('Thuế GTGT không được để trống'),
  TAX: yup.string().required('Thuế suất không được để trống'),
  // PHU_PHI: yup.string().required('Phụ phí không được để trống'), // bỏ require cho phụ phí, không nhập thì mặc định = 0
  AMOUNT: yup.string().required('Tiền hàng hóa không được để trống'),
  DESCR: yup
    .string()
    .required('Hàng hóa không được để trống')
    .max(250, 'Hàng hóa không được nhập quá 250 ký tự'),
  SO_HD: yup
    .string()
    .when('MST', {
      is: val => val !== '',
      then: yup.string().required('Số hóa đơn không được để trống'),
    })
    // .required('Số hóa đơn không được để trống')
    .max(7, 'Số hóa đơn không được nhập quá 7 ký tự'),
  NGAY_HD: yup.string().required('Ngày hợp đồng không được để trống'),
  KIHIEU_HD: yup
    .string()
    .when('MST', {
      is: val => val !== '',
      then: yup.string().required('Ký hiệu không được để trống'),
    })
    // .required('Ký hiệu không được để trống')
    .max(7, 'Ký hiệu không được nhập quá 7 ký tự'),
  MAU_HD: yup
    .string()
    .when('MST', {
      is: val => val !== '',
      then: yup.string().required('Mẫu hóa đơn không được để trống'),
    })
    // .required('Mẫu hóa đơn không được để trống')
    .max(11, 'Mẫu hóa đơn không được nhập quá 11 ký tự'),
  NGUOI_BAN: yup
    .string()
    .required('Tên người bán không được để trống')
    .max(120, 'Tên người bán không được nhập quá 120 ký tự'),
  MST: yup.string().max(14, 'MST không được nhập quá 14 kí tự'),
});
