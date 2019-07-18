/* eslint-disable max-lines */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { FormEvent, useState } from 'react';
import * as yup from 'yup';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { find, get } from 'lodash';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { action_MIOA_ZTMI012 } from 'redux/MIOA_ZTMI012/actions';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import ShowFormLocation from './ShowFormLocation';

// eslint-disable-next-line max-lines-per-function
const PhieuGuiTrongNuoc: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    phuPhi: yup
      .number()
      .min(0, 'Vui lòng nhập số lớn hơn 0')
      .typeError('Vui lòng nhập định dạng số'),
    maKhachHang: yup.string().required('Vui lòng nhập mã khách hàng'),
    dienThoaiSender: yup.string().required('Vui lòng nhập số điện thoại'),
    hoTenSender: yup.string().required('Vui lòng nhập họ tên'),
    diaChiSender: yup.string().required('Vui lòng nhập địa chỉ'),
    dienThoaiReceiver: yup.string().required('Vui lòng nhập số điện thoại'),
    hoTenReceiver: yup.string().required('Vui lòng nhập họ tên'),
    diaChiReceiver: yup.string().required('Vui lòng nhập địa chỉ'),
    tenHang: yup.string().required('Vui lòng nhập tên hàng hóa'),
    soLuong: yup
      .number()
      .required('Vui lòng nhập số lượng')
      .min(0, 'Vui lòng nhập số lớn hơn 0')
      .typeError('Vui lòng nhập định dạng số')
      .integer('Vui lòng nhập số nguyên'),
    giaTri: yup
      .number()
      .min(0, 'Vui lòng nhập số lớn hơn 0')
      .typeError('Vui lòng nhập định dạng số'),
    tienThuHo: yup
      .number()
      .min(0, 'Vui lòng nhập số lớn hơn 0')
      .typeError('Vui lòng nhập định dạng số'),
    trongLuong: yup
      .number()
      .required('Vui lòng nhập trọng lượng')
      .min(0, 'Vui lòng nhập số lớn hơn 0')
      .typeError('Vui lòng nhập định dạng số'),
    kichThuocDai: yup
      .number()
      .min(0, 'Vui lòng nhập số lớn hơn 0')
      .typeError('Vui lòng nhập định dạng số'),
    kichThuocRong: yup
      .number()
      .min(0, 'Vui lòng nhập số lớn hơn 0')
      .typeError('Vui lòng nhập định dạng số'),
    kichThuocCao: yup
      .number()
      .min(0, 'Vui lòng nhập số lớn hơn 0')
      .typeError('Vui lòng nhập định dạng số'),
    tongTien: yup
      .number()
      .min(0, 'Vui lòng nhập số lớn hơn 0')
      .typeError('Vui lòng nhập định dạng số'),
    // maKhuyenMai: yup.string().required('Vui lòng nhập '),
    // thoiGianPhat: yup.string().required('Vui lòng nhập '),
    soLuongTach: yup
      .number()
      .min(0, 'Vui lòng nhập số lớn hơn 0')
      .typeError('Vui lòng nhập định dạng số')
      .integer('Vui lòng nhập số nguyên'),
  });

  //________when submit button clicked, enable input focus to validate
  const [isSubmit, setIsSubmit] = useState(false);
  //________hook to trigger input focus validating
  const [count, setCount] = useState(0);
  //________Yup errors list after executing validating
  const [errors, setErrors] = useState<yup.ValidationError[]>([]);
  //________return corresponding error according to field name
  function handleErrorMessage(errors: yup.ValidationError[], errorName: string): string | undefined {
    return get(
      find(errors, (item: yup.ValidationError): boolean => {
        return item.path === errorName;
      }),
      'message',
    );
  }
  //__________________________________________________________
  const [phuPhi, setPhuPhi] = useState<string>('0.00');
  const [maKhachHang, setMaKhachHang] = useState<string>('9999999999');
  const [dienThoaiSender, setDienThoaiSender] = useState<string>('');
  const [hoTenSender, setHoTenSender] = useState<string>('');
  const [diaChiSender, setDiaChiSender] = useState<string>('');
  const [dienThoaiReceiver, setDienThoaiReceiver] = useState<string>('');
  const [hoTenReceiver, setHoTenReceiver] = useState<string>('');
  const [diaChiReceiver, setDiaChiReceiver] = useState<string>('');
  const [tenHang, setTenHang] = useState<string>('');
  const [soLuong, setSoLuong] = useState<string>('');
  const [giaTri, setGiaTri] = useState<string>('');
  const [tienThuHo, setTienThuHo] = useState<string>('');
  const [trongLuong, setTrongLuong] = useState<string>('');
  const [kichThuocDai, setKichThuocDai] = useState<string>('');
  const [kichThuocRong, setKichThuocRong] = useState<string>('');
  const [kichThuocCao, setKichThuocCao] = useState<string>('');
  const [tongTien, setTongtien] = useState<string>('');
  const [maKhuyenMai, setMaKhuyenMai] = useState<string>('');
  const [thoiGianPhat, setThoiGianPhat] = useState<Date>(new Date());
  const [soLuongTach, setSoLuongTach] = useState<string>('');
  //_____non-validated items
  const [maPhieuGui] = useState<string>('');
  const [phuongThucVanChuyen, setPhuongThucVanChuyen] = useState<string>('VCN');
  const [dichVuCongThem, setDichVuCongThem] = useState<string>('dongKiem');
  const [loaiHangHoa, setLoaiHangHoa] = useState<string>('hangHoa');
  const [nguoiThanhToan, setNguoiThanhToan] = useState<string>('PP');
  const [choXemHang, setChoXemHang] = useState<string>('choXem');
  const [diemGiaoNhan, setDiemGiaoNhan] = useState<string>('giaoTaiNha');
  const [ghiChu, setGhiChu] = useState<string>('');

  const data = {
    phuPhi,
    maKhachHang,
    dienThoaiSender,
    hoTenSender,
    diaChiSender,
    dienThoaiReceiver,
    hoTenReceiver,
    diaChiReceiver,
    tenHang,
    soLuong,
    giaTri,
    tienThuHo,
    trongLuong,
    kichThuocDai,
    kichThuocRong,
    kichThuocCao,
    tongTien,
    maKhuyenMai,
    thoiGianPhat,
    soLuongTach,
    //_____non-validated items
    maPhieuGui: '1',
    phuongThucVanChuyen,
    dichVuCongThem,
    loaiHangHoa,
    nguoiThanhToan,
    choXemHang,
    diemGiaoNhan,
  };

  React.useEffect((): void => {
    if (isSubmit) {
      schema
        .validate(data, { abortEarly: false })
        .then((): void => setErrors([]))
        .catch((error: yup.ValidationError): void => {
          setErrors(error.inner);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
      // check validate
      if (isSubmit) {
        setCount(count + 1);
      }
    };
  }

  function handleChangeDeliveryTime(date: Date): void {
    setThoiGianPhat(date);
    // check validate
    if (isSubmit) {
      setCount(count + 1);
    }
  }

  // eslint-disable-next-line max-lines-per-function
  function handleSaveForwardingOrder(): void {
    const payload = {
      ORDER_TYPE: 'V001',
      BUYERS_REFERENCE_NUMBER: maPhieuGui,
      SALE_ORG: null,
      SALE_OFFICE: null,
      SOURCE_TYPE: '50000119', // nguồn tạo từ APP/Web hoặc từ ecommerce
      FWO_NO: null,
      ORDERING_PARTY: '306', // Mã đối tác sử dụng dịch vụ
      NAME_OP: hoTenSender,
      ADDRESS_OP: diaChiSender,
      PHONE_OP: dienThoaiSender,
      EMAIL_OP: null,
      Shipper: '2', // Người gửi hàng- mã BP
      NAME_SHIPPER: null,
      ADDRESS_SHIPPER: null,
      PHONE_SHIPPER: null,
      EMAIL_SHIPPER: null,
      Consignee: '306', // Người nhận hàng
      NAME_CONSIG: hoTenReceiver,
      ADDRESS_CONSIG: diaChiReceiver,
      PHONE_CONSIG: dienThoaiReceiver,
      EMAIL_CONSIG: null,
      VAT_NO_PAYER: null, // Mã số thuế đối tác sử dụng
      MOVEMENT_TYPE: 'ZDD', // Loại hình gia nhận hàng hóa  ZDD: Điểm đến điểm,  ZDP: Điểm đến bưu cục, ZPD: Bưu cục đến điểm, ZPP: Bưu cục đến bưu cục
      POSTAL_CODE_SRC: null, // Mã thành phố trong trường hợp khách hàng vãng lai – nếu is null then default is 1000
      TEL_SRC: dienThoaiSender,
      COUNTRY_SRC: null, // Mã đất nước gửi trong trường hợp khách hàng vãng lai
      CITY_SRC: null, // trong trường hợp khách hàng vãng lai
      DISTRICT_SRC: null, // trong trường hợp khách hàng vãng lai // trong trường hợp khách hàng vãng lai
      WARD_SRC: null, // trong trường hợp khách hàng vãng lai
      STREET_NAME_SRC: null, // trong trường hợp khách hàng vãng lai
      HOUSE_ID_SRC: null, // trong trường hợp khách hàng vãng lai
      POSTAL_CODE_DES: null, // Mã thánh phố nhận trong trường hợp khách hàng vãng lai
      TEL_DES: dienThoaiReceiver,
      COUNTRY_DES: null, // nhận trong trường hợp khách hàng vãng lai
      CITY_DES: null, // nhận trong trường hợp khách hàng vãng lai
      DISTRICT_DES: null, // nhận trong trường hợp khách hàng vãng lai
      FLAG_HEADER: '',
      PromoCode: maKhuyenMai,
      VOUCHER_ID: null,
      Campaign: null,
      Disctype: null,
      Description: null,
      WARD_DES: '307', // Mã xã phường nhận trong trường hợp vãng lai
      STREET_NAME_DES: 'test', // Địa chỉ nhận trong trường hợp vãng lai
      LOCATION_ID_SRC: null,
      LOCATION_ID_DES: null,
      REQUEST_PICK_DATE: null,
      CONFIRM_PICK_DATE: null,
      REQUEST_DELIV_DATE: null,
      CONFIRM_DELIV_DATE: null,
      FREIGH_TERM: nguoiThanhToan,
      CUS_ID: null, // Mã user trên hệ thống APP/Web
      Item: [
        {
          Flag: null, // I : insert, U: Update, D: delete, trong trường hợp tạo mới đơn thì không cần truyền
          PACKAGING_MATERIAL: null, // Package_id trong trường hợp update thì truyền vào, trong trường hợp tạo mới đơn thì không cần truyền
          Description: tenHang,
          PACKAGE_TYPE: null, // Loại vật liệu đóng gói lấy từ danh mục  V01: Hộp, V02 : Túi, V03: Bọc chống sốc, V04: Bọc xốp, V99 : các loại các
          QUANTITY_OF_PACKAGE: '1', // Số lượng package, luôn là 1
          QUANTITY_OF_UNIT: 'EA', // Đơn vị bưu gửi, luôn là EA
          GROSS_WEIGHT: trongLuong,
          GROSS_WEIGHT_OF_UNIT: 'g',
          NET_WEIGHT: '100',
          NET_WEIGHT_OF_UNIT: 'g',
          Length: kichThuocDai,
          Hight: kichThuocCao,
          Width: kichThuocRong,
          Note: ghiChu,
          GOODS_VALUE: giaTri,
          Currency: 'VND',
          COMODITY_CODE: loaiHangHoa,
          COD: tienThuHo,
          SERVICE_TYPE: phuongThucVanChuyen,
        },
      ],
      LanguageId: null,
      LanguageDefaultId: null,
    };
    // if (!window.confirm('Bạn có chắc chắn?')) return;
    dispatch(
      action_MIOA_ZTMI012(payload, {
        onFailure: (error: HttpRequestErrorType): void => {
          console.log(error);
        },
        onSuccess: (): void => {
          console.log('Api success!!!');
        },
      }),
    );
  }

  function handleValidate(e: FormEvent): void {
    e.preventDefault();
    setIsSubmit(true);
    // check validate
    schema
      .validate(data, { abortEarly: false })
      .then((): void => {
        setErrors([]);
        handleSaveForwardingOrder();
      })
      .catch((error: yup.ValidationError): void => {
        setErrors(error.inner);
      });
  }

  function renderSendingCoupon(): JSX.Element {
    return (
      <Row className="sipSendingCoupon sipContentContainer no-padding">
        <Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">
              {t('Cước chính')}
              {t('HYPHEN', ':')}
            </Col>
            <Col xs="7" className="text-semibold">
              12.000 đ
            </Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">
              {t('Cước cộng thêm')}
              {t('HYPHEN', ':')}
            </Col>
            <Col xs="7" className="text-semibold">
              2.000 đ
            </Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">
              {t('Phụ phí khác')}
              {t('HYPHEN', ':')}
            </Col>
            <Col xs="7">
              <Input type="text" defaultValue={phuPhi} onChange={handleChangeTextboxValue(setPhuPhi)} />
              <div className="sipInputItemError">{handleErrorMessage(errors, 'phuPhi')}</div>
            </Col>
          </Row>
        </Row>
        <div className="sipLine row" />
        <Row>
          <Row className="sipSendingCouponItem mb-3">
            <Col xs="6">{t('Tổng cước')}</Col>
            <Col xs="6" className="color-orange text-semibold">
              29.000 đ
            </Col>
          </Row>
        </Row>
      </Row>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderSenderInput(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Người gửi')}</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Mã khách hàng')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập mã khách hàng')}
              onChange={handleChangeTextboxValue(setMaKhachHang)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'maKhachHang')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Điện thoại')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập số điện thoại')}
              onChange={handleChangeTextboxValue(setDienThoaiSender)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'dienThoaiSender')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Họ tên')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder={t('Nhập họ tên')} onChange={handleChangeTextboxValue(setHoTenSender)} />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'hoTenSender')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Địa chỉ
            <span className="color-red"> *</span>
          </Label>
          <Col Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập địa chỉ (tên đường, ngõ, hẻm, số nhà)')}
              onChange={handleChangeTextboxValue(setDiaChiSender)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'diaChiSender')}</div>
            <p className="sipInputItemDescription">
              ({t('Nếu bạn không tìm thấy địa chỉ gợi ý')}, <ShowFormLocation />
              {t('để tự nhập')})
            </p>
          </Col>
        </Row>
      </div>
    );
  }

  // function renderReceiverAddress(): JSX.Element {
  //   return (
  //     <Row className="sipInputItemGroup">
  //       <Col xs="12" md="4" className="mb-2">
  //         <Input type="select">
  //           <option>{t('Tỉnh')}</option>
  //           <option>2</option>
  //           <option>3</option>
  //         </Input>
  //       </Col>
  //       <Col xs="12" md="4" className="mb-2">
  //         <Input type="select">
  //           <option>{t('Quận/huyện')}</option>
  //           <option>2</option>
  //           <option>3</option>
  //         </Input>
  //       </Col>
  //       <Col xs="12" md="4" className="mb-2">
  //         <Input type="select">
  //           <option>{t('Phường/xã')}</option>
  //           <option>2</option>
  //           <option>3</option>
  //         </Input>
  //       </Col>
  //     </Row>
  //   );
  // }

  // eslint-disable-next-line max-lines-per-function
  function renderReceiverInput(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Người nhận')}</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Điện thoại')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập số điện thoại')}
              onChange={handleChangeTextboxValue(setDienThoaiReceiver)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'dienThoaiReceiver')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Họ tên')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nguyễn Văn Nam')}
              onChange={handleChangeTextboxValue(setHoTenReceiver)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'hoTenReceiver')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem mb-0">
          <Label xs="12" lg="4">
            {t('Địa chỉ')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập địa chỉ (tên đường, ngõ, hẻm, số nhà)')}
              onChange={handleChangeTextboxValue(setDiaChiReceiver)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'diaChiReceiver')}</div>
            <p className="sipInputItemDescription">
              ({t('Nếu bạn không tìm thấy địa chỉ gợi ý')}, <ShowFormLocation />
              {t('để tự nhập')})
            </p>
          </Col>
        </Row>
      </div>
    );
  }

  function renderSendingServices(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Dịch vụ')}</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Chọn dịch vụ')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="select" onChange={handleChangeTextboxValue(setPhuongThucVanChuyen)}>
              <option value="VCN">VCN Chuyển phát nhanh</option>
              <option value="VHT">Chuyển phát hỏa tốc</option>
            </Input>
          </Col>
        </Row>
      </div>
    );
  }

  function renderAdditionalServices(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>
          {t('Dịch vụ cộng thêm')}
          <Button className="sipFlatBtn pull-right text-normal">
            {t('Xem bảng giá')}
            <i className="fa fa-angle-right ml-1 fa-lg" />
          </Button>
        </h3>
        <Row className="sipInputItem">
          <Label check xl="4" md="6" xs="12" className="pt-0 pb-0 mb-3">
            <Input type="checkbox" value="BH" onChange={handleChangeTextboxValue(setDichVuCongThem)} />
            <span className="font-xs">Bảo hiểm</span>
          </Label>
          <Label check xl="4" md="6" xs="12" className="pt-0 pb-0 mb-3">
            <Input type="checkbox" value="DK" onChange={handleChangeTextboxValue(setDichVuCongThem)} defaultChecked />
            <span className="font-xs">Đồng kiểm</span>
          </Label>
          <Label check xl="4" md="6" xs="12" className="pt-0 pb-0 mb-3">
            <Input type="checkbox" value="GHG" onChange={handleChangeTextboxValue(setDichVuCongThem)} />
            <span className="font-xs">Giao hẹn giờ</span>
          </Label>
          <Label check xl="4" md="6" xs="12" className="pt-0 pb-0 mb-3">
            <Input type="checkbox" value="HV" onChange={handleChangeTextboxValue(setDichVuCongThem)} />
            <span className="font-xs">Giá trị cao</span>
          </Label>
          <Label check xl="4" md="6" xs="12" className="pt-0 pb-0 mb-3">
            <Input type="checkbox" value="Other" onChange={handleChangeTextboxValue(setDichVuCongThem)} />
            <span className="font-xs">Khác</span>
          </Label>
        </Row>
      </div>
    );
  }

  function renderSendingCouponInfo(): JSX.Element {
    return (
      <Col xl="6" xs="12">
        <div className="sipContentContainer">
          <div className="sipInputBlock">
            <h3>{t('Thông tin phiếu gửi')}</h3>
            <Row className="sipInputItem">
              <Label xs="12" lg="4">
                {t('Mã phiếu gửi')}
              </Label>
              <Col lg="8">
                <Input type="text" />
              </Col>
            </Row>
          </div>
          {renderSenderInput()}
          {renderReceiverInput()}
          {renderSendingServices()}
          {renderAdditionalServices()}
        </div>
      </Col>
    );
  }

  function renderPackageSize(): JSX.Element {
    return (
      <Row className="sipInputItemGroup">
        <Col xs="12" md="4" className="mb-2">
          <Input type="text" placeholder={t('Dài (cm)')} onChange={handleChangeTextboxValue(setKichThuocDai)} />
          <div className="sipInputItemError">{handleErrorMessage(errors, 'kichThuocDai')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input type="text" placeholder={t('Rộng (cm)')} onChange={handleChangeTextboxValue(setKichThuocRong)} />
          <div className="sipInputItemError">{handleErrorMessage(errors, 'kichThuocRong')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input type="text" placeholder={t('Cao (cm)')} onChange={handleChangeTextboxValue(setKichThuocCao)} />
          <div className="sipInputItemError">{handleErrorMessage(errors, 'kichThuocCao')}</div>
        </Col>
      </Row>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderPackageInfoDetail(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Thông tin hàng hóa')}</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Loại hàng')}
          </Label>
          <Col lg="4" xs="6">
            <Label check xs="12" className="pl-0 pr-0">
              <Input
                type="radio"
                value="V99"
                name="packageType"
                defaultChecked
                onChange={handleChangeTextboxValue(setLoaiHangHoa)}
              />{' '}
              {t('Hàng hóa')}
            </Label>
          </Col>
          <Col lg="4" xs="6">
            <Label check xs="12" className="pl-0 pr-0">
              <Input type="radio" value="V04" name="packageType" onChange={handleChangeTextboxValue(setLoaiHangHoa)} />{' '}
              {t('Thư')}
            </Label>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Tên hàng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder={t('Nội dung hàng hoá')} onChange={handleChangeTextboxValue(setTenHang)} />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'tenHang')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Số lượng')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder={t('Số lượng')} onChange={handleChangeTextboxValue(setSoLuong)} />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'soLuong')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Giá trị & thu hộ')}
          </Label>
          <Col lg="8">
            <Row className="sipInputItemGroup">
              <Col xs="12" md="6" className="mb-2">
                <Input type="text" placeholder={t('Nhập giá trị (đ)')} onChange={handleChangeTextboxValue(setGiaTri)} />
                <div className="sipInputItemError">{handleErrorMessage(errors, 'giaTri')}</div>
              </Col>
              <Col xs="12" md="6" className="mb-2">
                <Input
                  type="text"
                  placeholder={t('Nhập tiền thu hộ (đ)')}
                  onChange={handleChangeTextboxValue(setTienThuHo)}
                />
                <div className="sipInputItemError">{handleErrorMessage(errors, 'tienThuHo')}</div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Trọng lượng')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập  trọng lượng (g)')}
              onChange={handleChangeTextboxValue(setTrongLuong)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'trongLuong')}</div>
            <p className="sipInputItemDescription text-right">
              Trọng lượng quy đổi: &nbsp;
              <span className="text-semibold color-bluegreen font-italic">500g</span>
            </p>
          </Col>
        </Row>
        <Row className="sipInputItem mb-0">
          <Label xs="12" lg="4">
            {t('Kích thước')}
          </Label>
          <Col lg="8">{renderPackageSize()}</Col>
        </Row>
      </div>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderFeePayment(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Tiền phải thu & thanh toán cước')}</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Tổng tiền phải thu')}
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập số tiền phải thu (đ)')}
              onChange={handleChangeTextboxValue(setTongtien)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'tongTien')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Mã khuyến mãi')}
          </Label>
          <Col lg="8">
            <Input type="text" placeholder={t('Mã khuyến mãi')} onChange={handleChangeTextboxValue(setMaKhuyenMai)} />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'maKhuyenMai')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Thanh toán cước')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="4" xs="6">
            <Label check xs="12" className="pl-0 pr-0">
              <Input
                type="radio"
                value="PP"
                name="payer"
                defaultChecked
                onChange={handleChangeTextboxValue(setNguoiThanhToan)}
              />{' '}
              {t('Người gửi')}
            </Label>
          </Col>
          <Col lg="4" xs="6">
            <Label check xs="12" className="pl-0 pr-0">
              <Input type="radio" value="CC" name="payer" onChange={handleChangeTextboxValue(setNguoiThanhToan)} />{' '}
              {t('Người nhận')}
            </Label>
          </Col>
        </Row>
      </div>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderDeliveryRequirement(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Yêu cầu giao bưu gửi')}</h3>
        <Row className="sipInputItem">
          <Col lg="6" xs="12">
            <Label check xs="12" className="pl-0 pr-0">
              <Input
                type="radio"
                name="deliveryRequirement"
                value="choXem"
                defaultChecked
                onChange={handleChangeTextboxValue(setChoXemHang)}
              />{' '}
              {t('Cho khách xem hàng')}
            </Label>
          </Col>
          <Col lg="6" xs="12">
            <Label check xs="12" className="pl-0 pr-0">
              <Input
                type="radio"
                name="deliveryRequirement"
                value="khongChoXem"
                onChange={handleChangeTextboxValue(setChoXemHang)}
              />{' '}
              {t('Không cho khách xem hàng')}
            </Label>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Thời gian phát')}
          </Label>
          <Col lg="8">
            <DatePicker
              placeholderText={t('Nhập thời gian')}
              className="form-control"
              selected={thoiGianPhat}
              onChange={handleChangeDeliveryTime}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'thoiGianPhat')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Điểm giao nhận')}
          </Label>
          <Col lg="8">
            <Input type="select" onChange={handleChangeTextboxValue(setDiemGiaoNhan)}>
              <option value="giaoTaiNha">Giao, gửi hàng tại nhà</option>
              <option value="giaoChua">Giao ở chùa</option>
            </Input>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Ghi chú khác')}
          </Label>
          <Col lg="8">
            <Input type="text" onChange={handleChangeTextboxValue(setGhiChu)} placeholder={t('Nhập ghi chú')} />
          </Col>
        </Row>
      </div>
    );
  }

  function renderSplitPackage(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>{t('Tách kiện')}</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Số lượng tách')}
          </Label>
          <Col lg="8">
            <Row className="sipInputItemGroup">
              <Col xs="12" md="6" className="mb-2">
                <Input type="text" onChange={handleChangeTextboxValue(setSoLuongTach)} />
                <div className="sipInputItemError">{handleErrorMessage(errors, 'soLuongTach')}</div>
              </Col>
              <Col xs="12" md="6" className="mb-2">
                <Button color="primary">{t('Tách kiện')}</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  function renderPackageInfo(): JSX.Element {
    return (
      <Col xl="6" xs="12">
        <div className="sipContentContainer">
          {renderPackageInfoDetail()}
          {renderFeePayment()}
          {renderDeliveryRequirement()}
          {renderSplitPackage()}
        </div>
      </Col>
    );
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Phiếu gửi trong nước')}</h1>
      </Row>
      {renderSendingCoupon()}
      <Row className="mb-3">
        {renderSendingCouponInfo()}
        {renderPackageInfo()}
      </Row>
      <div className="display-block sipTitleRightBlock text-right">
        <Button>
          <i className="fa fa-refresh" />
          Làm mới
        </Button>
        <Button onClick={handleValidate}>
          <i className="fa fa-download" />
          Ghi lại
        </Button>
      </div>
    </>
  );
};

export default PhieuGuiTrongNuoc;
