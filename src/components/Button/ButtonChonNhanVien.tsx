import React, { useCallback, useState } from 'react';
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, ButtonProps, ModalProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { map, filter } from 'lodash';

import { makeSelectorGet_MT_ZTMI054_OUT } from 'redux/MIOA_ZTMI054/selectors';

interface Props extends ButtonProps {
  onApplyChosen: (IV_PARTY_ID: string) => void;
  currentUserId: string | undefined;
  disabled: boolean;
  modalProps?: ModalProps;
}

// eslint-disable-next-line max-lines-per-function
const ButtonChonNhanVien: React.FC<Props> = (props: Props): JSX.Element => {
  const { onApplyChosen, currentUserId, disabled, modalProps, ...rest } = props;
  const { t } = useTranslation();
  const [modalCreateNew, setModalCreateNew] = useState<boolean>(false);
  const [idUserSelected, setIdUserSelected] = useState<undefined | string>(undefined);

  const toggle = (): void => {
    setModalCreateNew(!modalCreateNew);
  };
  const handleApplyClick = (): void => {
    onApplyChosen(idUserSelected || '');
    setModalCreateNew(!modalCreateNew);
  };
  const listStaff = filter(useSelector(makeSelectorGet_MT_ZTMI054_OUT), item => item.UNAME !== currentUserId);

  const handleChangeSelectUser = useCallback(
    (id: string | undefined) => (): void => {
      setIdUserSelected(id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <Button onClick={toggle} disabled={disabled} {...rest}>
        <img src={'../../assets/img/icon/iconChuyenPhanCong.svg'} alt="VTPostek" />
        {t('Chuyển phân công')}
      </Button>
      <Modal isOpen={modalCreateNew} toggle={toggle} {...modalProps}>
        <ModalHeader toggle={toggle} className="no-border">
          {t('Chọn nhân viên')}
        </ModalHeader>
        <ModalBody>
          {map(listStaff, item => {
            return (
              <Label check xs="12" className="pl-0 pr-0 ipOptionNV" key={item.UNAME}>
                <Input
                  type="radio"
                  name="deliveryRequirement"
                  checked={item.UNAME === idUserSelected}
                  value={item.UNAME}
                  onChange={handleChangeSelectUser(item.UNAME)}
                />{' '}
                {item.NAME_TEXT}
                <div className="pl-4">
                  {t('Tuyến')}: {''}
                </div>
              </Label>
            );
          })}
        </ModalBody>
        <ModalFooter className="no-border">
          <Button color="primary" onClick={handleApplyClick} disabled={!idUserSelected}>
            {t('Hoàn thành')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ButtonChonNhanVien;
