import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  toggle: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

const SimpleConfirmModal: React.FC<Props> = ({ isOpen, toggle, onCancel, onDelete }: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="sipTitleModalCreateNew">
      <ModalHeader toggle={toggle}>{t('Xác nhận')}</ModalHeader>
      <ModalBody>
        <p>{t('Bạn có muốn xóa không?')}</p>
      </ModalBody>
      <ModalFooter className="justify-content-end">
        <Button color="primary" onClick={onDelete}>
          {t('Xóa')}
        </Button>
        <Button onClick={onCancel}>{t('Hủy')}</Button>
      </ModalFooter>
    </Modal>
  );
};

export default SimpleConfirmModal;
