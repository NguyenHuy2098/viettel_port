import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  modalApiCreateSuccess: boolean;
  isCreateNewForwardingOrder: boolean;
  toggle: () => void;
  idPhieuGuiSuccess: string;
}

// eslint-disable-next-line max-lines-per-function
const ModalAddNew: React.FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation();

  const handleReload = (): void => {
    if (props.isCreateNewForwardingOrder) {
      window.location.reload();
    } else {
      props.toggle();
    }
  };

  return (
    <Modal isOpen={props.modalApiCreateSuccess} className="sipTitleModalCreateNew">
      <ModalHeader className="text-center">{t('Thành công')}</ModalHeader>
      <ModalBody>
        <h5 className="mb-4">
          {props.isCreateNewForwardingOrder ? t('Tạo đơn mới thành công!') : t('Cập nhật thành công!')}
          <br />
          {`Mã: ${props.idPhieuGuiSuccess}`}
        </h5>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleReload}>
          {t('OK')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalAddNew;
