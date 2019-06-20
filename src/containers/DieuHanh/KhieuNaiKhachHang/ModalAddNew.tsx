import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Label, Col, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  modalCreateNew: boolean;
  toggle: () => void;
}

// eslint-disable-next-line max-lines-per-function
const ModalAddNew: React.FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation();

  // eslint-disable-next-line max-lines-per-function
  function renderInformationTable(): JSX.Element {
    return (
      <div className="border-bottom mb-3">
        <Row className="mb-3">
          <Label xs="12" lg="4">
            {t('Tên khách hàng/công ty')}
          </Label>
          <Col lg="8">
            <Input type="text" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Label xs="12" lg="4">
            {t('Điện thoại')}
          </Label>
          <Col lg="8">
            <Input type="text" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Label xs="12" lg="4">
            {t('Địa chỉ')}
          </Label>
          <Col lg="8">
            <Input type="text" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Label xs="12" lg="4">
            {t('Mã phiếu gửi')}
          </Label>
          <Col lg="8">
            <Input type="text" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Label xs="12" lg="4">
            {t('Loại khiếu nại')}
          </Label>
          <Col lg="8">
            <Input type="text" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Label xs="12" lg="4">
            {t('Chọn khiếu nại')}
          </Label>
          <Col lg="8">
            <Input type="text" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Label xs="12" lg="4">
            {t('Mức độ')}
          </Label>
          <Col lg="8">
            <Input type="text" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Label xs="12" lg="4">
            {t('Nội dung')}
          </Label>
          <Col lg="8">
            <Input type="textarea" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Label xs="12" lg="4">
            {t('Bưu cục xử lý')}
          </Label>
          <Col lg="8">
            <Input type="text" />
          </Col>
        </Row>
      </div>
    );
  }

  function renderModalAddNew(): JSX.Element {
    return (
      <div>
        <Modal isOpen={props.modalCreateNew} className="sipTitleModalCreateNew" toggle={props.toggle}>
          <ModalHeader toggle={props.toggle} className="text-center">
            {t('Tra cứu biên bản')}
          </ModalHeader>
          <ModalBody>{renderInformationTable()}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={props.toggle}>
              {t('GHI LẠI')}
            </Button>
            <Button color="primary" onClick={props.toggle}>
              {t('THOÁT')}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  return <div>{renderModalAddNew()}</div>;
};

export default ModalAddNew;
