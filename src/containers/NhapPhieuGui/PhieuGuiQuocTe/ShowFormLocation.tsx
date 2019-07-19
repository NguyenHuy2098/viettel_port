import React, { useState } from 'react';
import {
  Col,
  Input,
  Label,
  Row,
  Form,
  FormGroup,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  saveButton?: string;
  cancelButton?: string;
  titleModal?: string;
  contentConfirm?: string;
}
// eslint-disable-next-line max-lines-per-function
const ShowFormLocation: React.FC<Props> = (props: Props): JSX.Element => {
  const [modal, setModal] = useState(false);
  const { t } = useTranslation();

  function toggle(): void {
    setModal(!modal);
  }

  function renderFormLocation(): JSX.Element {
    return (
      <Form className="w-100">
        <FormGroup className="w-100">
          <Row>
            <Col md="4" xs="12">
              <Label for="exampleSelect">{t('Thành phố/ Tỉnh')}</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>1</option>
                <option>2</option>
              </Input>
            </Col>
            <Col md="4" xs="12">
              <Label for="exampleSelect">{t('Quận / Huyện')}</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>1</option>
                <option>2</option>
              </Input>
            </Col>
            <Col md="4" xs="12">
              <Label for="exampleSelect">{t('Phường/ Xã')}</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>1</option>
                <option>2</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup className="w-100">
          <Row>
            <Col md="12">
              <Input type="text" placeholder={t('Nhập địa chỉ(tên đường, ngõ hẻm, số nhà)')} />
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
  return (
    <>
      <Button onClick={toggle} className="sipFlatBtn">
        {t('nhấn vào đây')}
      </Button>{' '}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Nhập địa chỉ</ModalHeader>
        <ModalBody>{renderFormLocation()}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            {t('Ghi lại')}
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            {t('Hủy')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ShowFormLocation;
