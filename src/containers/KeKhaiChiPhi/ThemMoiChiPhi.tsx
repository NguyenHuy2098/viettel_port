/* eslint-disable max-lines */
import React from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { toString, sumBy, get, trim } from 'lodash';
import numeral from 'numeral';
import { Row as TableRow } from 'react-table';
import * as yup from 'yup';

interface Props {
  index: string;
  handleSubmit: Function;
  rows: TableRow<API.RowMTZTMI047OUT>[];
}

const schema = yup.object().shape({
  URL: yup
    .string()
    .required('URL không được để trống')
    // eslint-disable-next-line no-useless-escape
    .matches(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, 'URL không hợp lệ'),
  TAX_AMOUNT: yup.string().required('Thuế GTGT không được để trống'),
  TAX: yup.string().required('Thuế suất không được để trống'),
  PHU_PHI: yup.string().required('Phụ phí không được để trống'),
  AMOUNT: yup.string().required('Tiền hàng hóa không được để trống'),
  DESCR: yup
    .string()
    .required('Hàng hóa không được để trống')
    .max(250, 'Hàng hóa không được nhập quá 250 ký tự'),
  SO_HD: yup
    .string()
    .required('Số hóa đơn không được để trống')
    .max(7, 'Số hóa đơn không được nhập quá 7 ký tự'),
  NGAY_HD: yup.string().required('Ngày hợp đồng không được để trống'),
  KIHIEU_HD: yup
    .string()
    .required('Ký hiệu không được để trống')
    .max(7, 'Ký hiệu không được nhập quá 7 ký tự'),
  MAU_HD: yup
    .string()
    .required('Mẫu hóa đơn không được để trống')
    .max(11, 'Mẫu hóa đơn không được nhập quá 11 ký tự'),
  NGUOI_BAN: yup
    .string()
    .required('Tên người bán không được để trống')
    .max(120, 'Tên người bán không được nhập quá 120 ký tự'),
  MST: yup
    .string()
    .required('MST không được để trống')
    .max(14, 'MST không được nhập quá 14 kí tự'),
});

// eslint-disable-next-line max-lines-per-function
const ThemMoiChiPhi = (props: Props): JSX.Element => {
  const [modal, setModal] = React.useState(false);
  const { t } = useTranslation();
  const index = props.index;
  const rows = props.rows;

  function toggle(): void {
    reset();
    setModal(!modal);
  }

  const [maSoThue, setMaSoThue] = React.useState<string>('');
  const [tenNguoiBan, setTenNguoiBan] = React.useState<string>('');
  const [mauHoaDon, setMauHoaDon] = React.useState<string>('');
  const [kyHieu, setKyHieu] = React.useState<string>('');
  const [ngay, setNgay] = React.useState<Date>(new Date());
  const [soHoaDon, setSoHoaDon] = React.useState<string>('');
  const [hangHoa, setHangHoa] = React.useState<string>('');
  const [tienHangHoa, setTienHangHoa] = React.useState<string>('');
  const [phuPhi, setPhuPhi] = React.useState<string>('');
  const [thueSuat, setThueSuat] = React.useState<string>('');
  const [thueGTGT, setThueGTGT] = React.useState<string>('');
  const [linkUrl, setLinkUrl] = React.useState<string>('');
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);

  function handleChangeMaSoThue(e: React.FormEvent<HTMLInputElement>): void {
    setIsSubmit(true);
    setMaSoThue(e.currentTarget.value);
  }

  function handleChangeTenNguoiBan(e: React.FormEvent<HTMLInputElement>): void {
    setIsSubmit(true);
    setTenNguoiBan(e.currentTarget.value);
  }

  function handleChangeMauNguoiBan(e: React.FormEvent<HTMLInputElement>): void {
    setIsSubmit(true);
    setMauHoaDon(e.currentTarget.value);
  }

  function handleChangeKyHieu(e: React.FormEvent<HTMLInputElement>): void {
    setIsSubmit(true);
    setKyHieu(e.currentTarget.value);
  }

  function handleChangeSoHoaDon(e: React.FormEvent<HTMLInputElement>): void {
    setIsSubmit(true);
    setSoHoaDon(e.currentTarget.value.replace(/[^0-9]/g, ''));
  }

  function handleChangeHangHoa(e: React.FormEvent<HTMLInputElement>): void {
    setIsSubmit(true);
    setHangHoa(e.currentTarget.value);
  }

  function handleChangeTienHangHoa(e: React.FormEvent<HTMLInputElement>): void {
    setIsSubmit(true);
    setTienHangHoa(numberFormat(e.currentTarget.value));
    setThueGTGT(caculateThueGTGT(e.currentTarget.value, thueSuat));
  }

  function handleChangePhuPhi(e: React.FormEvent<HTMLInputElement>): void {
    setIsSubmit(true);
    setPhuPhi(numberFormat(e.currentTarget.value));
  }

  function handleChangeThueGTGT(e: React.FormEvent<HTMLInputElement>): void {
    setIsSubmit(true);
    setThueGTGT(numberFormat(e.currentTarget.value));
  }

  function handleChangeLinkUrl(e: React.FormEvent<HTMLInputElement>): void {
    setIsSubmit(true);
    setLinkUrl(e.currentTarget.value);
  }

  function handleChangeThueSuat(e: React.FormEvent<HTMLInputElement>): void {
    setIsSubmit(true);
    setThueSuat(e.currentTarget.value);
    setThueGTGT(caculateThueGTGT(tienHangHoa, e.currentTarget.value));
  }

  function handleChangeNgay(date: Date): void {
    setIsSubmit(true);
    setNgay(date);
  }

  function caculateThueGTGT(tienHangHoa: string, thueSuat: string): string {
    return numberFormat(toString((stringToNumber(tienHangHoa) * stringToNumber(thueSuat)) / 100));
  }

  function caculateSumAmount(tienHangHoa: string, phuPhi: string, thueGTGT: string): string {
    return numberFormat(toString(stringToNumber(tienHangHoa) + stringToNumber(phuPhi) + stringToNumber(thueGTGT)));
  }

  function numberFormat(value: string): string {
    return numeral(value.replace(/[^0-9]/g, '')).format('0,0');
  }

  function stringToNumber(value: string): number {
    return numeral(value).value();
  }

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function handleSubmit(): void {
    const payload = {
      MAU_HD: trim(mauHoaDon),
      KIHIEU_HD: trim(kyHieu),
      SO_HD: soHoaDon,
      NGAY_HD: moment(ngay).format('YYYYMMDD'),
      ITEM_NO: 0,
      NGUOI_BAN: trim(tenNguoiBan),
      MST: trim(maSoThue),
      DESCR: trim(hangHoa),
      TEN_KM: trim(index),
      KHOAN_MUC: trim(index),
      AMOUNT: tienHangHoa,
      PHU_PHI: phuPhi,
      TAX: toString(stringToNumber(thueSuat)),
      TAX_AMOUNT: toString(stringToNumber(thueGTGT)),
      SUM_AMOUNT: toString(stringToNumber(caculateSumAmount(tienHangHoa, phuPhi, thueGTGT))),
      URL: trim(linkUrl),
    };

    schema
      .validate(payload)
      .catch(function(err) {
        const errors: Record<string, string> = {};
        errors[err.path] = err.message;
        setErrors(errors);
      })
      .then(data => {
        if (data) {
          props.handleSubmit(data);
          setModal(false);
        }
      });
  }

  function reset(): void {
    setMaSoThue('');
    setTenNguoiBan('');
    setMauHoaDon('');
    setKyHieu('');
    setNgay(new Date());
    setSoHoaDon('');
    setHangHoa('');
    setTienHangHoa('');
    setPhuPhi('');
    setThueSuat('');
    setLinkUrl('');
    setErrors({});
    setIsSubmit(false);
  }

  // eslint-disable-next-line max-lines-per-function
  function renderBillInfo(): JSX.Element {
    return (
      <Form>
        <FormGroup>
          <Input type="text" value={maSoThue} onChange={handleChangeMaSoThue} placeholder="Mã số thuế" />
          <span className="color-red">{get(errors, 'MST', '')}</span>
        </FormGroup>
        <FormGroup>
          <Input type="text" value={tenNguoiBan} onChange={handleChangeTenNguoiBan} placeholder="Tên người bán" />
          <span className="color-red">{get(errors, 'NGUOI_BAN', '')}</span>
        </FormGroup>
        <FormGroup>
          <Input type="text" value={mauHoaDon} onChange={handleChangeMauNguoiBan} placeholder="Mẫu hóa đơn" />
          <span className="color-red">{get(errors, 'MAU_HD', '')}</span>
        </FormGroup>
        <FormGroup>
          <Input type="text" value={kyHieu} onChange={handleChangeKyHieu} placeholder="Ký hiệu" />
          <span className="color-red">{get(errors, 'KIHIEU_HD', '')}</span>
        </FormGroup>
        <FormGroup className="sapFicoEditModalDatepickerContainer">
          <DatePicker
            placeholderText={t('Nhập thời gian')}
            className="form-control w-100"
            selected={ngay}
            onChange={handleChangeNgay}
            dateFormat="dd/MM/yyyy"
          />
          <span className="color-red">{get(errors, 'NGAY_HD', '')}</span>
        </FormGroup>
        <FormGroup>
          <Input type="text" value={soHoaDon} onChange={handleChangeSoHoaDon} placeholder="Số hoá đơn" />
          <span className="color-red">{get(errors, 'SO_HD', '')}</span>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            value={hangHoa}
            onChange={handleChangeHangHoa}
            placeholder="Hàng hóa(Tối đa 250 ký tự)"
          />
          <span className="color-red">{get(errors, 'DESCR', '')}</span>
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                type="text"
                value={tienHangHoa}
                onChange={handleChangeTienHangHoa}
                placeholder="Tiền hàng hóa, dịch vụ"
              />
              <span className="color-red">{get(errors, 'AMOUNT', '')}</span>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input type="text" value={phuPhi} onChange={handleChangePhuPhi} placeholder="Phụ phí" />
              <span className="color-red">{get(errors, 'PHU_PHI', '')}</span>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input type="select" value={thueSuat} onChange={handleChangeThueSuat}>
                <option>Thuế suất</option>
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="10">10%</option>
              </Input>
              <span className="color-red">{get(errors, 'TAX', '')}</span>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input type="text" value={thueGTGT} onChange={handleChangeThueGTGT} placeholder="Thuế GTGT" />
              <span className="color-red">{get(errors, 'TAX_AMOUNT', '')}</span>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Input type="text" value={linkUrl} onChange={handleChangeLinkUrl} placeholder="Link URL" />
          <span className="color-red">{get(errors, 'URL', '')}</span>
        </FormGroup>
      </Form>
    );
  }

  return (
    <div>
      <div className="sipTableAmountListGroup">
        <span>
          {index !== 'null' ? index : ''}&nbsp;({t('Tổng')}:{' '}
          <span className="text-bold color-primary">{numeral(sumBy(rows, 'original.SUM_AMOUNT')).format('0,0')}</span>)
        </span>
        <Button color="primary" outline onClick={toggle}>
          <i className="fa fa-plus mr-2" />
          {t('Thêm mới')}
        </Button>
      </div>
      <Modal isOpen={modal} toggle={toggle} className="">
        <ModalHeader toggle={toggle} className="no-border" charCode="x">
          <strong>{t('Thông tin hóa đơn')}</strong>
        </ModalHeader>
        <ModalBody>{renderBillInfo()}</ModalBody>
        <ModalFooter className="footer-no-boder">
          <div className="text-left col-6">
            <p className="mb-0">
              Tổng tiền thanh toán: <span className="total">{caculateSumAmount(tienHangHoa, phuPhi, thueGTGT)}đ</span>
            </p>
          </div>
          <div className="text-right col-6">
            <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={!isSubmit}>
              GHI LẠI
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ThemMoiChiPhi;
