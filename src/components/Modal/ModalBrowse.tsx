import React, { FormEvent } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Input, FormGroup, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  onHide: () => void;
  onDelete: (torId: string) => void;
  visible: boolean;
  torId: string;
}

const ModalBrowse: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const { onDelete, onHide, visible, torId } = props;

  function handleDelete(e: FormEvent): void {
    e.preventDefault();
    onDelete(torId);
    onHide();
  }

  return (
    <Modal isOpen={visible} toggle={onHide} className="sipTitleModalCreateNew">
      <ModalHeader toggle={onHide}>{t('Chọn kênh phê duyệt')}</ModalHeader>
      <ModalBody>
        <FormGroup tag="fieldset">
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" />
              Phê duyệt thủ công
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" />
              Phê duyệt qua V-Office
            </Label>
          </FormGroup>
        </FormGroup>
      </ModalBody>
      <ModalFooter className="justify-content-end">
        <Button onClick={onHide}>{t('Hủy')}</Button>
        <Button color="primary" onClick={handleDelete}>
          {t('Xác nhận')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalBrowse;
