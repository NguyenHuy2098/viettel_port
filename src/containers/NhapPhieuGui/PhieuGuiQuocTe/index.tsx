/* eslint-disable max-lines */
import React from 'react';
import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Button, Input, Col, Row, Label } from 'reactstrap';
import { find, get } from 'lodash';
import ShowFormLocation from './ShowFormLocation';

// eslint-disable-next-line max-lines-per-function
const InternationalForwardingOrder: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
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
    quocGiaReceiver: yup.string().required('Vui lòng nhập quốc gia'),
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
  const [maKhachHang, setMaKhachHang] = useState<string>('');
  const [dienThoaiSender, setDienThoaiSender] = useState<string>('');
  const [hoTenSender, setHoTenSender] = useState<string>('');
  const [diaChiSender, setDiaChiSender] = useState<string>('');
  const [dienThoaiReceiver, setDienThoaiReceiver] = useState<string>('');
  const [hoTenReceiver, setHoTenReceiver] = useState<string>('');
  const [diaChiReceiver, setDiaChiReceiver] = useState<string>('');
  const [quocGiaReceiver, setQuocGiaReceiver] = useState<string>('');
  const [tenHang, setTenHang] = useState<string>('');
  const [soLuong, setSoLuong] = useState<string>('');
  const [giaTri, setGiaTri] = useState<string>('');
  const [tienThuHo, setTienThuHo] = useState<string>('');
  const [trongLuong, setTrongLuong] = useState<string>('');
  const [kichThuocDai, setKichThuocDai] = useState<string>('');
  const [kichThuocRong, setKichThuocRong] = useState<string>('');
  const [kichThuocCao, setKichThuocCao] = useState<string>('');
  //_____non-validated items
  // const [maPhieuGui] = useState<string>('');

  const data = {
    phuPhi,
    maKhachHang: maKhachHang === '' ? '9999999999' : maKhachHang,
    dienThoaiSender,
    hoTenSender,
    diaChiSender,
    dienThoaiReceiver,
    hoTenReceiver,
    diaChiReceiver,
    quocGiaReceiver,
    tenHang,
    soLuong,
    giaTri,
    tienThuHo,
    trongLuong,
    kichThuocDai,
    kichThuocRong,
    kichThuocCao,
    //_____non-validated items
    maPhieuGui: '1',
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

  function handleValidate(e: FormEvent): void {
    e.preventDefault();
    setIsSubmit(true);
    // check validate
    schema
      .validate(data, { abortEarly: false })
      .then((): void => {
        setErrors([]);
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
            <Col xs="5">{t('Cước chính')}:</Col>
            <Col xs="7">12.000 đ</Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">{t('Cước cộng thêm')}:</Col>
            <Col xs="7">5.000 đ</Col>
          </Row>
          <Row className="sipSendingCouponItem">
            <Col xs="5">{t('Phụ phí')}:</Col>
            <Col xs="7">
              <Input type="text" defaultValue="0.00 đ" onChange={handleChangeTextboxValue(setPhuPhi)} />
              <div className="sipInputItemError">{handleErrorMessage(errors, 'phuPhi')}</div>
            </Col>
          </Row>
        </Row>
        {/*<Row>*/}
        {/*  <Row className="sipSendingCouponItem">*/}
        {/*    <Col xs="5">{t('Phí gia tăng')}:</Col>*/}
        {/*    <Col xs="7">0.00 đ</Col>*/}
        {/*  </Row>*/}
        {/*  <Row className="sipSendingCouponItem">*/}
        {/*    <Col xs="5">{t('Phí xăng dầu')}:</Col>*/}
        {/*    <Col xs="7">5.000 đ</Col>*/}
        {/*  </Row>*/}
        {/*  <Row className="sipSendingCouponItem">*/}
        {/*    <Col xs="5">VAT:</Col>*/}
        {/*    <Col xs="7">0.00 đ</Col>*/}
        {/*  </Row>*/}
        {/*</Row>*/}
        <div className="sipLine row" />
        <Row>
          <Row className="sipSendingCouponItem mb-3">
            <Col xs="6">{t('Tổng cước')}</Col>
            <Col xs="6" className="color-orange">
              29.000 đ
            </Col>
          </Row>
        </Row>
      </Row>
    );
  }

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
            Họ tên
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
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Quốc gia
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input
              type="text"
              placeholder={t('Nhập nước đến')}
              onChange={handleChangeTextboxValue(setQuocGiaReceiver)}
            />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'quocGiaReceiver')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Địa chỉ
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder={t('Nhập địa chỉ')} onChange={handleChangeTextboxValue(setDiaChiReceiver)} />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'diaChiReceiver')}</div>
          </Col>
        </Row>
      </div>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderSenderInput(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>Người gửi</h3>
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
              placeholder={t('Nhập số điện thoại ')}
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
            <Input type="text" placeholder={t('Họ tên')} onChange={handleChangeTextboxValue(setHoTenSender)} />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'hoTenSender')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Địa chỉ')}
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
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
            <Input type="select">
              <option value="VQE">VQE Quốc tế chuyên tuyến</option>
              <option value="VQE">VQE Quốc tế chuyên tuyến</option>
            </Input>
          </Col>
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
                <Input type="text" placeholder="" />
              </Col>
            </Row>
          </div>
          {renderSenderInput()}
          {renderReceiverInput()}
          {renderSendingServices()}
        </div>
      </Col>
    );
  }

  function renderPackageSize(): JSX.Element {
    return (
      <Row className="sipInputItemGroup">
        <Col xs="12" md="4" className="mb-2">
          <Input type="text" placeholder="Dài (cm)" onChange={handleChangeTextboxValue(setKichThuocDai)} />
          <div className="sipInputItemError">{handleErrorMessage(errors, 'kichThuocDai')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input type="text" placeholder="Rộng (cm)" onChange={handleChangeTextboxValue(setKichThuocRong)} />
          <div className="sipInputItemError">{handleErrorMessage(errors, 'kichThuocRong')}</div>
        </Col>
        <Col xs="12" md="4" className="mb-2">
          <Input type="text" placeholder="Cao (cm)" onChange={handleChangeTextboxValue(setKichThuocCao)} />
          <div className="sipInputItemError">{handleErrorMessage(errors, 'kichThuocCao')}</div>
        </Col>
      </Row>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderPackageInfo(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>Thông tin hàng hóa</h3>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            {t('Loại hàng')}
          </Label>
          <Col lg="4" xs="6">
            <Label check xs="12" className="pl-0 pr-0">
              <Input type="radio" value="V99" name="packageType" defaultChecked /> {t('Hàng hóa')}
            </Label>
          </Col>
          <Col lg="4" xs="6">
            <Label check xs="12" className="pl-0 pr-0">
              <Input type="radio" value="V04" name="packageType" /> {t('Thư')}
            </Label>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Tên hàng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nội dung hàng hóa" onChange={handleChangeTextboxValue(setTenHang)} />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'tenHang')}</div>
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
            Số lượng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập số lượng" onChange={handleChangeTextboxValue(setSoLuong)} />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'soLuong')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Trọng lượng
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập  trọng lượng (g)" onChange={handleChangeTextboxValue(setTrongLuong)} />
            <div className="sipInputItemError">{handleErrorMessage(errors, 'trongLuong')}</div>
          </Col>
        </Row>
        <Row className="sipInputItem mb-0">
          <Label xs="12" lg="4">
            Kích thước
            <span className="color-red"> *</span>
          </Label>
          <Col lg="8">{renderPackageSize()}</Col>
        </Row>
      </div>
    );
  }

  function renderDeliveryRequirement(): JSX.Element {
    return (
      <div className="sipInputBlock">
        <h3>Yêu cầu khi giao hàng</h3>
        <Row className="sipInputItem">
          <Col lg="6" xs="12">
            <Label check xs="12" className="pl-0 pr-0">
              <Input type="radio" name="deliveryRequirement" /> Cho khách xem hàng
            </Label>
          </Col>
          <Col lg="6" xs="12">
            <Label check xs="12" className="pl-0 pr-0">
              <Input type="radio" name="deliveryRequirement" /> Không cho khách xem hàng
            </Label>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Label xs="12" lg="4">
            Ghi chú khác
          </Label>
          <Col lg="8">
            <Input type="text" placeholder="Nhập ghi chú" />
          </Col>
        </Row>
      </div>
    );
  }

  function renderProductInfo(): JSX.Element {
    return (
      <Col xl="6" xs="12">
        <div className="sipContentContainer">
          {renderPackageInfo()}
          {renderDeliveryRequirement()}
        </div>
      </Col>
    );
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Phiếu gửi quốc tế</h1>
      </Row>
      {renderSendingCoupon()}
      <Row className="mb-3">
        {renderSendingCouponInfo()}
        {renderProductInfo()}
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

export default InternationalForwardingOrder;
