import React, { FormEvent } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  onHide: () => void;
  visible: boolean;
  doSomeThing: () => void;
}

const ChangeCurrentPostOfficeConfirmModal: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const { doSomeThing, onHide, visible } = props;

  function handleAccept(e: FormEvent): void {
    e.preventDefault();
    doSomeThing();
    onHide();
  }

  return (
    <Modal isOpen={visible} toggle={onHide} className="sipTitleModalCreateNew">
      <ModalHeader toggle={onHide}>{t('Xác nhận')}</ModalHeader>
      <ModalBody>
        <p>{t('Bạn có thực sự muốn thay đổi?')}</p>
      </ModalBody>
      <ModalFooter className="justify-content-end">
        <Button color="primary" onClick={handleAccept}>
          {t('Đồng Ý')}
        </Button>
        <Button onClick={onHide}>{t('Hủy')}</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChangeCurrentPostOfficeConfirmModal;
