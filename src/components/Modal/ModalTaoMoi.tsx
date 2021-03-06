import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import { get, first } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectorGet_MT_ZTMI045_OUT } from 'redux/MIOA_ZTMI045/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { makeSelectorBPOrg } from 'redux/GetProfileByUsername/selectors';
import TypeaheadDiemDen from 'components/Input/TypeaheadDiemDen';
import { toast } from 'react-toastify';

interface Props {
  onHide: () => void;
  onSuccessCreated: () => void;
  visible: boolean;
  modalTitle: string;
  IV_TOR_TYPE: string;
}

// eslint-disable-next-line max-lines-per-function
const CreateForwardingItemModal: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { onHide, onSuccessCreated, visible, modalTitle, IV_TOR_TYPE } = props;
  const userMaBp = useSelector(makeSelectorBPOrg);

  const postOfficeList = useSelector(makeSelectorGet_MT_ZTMI045_OUT);

  const [note, setNote] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

  useEffect((): void => {
    setDestination(get(postOfficeList, '[0].LOCNO', ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postOfficeList]);

  const payloadCreate = {
    IV_FLAG: '1',
    IV_TOR_TYPE: IV_TOR_TYPE,
    IV_TOR_ID_CU: '',
    IV_SLOCATION: userMaBp,
    IV_DLOCATION: destination,
    IV_DESCRIPTION: note,
    T_ITEM: [
      {
        ITEM_ID: '',
        ITEM_TYPE: '',
      },
    ],
  };

  function handleCreate(e: FormEvent): void {
    e.preventDefault();
    dispatch(
      action_MIOA_ZTMI016(payloadCreate, {
        onSuccess: (data: API.MIOAZTMI016Response): void => {
          onSuccessCreated();
          const thisId = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
          toast(
            <>
              <i className="fa fa-check-square mr-2" />
              {t('T???o b???ng k??')} {thisId} {t('th??nh c??ng')}
            </>,
            {
              type: 'success',
            },
          );
          // alert(`T???o th??nh c??ng! M??: ${thisId}`);
        },
        onFailure: (): void => {
          toast(
            <>
              <i className="fa fa-window-close mr-2" />
              {t('???? c?? l???i x???y ra ')}
            </>,
            {
              type: 'error',
            },
          );
          // alert(t('C?? l???i x???y ra!'));
        },
        onFinish: (): void => {
          setNote('');
          setDestination(get(postOfficeList, '[0].LOCNO', ''));
          onHide();
        },
      }),
    );
  }

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  }

  const handleChangePostOffice = (items: TypeaheadOption[]): void => {
    setDestination(get(first(items), 'id', ''));
  };

  return (
    <Modal isOpen={visible} className="sipTitleModalCreateNew">
      <ModalHeader toggle={onHide}>{modalTitle}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>{t('Ch???n ??i???m ?????n')}</Label>
          <TypeaheadDiemDen postOfficeList={postOfficeList} onChange={handleChangePostOffice} value={destination} />
        </FormGroup>
        <FormGroup>
          <Label>{t('Ghi ch??')}</Label>
          <Input
            value={note}
            onChange={handleChangeTextboxValue(setNote)}
            type="textarea"
            placeholder={t('Nh???p ghi ch?? (Kh??ng b???t bu???c)')}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter className="justify-content-end">
        <Button color="primary" onClick={handleCreate}>
          {t('Ghi l???i')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateForwardingItemModal;
