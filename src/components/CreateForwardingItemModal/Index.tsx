import React, { FormEvent } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';

interface Props {
  onHide: () => void;
  visible: boolean;
}

const Index: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const { onHide, visible } = props;

  function handleCreate(e: FormEvent): void {
    e.preventDefault();
    onHide();
  }

  // const payload = {
  //   row: [
  //     {
  //       IV_LOCTYPE: 'V001',
  //     },
  //   ],
  //   IV_BP: '',
  //   IV_PAGENO: '1',
  //   IV_NO_PER_PAGE: '5000',
  // };

  return (
    <Modal isOpen={visible} className="sipTitleModalCreateNew">
      <ModalHeader toggle={onHide}>{t('Tạo bảng kê')}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>{t('Chọn điểm đến')}</Label>
          <Input type="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>{t('Ghi chú')}</Label>
          <Input type="textarea" placeholder={t('Nhập ghi chú (Không bắt buộc)')} />
        </FormGroup>
      </ModalBody>
      <ModalFooter className="justify-content-end">
        <Button color="primary" onClick={handleCreate}>
          {t('Ghi lại')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Index;
