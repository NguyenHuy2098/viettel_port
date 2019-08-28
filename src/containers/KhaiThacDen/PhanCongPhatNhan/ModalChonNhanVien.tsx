import React, { useState } from 'react';
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

// eslint-disable-next-line max-lines-per-function
const ModalChonNhanVien: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [modalCreateNew, setModalCreateNew] = useState<boolean>(false);

  function toggle(): void {
    setModalCreateNew(!modalCreateNew);
  }

  return (
    <>
      <Button onClick={toggle}>
        <i className="fa fa-user-o" />
        Chuyển phân công
      </Button>
      <Modal isOpen={modalCreateNew} toggle={toggle}>
        <ModalHeader toggle={toggle} className="no-border">
          {t('Chọn nhân viên')}
        </ModalHeader>
        <ModalBody>
          <Label check xs="12" className="pl-0 pr-0 ipOptionNV">
            <Input type="radio" name="deliveryRequirement" value="khongChoXem" /> {t('Nguyễn Văn An')}
            <div className="pl-4">{t('Tuyến: Hoàng Hoa THám - Liễu Giai - Văn Cao - Ba Đình')}</div>
          </Label>
          <Label check xs="12" className="pl-0 pr-0 ipOptionNV">
            <Input type="radio" name="deliveryRequirement" value="khongChoXem" /> {t('Nguyễn Văn An')}
            <div className="pl-4">{t('Tuyến: Hoàng Hoa THám - Liễu Giai - Văn Cao - Ba Đình')}</div>
          </Label>
          <Label check xs="12" className="pl-0 pr-0 ipOptionNV">
            <Input type="radio" name="deliveryRequirement" value="khongChoXem" /> {t('Nguyễn Văn An')}
            <div className="pl-4">{t('Tuyến: Hoàng Hoa THám - Liễu Giai - Văn Cao - Ba Đình')}</div>
          </Label>
          <Label check xs="12" className="pl-0 pr-0 ipOptionNV">
            <Input type="radio" name="deliveryRequirement" value="khongChoXem" /> {t('Nguyễn Văn An')}
            <div className="pl-4">{t('Tuyến: Hoàng Hoa THám - Liễu Giai - Văn Cao - Ba Đình')}</div>
          </Label>
        </ModalBody>
        <ModalFooter className="no-border">
          <Button color="primary" onClick={toggle}>
            {t('Hoàn thành')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default withRouter(ModalChonNhanVien);
