import React, { FormEvent } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  onHide: () => void;
  onDelete: (torId: string) => void;
  visible: boolean;
  torId: string;
}

const ModalConfirmDelete: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const { onDelete, onHide, visible, torId } = props;

  function handleDelete(e: FormEvent): void {
    e.preventDefault();
    onDelete(torId);
    onHide();
  }

  return (
    <Modal isOpen={visible} toggle={onHide} className="sipTitleModalCreateNew">
      <ModalHeader toggle={onHide}>{t('Xác nhận')}</ModalHeader>
      <ModalBody>
        <p>{t('Bạn có muốn xóa không?')}</p>
      </ModalBody>
      <ModalFooter className="justify-content-end">
        <Button color="primary" onClick={handleDelete}>
          {t('Xóa')}
        </Button>
        <Button onClick={onHide}>{t('Hủy')}</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalConfirmDelete;
