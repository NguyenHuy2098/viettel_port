/* eslint-disable max-lines */
import React, { useEffect } from 'react';
import { Col, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import numeral from 'numeral';
import moment from 'moment';
import { get, trim, toString, isEmpty, replace } from 'lodash';
import { schema } from './ThemMoiChiPhiValidator';

interface Props {
  type: ModalThemMoiChiPhiType;
  showModal: boolean;
  toggle: () => void;
  khoanMuc: string;
  tenKhoanMuc: string;
  submit: Function;
  closeModal: () => void;
  editItem?: API.ITEMBK;
}
export enum ModalThemMoiChiPhiType {
  NEW = 0,
  EDIT = 1,
}

// eslint-disable-next-line max-lines-per-function
const ModalThemMoiChiPhi: React.FC<Props> = ({
  closeModal,
  editItem,
  showModal,
  toggle,
  khoanMuc,
  tenKhoanMuc,
  submit,
  type,
}: Props): JSX.Element => {
  const { t } = useTranslation();

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
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  useEffect((): void => {
    if (!isEmpty(editItem)) {
      const ngay = isEmpty(get(editItem, 'NGAY_HD'))
        ? moment().toDate()
        : moment(get(editItem, 'NGAY_HD', 'YYYYMMDD')).toDate();

      setMaSoThue(get(editItem, 'MST', ''));
      setTenNguoiBan(get(editItem, 'NGUOI_BAN', ''));
      setMauHoaDon(get(editItem, 'MAU_HD', ''));
      setKyHieu(get(editItem, 'KIHIEU_HD', ''));
      setNgay(ngay);
      setSoHoaDon(get(editItem, 'SO_HD', ''));
      setHangHoa(get(editItem, 'DESCR', ''));
      setTienHangHoa(numberFormat(get(editItem, 'AMOUNT', '')));
      setPhuPhi(numberFormat(get(editItem, 'PHU_PHI', '')));
      setThueSuat(get(editItem, 'TAX', ''));
      setThueGTGT(numberFormat(get(editItem, 'TAX_AMOUNT', '')));
      setLinkUrl(get(editItem, 'URL', ''));
    }
  }, [editItem]);

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
    return numeral((stringToNumber(tienHangHoa) * stringToNumber(replace(thueSuat, '%', ''))) / 100).format('0,0');
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

  // eslint-disable-next-line max-lines-per-function
  function handleSubmit(): void {
    const payload =
      type === ModalThemMoiChiPhiType.NEW
        ? {
            MAU_HD: trim(mauHoaDon),
            KIHIEU_HD: trim(kyHieu),
            SO_HD: soHoaDon,
            NGAY_HD: moment(ngay).format('YYYYMMDD'),
            ITEM_NO: 0,
            NGUOI_BAN: trim(tenNguoiBan),
            MST: trim(maSoThue),
            DESCR: trim(hangHoa),
            TEN_KM: trim(tenKhoanMuc),
            KHOAN_MUC: trim(khoanMuc),
            AMOUNT: toString(stringToNumber(tienHangHoa)),
            PHU_PHI: toString(stringToNumber(phuPhi)),
            TAX: thueSuat,
            TAX_AMOUNT: toString(stringToNumber(thueGTGT)),
            SUM_AMOUNT: toString(stringToNumber(caculateSumAmount(tienHangHoa, phuPhi, thueGTGT))),
            URL: trim(linkUrl),
            STATUS_ITEM: '0',
            LINE_ITEM: 'CG',
          }
        : {
            ...editItem,
            MAU_HD: trim(mauHoaDon),
            KIHIEU_HD: trim(kyHieu),
            SO_HD: soHoaDon,
            NGAY_HD: moment(ngay).format('YYYYMMDD'),
            ITEM_NO: 0,
            NGUOI_BAN: trim(tenNguoiBan),
            MST: trim(maSoThue),
            DESCR: trim(hangHoa),
            TEN_KM: trim(tenKhoanMuc),
            AMOUNT: toString(stringToNumber(tienHangHoa)),
            PHU_PHI: toString(stringToNumber(phuPhi)),
            TAX: thueSuat,
            TAX_AMOUNT: toString(stringToNumber(thueGTGT)),
            SUM_AMOUNT: toString(stringToNumber(caculateSumAmount(tienHangHoa, phuPhi, thueGTGT))),
            URL: trim(linkUrl),
            STATUS_ITEM: '0',
          };

    schema
      .validate(payload)
      .catch(function(err) {
        const errors: Record<string, string> = {};
        errors[err.path] = err.message;
        setErrors(errors);
      })
      .then(data => {
        if (!ngay) {
          setErrors({ NGAY_HD: 'Ngày hợp đồng không hợp lệ' });
          return;
        }
        if (data) {
          submit(data);
          closeModal();
          reset();
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
    setThueGTGT('');
  }

  function handleToggle(): void {
    toggle();
    if (type === ModalThemMoiChiPhiType.NEW) reset();
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
                <option value="0%">0%</option>
                <option value="5%">5%</option>
                <option value="10%">10%</option>
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
    <Modal isOpen={showModal} toggle={handleToggle} className="">
      <ModalHeader toggle={handleToggle} className="no-border" charCode="x">
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
  );
};

export default ModalThemMoiChiPhi;
