import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Input,
  Row,
  Table,
  Col,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from 'reactstrap';

// eslint-disable-next-line max-lines-per-function
const LapBienBan: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [modalCreateNew, setModalCreateNew] = React.useState<boolean>(false);

  function toggle(): void {
    setModalCreateNew(!modalCreateNew);
  }

  function renderModal(): JSX.Element {
    return (
      <Modal isOpen={modalCreateNew} toggle={toggle} className="sipTitleModalCreateNew">
        <ModalHeader toggle={toggle}>{t('Thêm phiếu gửi')}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>{t('Mã phiếu gửi')}</Label>
            <Input type="select">
              <option>ANL2354853</option>
              <option>2</option>
              <option>3</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>{t('Mã chuyển thư')}</Label>
            <Input type="text" placeholder={t('CT123')} />
          </FormGroup>
          <FormGroup>
            <Label>{t('Ghi chú')}</Label>
            <Input type="textarea" placeholder={t('Chấp nhận bưu gửi thiếu hoá đơn')} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>{t('Ghi lại')}</Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Lập biên bản')}</h1>
        <div className="sipTitleRightBlock">
          <Button>
            <i className="fa fa-download" />
            Ghi lại
          </Button>
          <Button>Thoát</Button>
        </div>
      </Row>
      <div className="sipContentContainer">
        <Row className="sipInputItem">
          <Col xs="5" lg="2">
            <Label>{t('Lập cho bưu cục')}</Label>
          </Col>
          <Col xs="5" lg="4">
            <Input type="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Input>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Col xs="5" lg="2">
            <Label>{t('Loại lỗi vi phạm')}</Label>
          </Col>
          <Col xs="5" lg="4">
            <Input type="select">
              <option>Nhận bưu gửi</option>
              <option>2</option>
              <option>3</option>
            </Input>
          </Col>
        </Row>
        <Row className="sipInputItem">
          <Col xs="5" lg="2">
            <Label>{t('Chọn lỗi vi phạm')}</Label>
          </Col>
          <Col xs="5" lg="4">
            <Input type="select">
              <option>Nhận bưu gửi thiếu hóa đơn</option>
              <option>2</option>
              <option>3</option>
            </Input>
          </Col>
        </Row>
      </div>
      <div className="mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Phiếu gửi')}</h1>
        <div className="sipTitleRightBlock">
          <Button onClick={toggle}>
            <i className="fa fa-plus" />
            {t('Thêm phiếu gửi')}
          </Button>
          {renderModal()}
        </div>
      </Row>
      <Row className="sipTableContainer">
        <Table striped hover>
          <thead>
            <tr>
              <th>{t('STT')}</th>
              <th>{t('Mã phiếu gửi')}</th>
              <th>{t('Mã chuyển thư')}</th>
              <th>{t('Ghi chú')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>ANL2354853</td>
              <td>CT123</td>
              <td>Chấp nhận bưu gửi thiếu hoá đơn</td>
            </tr>
            <tr>
              <td>1</td>
              <td>ANL2354853</td>
              <td>CT123</td>
              <td>Chấp nhận bưu gửi thiếu hoá đơn</td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <div className="mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Biện pháp xử lý')}</h1>
      </Row>
      <Row className="sipBgWhiteContainer">
        <p>Phát đơn cho khách hàng trước ngày 10/05/2019</p>
      </Row>
    </>
  );
};

export default LapBienBan;
