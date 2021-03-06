import React, { useCallback, useState } from 'react';
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, ButtonProps, ModalProps } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { map, filter } from 'lodash';

import { makeSelectorGet_MT_ZTMI054_OUT } from 'redux/MIOA_ZTMI054/selectors';
import { action_MIOA_ZTMI054 } from '../../redux/MIOA_ZTMI054/actions';
import { makeSelectorBPOrg } from '../../redux/GetProfileByUsername/selectors';

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
  const userMaBp = useSelector(makeSelectorBPOrg);

  const dispatch = useDispatch();

  const [modalCreateNew, setModalCreateNew] = useState<boolean>(false);
  const [idUserSelected, setIdUserSelected] = useState<undefined | string>(undefined);

  const toggle = (): void => {
    if (!modalCreateNew) {
      dispatch(
        action_MIOA_ZTMI054({
          iv_post: userMaBp,
          row: [
            {
              iv_position: 'NVBH',
            },
          ],
          IV_PAGENO: '1',
          IV_NO_PER_PAGE: '10',
        }),
      );
    }

    setModalCreateNew(!modalCreateNew);
  };
  const handleApplyClick = (): void => {
    onApplyChosen(idUserSelected || '');
    setModalCreateNew(!modalCreateNew);
  };
  const listStaff = filter(useSelector(makeSelectorGet_MT_ZTMI054_OUT), item => item.BP !== currentUserId);

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
        {t('Chuy???n ph??n c??ng')}
      </Button>
      <Modal isOpen={modalCreateNew} toggle={toggle} {...modalProps}>
        <ModalHeader toggle={toggle} className="no-border">
          {t('Ch???n nh??n vi??n')}
        </ModalHeader>
        <ModalBody>
          {map(listStaff, item => {
            return (
              <Label check xs="12" className="pl-0 pr-0 ipOptionNV" key={item.BP}>
                <Input
                  type="radio"
                  name="deliveryRequirement"
                  checked={item.BP === idUserSelected}
                  value={item.BP}
                  onChange={handleChangeSelectUser(item.BP)}
                />{' '}
                {item.NAME_TEXT}
                <span className="pl-4-5 display-block">
                  {t('Tuy???n')}: {''}
                </span>
              </Label>
            );
          })}
        </ModalBody>
        <ModalFooter className="no-border">
          <Button color="primary" onClick={handleApplyClick} disabled={!idUserSelected}>
            {t('Ho??n th??nh')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ButtonChonNhanVien;
