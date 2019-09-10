import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import { get, map, trim, toString } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import moment from 'moment';
import { SipDataState, SipDataType } from 'utils/enums';

interface Props {
  onHide: () => void;
  onSuccessSelected: () => void;
  visible: boolean;
  modalTitle: string;
  forwardingItemList: ForwardingItem[];
  IV_TOR_TYPE: string;
  IV_FR_LOC_ID: string;
  IV_TO_LOC_ID: string;
  IV_CUST_STATUS: string;
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
  } = props;

  const listTaiChuaHoanThanh = useSelector(makeSelectorRow(SipDataType.TAI, SipDataState.CHUA_HOAN_THANH));

  const [radioTorId, setRadioTorId] = useState<string>('');

  useEffect((): void => {
    setRadioTorId(get(listTaiChuaHoanThanh, '[0].TOR_ID'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listTaiChuaHoanThanh]);

  useEffect((): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_FR_DATE: trim(
          toString(
            moment(new Date())
              .subtract(7, 'days')
              .format(' YYYYMMDD'),
          ),
        ),
        IV_TO_DATE: trim(toString(moment(new Date()).format(' YYYYMMDD'))),
        IV_TOR_TYPE: IV_TOR_TYPE,
        IV_FR_LOC_ID: IV_FR_LOC_ID,
        IV_TO_LOC_ID: IV_TO_LOC_ID,
        IV_CUST_STATUS: IV_CUST_STATUS,
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '100',
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function handleChuyenVaoTai(e: FormEvent): void {
    const payload = {
      IV_FLAG: '2',
      IV_TOR_TYPE: IV_TOR_TYPE,
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
            listTaiChuaHoanThanh,
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
        <Button color="primary" onClick={handleChuyenVaoTai}>
          {t('Hoàn thành')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SelectForwardingItemModal;