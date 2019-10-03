import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import { get, map } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectorGet_MT_ZTMI045_OUT } from 'redux/MIOA_ZTMI045/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { makeSelectorMaBP } from 'redux/auth/selectors';

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
  const userMaBp = useSelector(makeSelectorMaBP);

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
          alert(`Tạo thành công! Mã: ${thisId}`);
        },
        onFailure: (): void => {
          alert(t('Có lỗi xảy ra!'));
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

  const handleChangePostOffice = (event: React.FormEvent<HTMLInputElement>): void => {
    setDestination(event.currentTarget.value);
  };

  return (
    <Modal isOpen={visible} className="sipTitleModalCreateNew">
      <ModalHeader toggle={onHide}>{modalTitle}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>{t('Chọn điểm đến')}</Label>
          <Input type="select" onChange={handleChangePostOffice} defaultValue={destination}>
            {map(postOfficeList, (item: API.RowMTZTMI045OUT, index: number) => {
              return (
                <option key={index} value={item.LOCNO}>
                  {item.DESCR40}
                </option>
              );
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>{t('Ghi chú')}</Label>
          <Input
            value={note}
            onChange={handleChangeTextboxValue(setNote)}
            type="textarea"
            placeholder={t('Nhập ghi chú (Không bắt buộc)')}
          />
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

export default CreateForwardingItemModal;
