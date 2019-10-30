import React from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { toNumber, toString, sumBy } from 'lodash';
import numeral from 'numeral';
import { Row as TableRow } from 'react-table';

interface Props {
  index: string;
  handleSubmit: Function;
  rows: TableRow<API.RowMTZTMI047OUT>[];
}

// eslint-disable-next-line max-lines-per-function
const ThemMoiChiPhi = (props: Props): JSX.Element => {
  const [modal, setModal] = React.useState(false);
  const { t } = useTranslation();
  const index = props.index;
  const rows = props.rows;

  function toggle(): void {
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

  function handleChangeMaSoThue(e: React.FormEvent<HTMLInputElement>): void {
    setMaSoThue(e.currentTarget.value);
  }

  function handleChangeTenNguoiBan(e: React.FormEvent<HTMLInputElement>): void {
    setTenNguoiBan(e.currentTarget.value);
  }

  function handleChangeMauNguoiBan(e: React.FormEvent<HTMLInputElement>): void {
    setMauHoaDon(e.currentTarget.value);
  }

  function handleChangeKyHieu(e: React.FormEvent<HTMLInputElement>): void {
    setKyHieu(e.currentTarget.value);
  }

  function handleChangeSoHoaDon(e: React.FormEvent<HTMLInputElement>): void {
    setSoHoaDon(e.currentTarget.value);
  }

  function handleChangeHangHoa(e: React.FormEvent<HTMLInputElement>): void {
    setHangHoa(e.currentTarget.value);
  }

  function handleChangeTienHangHoa(e: React.FormEvent<HTMLInputElement>): void {
    setTienHangHoa(e.currentTarget.value);
  }

  function handleChangePhuPhi(e: React.FormEvent<HTMLInputElement>): void {
    setPhuPhi(e.currentTarget.value);
  }

  function handleChangeThueGTGT(e: React.FormEvent<HTMLInputElement>): void {
    setThueGTGT(e.currentTarget.value);
  }

  function handleChangeLinkUrl(e: React.FormEvent<HTMLInputElement>): void {
    setLinkUrl(e.currentTarget.value);
  }

  function handleChangeThueSuat(e: React.FormEvent<HTMLInputElement>): void {
    setThueSuat(e.currentTarget.value);
    setThueGTGT(toString((toNumber(e.currentTarget.value) * toNumber(tienHangHoa)) / 100));
  }

  function handleChangeNgay(date: Date): void {
    setNgay(date);
  }

  function handleSubmit(): void {
    const payload = {
      MAU_HD: mauHoaDon,
      KIHIEU_HD: kyHieu,
      SO_HD: soHoaDon,
      NGAY_HD: moment(ngay).format('YYYYMMDD'),
      STATUS_ITEM: 0,
      NGUOI_BAN: tenNguoiBan,
      MST: maSoThue,
      DESCR: hangHoa,
      TEN_KM: index,
      KHOAN_MUC: index,
    };
    props.handleSubmit(payload);
    setModal(false);
  }

  // eslint-disable-next-line max-lines-per-function
  function renderBillInfo(): JSX.Element {
    return (
      <Form>
        <FormGroup>
          <Input type="text" value={maSoThue} onChange={handleChangeMaSoThue} placeholder="Mã số thuế" />
        </FormGroup>
        <FormGroup>
          <Input type="text" value={tenNguoiBan} onChange={handleChangeTenNguoiBan} placeholder="Tên người bán" />
        </FormGroup>
        <FormGroup>
          <Input type="text" value={mauHoaDon} onChange={handleChangeMauNguoiBan} placeholder="Mẫu hóa đơn" />
        </FormGroup>
        <FormGroup>
          <Input type="text" value={kyHieu} onChange={handleChangeKyHieu} placeholder="Ký hiệu" />
        </FormGroup>
        <FormGroup>
          <DatePicker
            placeholderText={t('Nhập thời gian')}
            className="form-control"
            selected={ngay}
            onChange={handleChangeNgay}
            dateFormat="dd/MM/yyyy"
          />
        </FormGroup>
        <FormGroup>
          <Input type="text" value={soHoaDon} onChange={handleChangeSoHoaDon} placeholder="Số hoá đơn" />
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            value={hangHoa}
            onChange={handleChangeHangHoa}
            placeholder="Hàng hóa(Tối đa 250 ký tự)"
          />
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
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input type="text" value={phuPhi} onChange={handleChangePhuPhi} placeholder="Phụ phí" />
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
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input type="text" value={thueGTGT} onChange={handleChangeThueGTGT} placeholder="Thuế GTGT" />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Input type="text" value={linkUrl} onChange={handleChangeLinkUrl} placeholder="Link " />
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
        <ModalHeader toggle={toggle} charCode="x">
          Thông tin hóa
        </ModalHeader>
        <ModalBody>{renderBillInfo()}</ModalBody>
        <ModalFooter className="footer-no-boder">
          <div className="text-left col-6">
            <p className="mb-0">
              Tổng tiền thanh toán: {toNumber(tienHangHoa) + toNumber(phuPhi) + toNumber(thueGTGT)}đ
            </p>
          </div>
          <div className="text-right col-6">
            <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>
              Ghi lại
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ThemMoiChiPhi;
