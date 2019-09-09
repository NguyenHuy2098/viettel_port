import React, { useCallback, useState } from 'react';
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { map, filter } from 'lodash';
import { makeSelectorGet_MT_ZTMI054_OUT } from '../../../redux/MIOA_ZTMI054/selectors';

interface Props {
  onApplyChoosen: (IV_PARTY_ID: string) => void;
  disabled: boolean;
  currentUserId: string | undefined;
}

// eslint-disable-next-line max-lines-per-function
const ModalChonNhanVien: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [modalCreateNew, setModalCreateNew] = useState<boolean>(false);
  const [idUserSelected, setIdUserSelected] = useState<undefined | string>(undefined);

  function toggle(): void {
    setModalCreateNew(!modalCreateNew);
  }
  const handleApplyClick = (): void => {
    props.onApplyChoosen(idUserSelected || '');
    setModalCreateNew(!modalCreateNew);
  };
  const listStaff = filter(useSelector(makeSelectorGet_MT_ZTMI054_OUT), item => item.LOCNO !== props.currentUserId);

  const handleChangeSelectUser = useCallback(
    (id: string | undefined) => (): void => {
      setIdUserSelected(id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <Button onClick={toggle} disabled={props.disabled}>
        <i className="fa fa-user-o" />
        Chuyển phân công
      </Button>
      <Modal isOpen={modalCreateNew} toggle={toggle}>
        <ModalHeader toggle={toggle} className="no-border">
          {t('Chọn nhân viên')}
        </ModalHeader>
        <ModalBody>
          {map(listStaff, item => (
            <Label check xs="12" className="pl-0 pr-0 ipOptionNV" key={item.LOCNO}>
              <Input
                type="radio"
                name="deliveryRequirement"
                checked={item.LOCNO === idUserSelected}
                value={item.LOCNO}
                onChange={handleChangeSelectUser(item.LOCNO)}
              />{' '}
              {item.NAME_TEXT}
              <div className="pl-4">
                {t('Tuyến')}: {''}
              </div>
            </Label>
          ))}
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

export default ModalChonNhanVien;
