import React, { useEffect, useState } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { get, join, map, toString, trim } from 'lodash';
import moment from 'moment';

import { makeSelectorMaBP } from 'redux/auth/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { SipFlowType } from 'utils/enums';
import HttpRequestError from 'utils/HttpRequetsError';
import { toastError, toastSuccess } from '../Toast';

interface Props {
  onHide: () => void;
  onSuccessSelected?: (torId: string) => void;
  visible: boolean;
  modalTitle: string;
  forwardingItemList: API.TITEM[];
  IV_TOR_TYPE: string;
  IV_TO_LOC_ID: string;
  IV_CUST_STATUS: number;
  TorTypeChuyenVao?: string;
  isFrom2?: boolean;
}

// eslint-disable-next-line max-lines-per-function
const SelectForwardingItemModal: React.FC<Props> = (props: Props): JSX.Element => {
  const {
    onHide,
    onSuccessSelected,
    visible,
    modalTitle,
    forwardingItemList,
    IV_TOR_TYPE,
    IV_TO_LOC_ID,
    IV_CUST_STATUS,
    TorTypeChuyenVao,
  } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userMaBp = useSelector(makeSelectorMaBP);
  const [listItems, setListItems] = useState<API.RowMTZTMI047OUT[]>([]);
  const [radioTorId, setRadioTorId] = useState<string>('');

  const getListItems = (): void => {
    if (visible) {
      dispatch(
        action_MIOA_ZTMI047(
          {
            IV_FR_DATE: moment()
              .subtract(7, 'days')
              .format('YYYYMMDD'),
            IV_TOR_TYPE: IV_TOR_TYPE,
            IV_FR_LOC_ID: userMaBp,
            IV_CUST_STATUS: IV_CUST_STATUS,
            IV_NO_PER_PAGE: '1000',
          },
          {
            onSuccess: (data: MIOAZTMI047PayloadType): void => {
              setListItems(get(data, 'data.MT_ZTMI047_OUT.Row'));
            },
          },
          {
            flow: SipFlowType.KHAI_THAC_DI,
            stateless: true,
          },
        ),
      );
    }
  };

  useEffect((): void => {
    getListItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleChuyenVaoForwardingItem = (): void => {
    const payload = {
      IV_FLAG: '2',
      IV_TOR_TYPE: TorTypeChuyenVao ? TorTypeChuyenVao : IV_TOR_TYPE,
      IV_TOR_ID_CU: radioTorId,
      IV_SLOCATION: userMaBp,
      IV_DLOCATION: IV_TO_LOC_ID,
      IV_DESCRIPTION: '',
      T_ITEM: forwardingItemList,
    };
    dispatch(
      action_MIOA_ZTMI016(payload, {
        onSuccess: (): void => {
          toastSuccess(t('Chuyển vào thành công.'));
          onSuccessSelected && onSuccessSelected(radioTorId);
        },
        onFailure: (error: HttpRequestError): void => {
          if (error) {
            toastError(join(error.messages, ' '));
          } else {
            toastError(t('Lỗi không xác định khi chuyển vào.'));
          }
        },
        onFinish: (): void => {
          getListItems();
          onHide && onHide();
        },
      }),
    );
  };

  const handleChangeForwardingItem = (event: React.FormEvent<HTMLInputElement>): void => {
    setRadioTorId(event.currentTarget.value);
  };

  return (
    <Modal isOpen={visible} className="sipTitleModalCreateNew">
      <ModalHeader toggle={onHide}>{modalTitle}</ModalHeader>
      <ModalBody className="sipSelectForwardingItemContainer">
        <FormGroup>
          {map(
            listItems,
            (item: API.RowMTZTMI047OUT): JSX.Element => (
              <Label key={item.TOR_ID} check className="selectForwardingItem row">
                <Input
                  type="radio"
                  name="selectForwardingItem"
                  value={item.TOR_ID}
                  checked={item.TOR_ID === radioTorId}
                  onChange={handleChangeForwardingItem}
                />
                <p>
                  <span>{item.TOR_ID}</span>
                  <span>{get(item, 'CREATED_BY', '') || ''}</span>
                  {props.isFrom2 ? (
                    <span>{get(item, 'Childs[0].DESCRIPTION') || ''}</span>
                  ) : (
                    <span>{trim(toString(moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format('DD/MM/YYYY')))}</span>
                  )}
                </p>
                <span>
                  <span>{item.LOG_LOCID_TO}</span>
                  <span>SL: {item.ITEM_NO}</span>
                  {props.isFrom2 ? (
                    <span>
                      {trim(toString(moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format('DD/MM/YYYY - HH:mm:ss')))}
                    </span>
                  ) : null}
                </span>
              </Label>
            ),
          )}
        </FormGroup>
      </ModalBody>
      <ModalFooter className="justify-content-end">
        <Button color="primary" onClick={handleChuyenVaoForwardingItem}>
          {t('Hoàn tất')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SelectForwardingItemModal;
