import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import { get, map, trim, toString } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import moment from 'moment';

interface Props {
  onHide: () => void;
  onSuccessSelected: () => void;
  visible: boolean;
  modalTitle: string;
  forwardingItemList: ForwardingItem[];
  IV_TOR_TYPE: string;
  TorTypeChuyenVao?: string;
  IV_FR_LOC_ID: string;
  IV_TO_LOC_ID: string;
  IV_CUST_STATUS: number;
}

// eslint-disable-next-line max-lines-per-function
const SelectForwardingItemModal: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    onHide,
    onSuccessSelected,
    visible,
    modalTitle,
    forwardingItemList,
    IV_TOR_TYPE,
    IV_FR_LOC_ID,
    IV_TO_LOC_ID,
    IV_CUST_STATUS,
    TorTypeChuyenVao,
  } = props;

  const listForwardingItemChuaHoanThanh = useSelector(makeSelectorRow(IV_TOR_TYPE, IV_CUST_STATUS));

  const [radioTorId, setRadioTorId] = useState<string>('');

  useEffect((): void => {
    setRadioTorId(get(listForwardingItemChuaHoanThanh, '[0].TOR_ID'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listForwardingItemChuaHoanThanh]);

  useEffect((): void => {
    if (visible) {
      const payload047 = {
        IV_TOR_ID: '',
        IV_FR_DATE: trim(
          toString(
            moment()
              .subtract(7, 'days')
              .format(' YYYYMMDD'),
          ),
        ),
        IV_TO_DATE: trim(toString(moment().format(' YYYYMMDD'))),
        IV_TOR_TYPE: IV_TOR_TYPE,
        IV_FR_LOC_ID: IV_FR_LOC_ID,
        IV_TO_LOC_ID: IV_TO_LOC_ID,
        IV_CUST_STATUS: IV_CUST_STATUS,
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '100',
      };
      dispatch(action_MIOA_ZTMI047(payload047));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function handleChuyenVaoForwardingItem(e: FormEvent): void {
    const payload = {
      IV_FLAG: '2',
      IV_TOR_TYPE: TorTypeChuyenVao ? TorTypeChuyenVao : IV_TOR_TYPE,
      IV_TOR_ID_CU: radioTorId,
      IV_SLOCATION: 'BDH',
      IV_DLOCATION: 'HUB1',
      IV_DESCRIPTION: '',
      T_ITEM: forwardingItemList,
    };
    dispatch(
      action_MIOA_ZTMI016(payload, {
        onSuccess: (): void => {
          alert(t('Thành công!'));
          onSuccessSelected();
        },
        onFailure: (): void => {
          alert(t('Có lỗi xảy ra!'));
        },
        onFinish: (): void => onHide(),
      }),
    );
  }

  const handleChangeForwardingItem = (event: React.FormEvent<HTMLInputElement>): void => {
    setRadioTorId(event.currentTarget.value);
  };

  return (
    <Modal isOpen={visible} className="sipTitleModalCreateNew">
      <ModalHeader toggle={onHide}>{modalTitle}</ModalHeader>
      <ModalBody>
        <FormGroup>
          {map(
            listForwardingItemChuaHoanThanh,
            (item: API.RowMTZTMI047OUT): JSX.Element => {
              return (
                <Label key={item.TOR_ID} check className="selectForwardingItem row">
                  <Input
                    type="radio"
                    name="selectForwardingItem"
                    value={item.TOR_ID}
                    onChange={handleChangeForwardingItem}
                  />
                  <p>
                    <span>{item.TOR_ID}</span>
                    <span>TRUNGVT</span>
                    <span>{trim(toString(moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format('DD/MM/YYYY')))}</span>
                  </p>
                  <span>
                    <span>{item.LOG_LOCID_TO}</span>
                    <span>SL: {item.ITEM_NO}</span>
                  </span>
                </Label>
              );
            },
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
