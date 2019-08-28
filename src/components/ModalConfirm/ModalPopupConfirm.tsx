import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  buttonLabel?: JSX.Element;
  className?: string;
  handleDoSomething: Function;
  saveButton?: string;
  cancelButton?: string;
  titleModal?: string;
  contentConfirm?: string;
  classNameBtn?: string;
}

const ModalPopupConfirm: React.FC<Props> = (props: Props): JSX.Element => {
  const [modal, setModal] = useState(false);
  const { t } = useTranslation();

  function toggle(): void {
    setModal(!modal);
  }

  function handleDoSomething(): void {
    props.handleDoSomething();
    setModal(false);
  }

  return (
    <>
      <Button className={props.classNameBtn ? props.classNameBtn : 'SipTableFunctionIcon'} onClick={toggle}>
        {props.buttonLabel ? props.buttonLabel : <i className="fa fa-trash-o fa-lg color-red" />}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={props.className ? props.className : 'sipTitleModalCreateNew'}>
        <ModalHeader toggle={toggle}>{props.titleModal ? props.titleModal : t('Xác nhận')}</ModalHeader>
        <ModalBody>
          <p>{props.contentConfirm ? props.contentConfirm : t('Bạn có muốn xóa không?')}</p>
        </ModalBody>
        <ModalFooter className="justify-content-end">
          <Button color="primary" onClick={handleDoSomething}>
            {props.saveButton ? props.saveButton : t('Xóa')}
          </Button>
          <Button onClick={toggle}>{props.cancelButton ? props.cancelButton : t('Hủy')}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalPopupConfirm;
