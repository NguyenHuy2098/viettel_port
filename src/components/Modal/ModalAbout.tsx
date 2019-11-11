import React from 'react';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

interface Props {
  toggle: () => void;
  visible: boolean;
}

const ModalAbout = (props: Props): JSX.Element => {
  const { toggle: handleToggle, visible } = props;
  const { t } = useTranslation();

  return (
    <Modal isOpen={visible} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>{t('Thông tin')}</ModalHeader>
      <ModalBody>
        <Row className="mb-2">
          <Col xs={3}>{t('Môi trường')}</Col>
          <Col xs={9} className="text-bold">
            {process.env.REACT_APP_ENV}
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs={3}>{t('Phiên bản')}</Col>
          <Col xs={9} className="text-bold">
            {process.env.REACT_APP_VERSION}
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs={3}>{t('Phát hành')}</Col>
          <Col xs={9} className="text-bold">
            {moment(process.env.REACT_APP_BUILD_TIME).format('LLL')}
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className="justify-content-end">
        <Button color="light" onClick={handleToggle}>
          {t('Đóng')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalAbout;
