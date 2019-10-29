import React, { useEffect, useState } from 'react';
import { Col, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { get, isEmpty, defaultTo } from 'lodash';

interface Props {
  isOpen: boolean;
  toggle: () => void;
  handleEditItem: (item: API.ITEMBK) => void;
  item: API.ITEMBK;
}

// eslint-disable-next-line max-lines-per-function
const EditCostModal: React.FC<Props> = ({ handleEditItem, isOpen, toggle, item }: Props): JSX.Element => {
  const { t } = useTranslation();

  const [editItem, setEditItem] = useState<API.ITEMBK>({});

  useEffect((): void => {
    setEditItem({ ...item });
  }, [item]);

  function handleChangeMaSoThue(e: React.FormEvent<HTMLInputElement>): void {
    setEditItem({ ...editItem, MST: e.currentTarget.value });
  }

  function handleChangeTenNguoiBan(e: React.FormEvent<HTMLInputElement>): void {
    setEditItem({ ...editItem, NGUOI_BAN: e.currentTarget.value });
  }

  function handleChangeMauHoaDon(e: React.FormEvent<HTMLInputElement>): void {
    setEditItem({ ...editItem, MAU_HD: e.currentTarget.value });
  }

  function handleChangeKyHieu(e: React.FormEvent<HTMLInputElement>): void {
    setEditItem({ ...editItem, KIHIEU_HD: e.currentTarget.value });
  }

  function handleChangeSoHoaDon(e: React.FormEvent<HTMLInputElement>): void {
    setEditItem({ ...editItem, SO_HD: e.currentTarget.value });
  }

  function handleChangeHangHoa(e: React.FormEvent<HTMLInputElement>): void {
    setEditItem({ ...editItem, DESCR: e.currentTarget.value });
  }

  function handleChangeTienHangHoa(e: React.FormEvent<HTMLInputElement>): void {
    setEditItem({ ...editItem, AMOUNT: e.currentTarget.value });
  }

  function handleChangePhuPhi(e: React.FormEvent<HTMLInputElement>): void {
    setEditItem({ ...editItem, PHU_PHI: e.currentTarget.value });
  }

  function handleChangeThueGTGT(e: React.FormEvent<HTMLInputElement>): void {
    setEditItem({ ...editItem, TAX: e.currentTarget.value });
  }

  function handleChangeLinkUrl(e: React.FormEvent<HTMLInputElement>): void {
    setEditItem({ ...editItem, URL: e.currentTarget.value });
  }

  function handleChangeThueSuat(e: React.FormEvent<HTMLInputElement>): void {
    setEditItem({ ...editItem, TAX_AMOUNT: e.currentTarget.value });
  }

  function handleChangeNgay(date: Date): void {
    setEditItem({ ...editItem, NGAY_HD: moment(date).format('YYYYMMDD') });
  }

  // eslint-disable-next-line max-lines-per-function
  function renderBillInfo(): JSX.Element {
    return (
      <Form>
        <FormGroup>
          <Input
            type="text"
            value={defaultTo(get(editItem, 'MST', ''), '')}
            onChange={handleChangeMaSoThue}
            placeholder="Mã số thuế"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            value={defaultTo(get(editItem, 'NGUOI_BAN', ''), '')}
            onChange={handleChangeTenNguoiBan}
            placeholder="Tên người bán"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            value={defaultTo(get(editItem, 'MAU_HD', ''), '')}
            onChange={handleChangeMauHoaDon}
            placeholder="Mẫu hóa đơn"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            value={defaultTo(get(editItem, 'KIHIEU_HD', ''), '')}
            onChange={handleChangeKyHieu}
            placeholder="Ký hiệu"
          />
        </FormGroup>
        <FormGroup>
          <DatePicker
            placeholderText={t('Nhập thời gian')}
            className="form-control"
            selected={
              !isEmpty(get(editItem, 'NGAY_HD')) && moment(get(editItem, 'NGAY_HD')).isValid()
                ? moment(get(editItem, 'NGAY_HD'), 'YYYYMMDD').toDate()
                : moment().toDate()
            }
            onChange={handleChangeNgay}
            dateFormat="dd/MM/yyyy"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            value={defaultTo(get(editItem, 'SO_HD', ''), '')}
            onChange={handleChangeSoHoaDon}
            placeholder="Số hoá đơn"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            value={defaultTo(get(editItem, 'DESCR', ''), '')}
            onChange={handleChangeHangHoa}
            placeholder="Hàng hóa(Tối đa 250 ký tự)"
          />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                type="text"
                value={defaultTo(get(editItem, 'AMOUNT', ''), '')}
                onChange={handleChangeTienHangHoa}
                placeholder="Tiền hàng hóa, dịch vụ"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                type="text"
                value={defaultTo(get(editItem, 'PHU_PHI', ''), '')}
                onChange={handleChangePhuPhi}
                placeholder="Phụ phí"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input type="select" value={defaultTo(get(editItem, 'TAX', ''), '')} onChange={handleChangeThueSuat}>
                <option>Thuế suất</option>
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="10">10%</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                type="text"
                value={defaultTo(get(editItem, 'TAX_AMOUNT', ''), '')}
                onChange={handleChangeThueGTGT}
                placeholder="Thuế GTGT"
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Input
            type="text"
            value={defaultTo(get(editItem, 'URL', ''), '')}
            onChange={handleChangeLinkUrl}
            placeholder="Link "
          />
        </FormGroup>
      </Form>
    );
  }

  const handleSubmit = (): void => {
    handleEditItem(editItem);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="">
      <ModalHeader toggle={toggle} charCode="x">
        Thông tin hóa
      </ModalHeader>
      <ModalBody>{renderBillInfo()}</ModalBody>
      <ModalFooter className="footer-no-boder">
        <div className="text-left col-6">
          <p className="mb-0">Tổng tiền thanh toán: 0đ</p>
        </div>
        <div className="text-right col-6">
          <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>
            Ghi lại
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default EditCostModal;
