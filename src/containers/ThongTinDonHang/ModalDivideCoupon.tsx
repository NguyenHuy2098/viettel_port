import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { get, toNumber, toLower, map, toString, forEach, includes } from 'lodash';
import { toast } from 'react-toastify';
import { default as NumberFormat, NumberFormatValues } from 'react-number-format';
import { action_ZTMI213 } from 'redux/ZTMI213/actions';
import { useDispatch } from 'react-redux';
import { toastError } from '../../utils/commonJsx';

interface Props {
  modalDivideCoupon: boolean;
  infoPackages: SubPackage[];
  thongTinPhieuGui: API.RowMTZTMI031OUT[];
  handleClickDelete: (deleteQuantity: number) => void;
  toggle: () => void;
}
interface SubPackage {
  ID: number;
  QUANTITY: number;
  QUANTITY_UOM: string;
  GROSS_WEIGHT: number;
  WEIGHT_UOM: string;
  CHECKED?: boolean;
}

// eslint-disable-next-line max-lines-per-function
const ModalDivideConpon: React.FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [subPackages, setSubPackages] = useState<SubPackage[]>([]);
  const [deleteQuantity, setDeleteQuantity] = useState<number>(0);
  const [trackCheckedItem, setTrackCheckedItem] = useState<boolean[]>(new Array(subPackages.length));

  const handleOnChangeQuantiy = (subPackageId: number) => (event: React.FormEvent<HTMLInputElement>): void => {
    const newSubPackages = [...subPackages];
    forEach(newSubPackages, subPackage => {
      if (subPackage.ID === subPackageId) {
        subPackage.QUANTITY = toNumber(event.currentTarget.value);
      }
      subPackage.CHECKED = false;
    });

    setSubPackages(newSubPackages);
  };

  useEffect(() => {
    setSubPackages(props.infoPackages);
  }, [props.infoPackages]);

  const handleChangeWeight = (subPackageId: number) => (event: NumberFormatValues): void => {
    const newSubPackages = [...subPackages];
    forEach(newSubPackages, subPackage => {
      if (subPackage.ID === subPackageId) {
        subPackage.GROSS_WEIGHT = toNumber(event.value);
      }
    });
    setSubPackages(newSubPackages);
  };

  function handleChangeCheckBox(checked: boolean): void {
    if (checked === true) {
      setDeleteQuantity(deleteQuantity + 1);
    } else {
      setDeleteQuantity(deleteQuantity - 1);
    }
  }

  function getOnChangeChecked(subPackage: SubPackage) {
    return (e: ChangeEvent<HTMLInputElement>): void => {
      handleChangeCheckBox(e.target.checked);
      trackCheckedItem[subPackage.ID] = e.target.checked;
      setTrackCheckedItem(trackCheckedItem);
    };
  }

  const renderTableRows = (): React.ReactNode => {
    return map(
      subPackages,
      (subPackage: SubPackage, index: number): JSX.Element => {
        // console.log(subPackage, 'sub');
        return (
          <Row className="mb-2" key={index}>
            <Col xs="4" lg="4" style={{ alignSelf: 'center' }}>
              <Label check>
                <Input
                  value={subPackage.ID}
                  type="checkbox"
                  checked={trackCheckedItem[subPackage.ID] || false}
                  onChange={getOnChangeChecked(subPackage)}
                />
              </Label>
              B??u g???i {index + 1}
            </Col>
            <Col xs="4" lg="4">
              <Input
                className="text-center"
                type="text"
                value={toString(subPackage.QUANTITY)}
                onChange={handleOnChangeQuantiy(subPackage.ID)}
                style={{ width: 165 }}
              />
            </Col>
            <Col xs="4" lg="4">
              <NumberFormat
                className="text-center form-control"
                value={subPackage.GROSS_WEIGHT}
                suffix={` ${toLower(props.thongTinPhieuGui[0].WEIGHT_UOM)}`}
                style={{ width: 165 }}
                onValueChange={handleChangeWeight(subPackage.ID)}
              />
            </Col>
          </Row>
        );
      },
    );
  };

  const totalQuantityInvalid = (subPackages: SubPackage[]): boolean => {
    let totalSubPackagesQuantity = 0;
    for (let i = 0; i < subPackages.length; i++) {
      totalSubPackagesQuantity += subPackages[i].QUANTITY;
      if (subPackages[i].QUANTITY === 0) return true;
    }
    return totalSubPackagesQuantity !== toNumber(props.thongTinPhieuGui[0].Quantity);
  };

  const totalWeightInvalid = (subPackages: SubPackage[]): boolean => {
    let totalSubPackagesWeight = 0;
    for (let i = 0; i < subPackages.length; i++) {
      totalSubPackagesWeight += subPackages[i].GROSS_WEIGHT;
      if (subPackages[i].GROSS_WEIGHT === 0) return true;
    }

    return totalSubPackagesWeight !== toNumber(props.thongTinPhieuGui[0].GROSS_WEIGHT);
  };

  const dispatchActionApi_ZTMI213 = (): void => {
    for (let i = 0; i < subPackages.length; i++) {
      if (subPackages[i].QUANTITY === 0) {
        toastError(t('S??? l?????ng b??u g???i ph???i kh??c 0'));
        return;
      }
      if (subPackages[i].GROSS_WEIGHT === 0) {
        toastError(t('Tr???ng l?????ng b??u g???i ph???i kh??c 0'));
        return;
      }
    }
    if (totalQuantityInvalid(subPackages)) {
      toastError(t('T???ng s??? l?????ng t??ch kh??ng h???p l??? '));
      return;
    }

    if (totalWeightInvalid(subPackages)) {
      toastError(t('T???ng kh???i l?????ng t??ch kh??ng h???p l??? '));
      return;
    }
    dispatch(
      action_ZTMI213(
        {
          PACKAGE_ID: props.thongTinPhieuGui[0].PACKAGE_ID,
          row: subPackages,
        },
        {
          onSuccess: (data: API.ZTMI213Response): void => {
            toast(
              <>
                <i className="fa fa-check-square mr-2" />
                {t('T??ch ki???n th??nh c??ng')}
              </>,
              {
                containerId: 'ModalDivideConpon',
                type: 'success',
              },
            );
            props.toggle();
            window.location.reload();
          },
          onFailure: (error: Error): void => {
            const errorMessage = get(error, 'messages', '???? c?? l???i x???y ra ');
            const message = includes(errorMessage, '306') ? t('Ch??? cho ph??p t??ch ki???n ??? tr???ng th??i 306') : errorMessage;
            toastError(message);
          },
        },
      ),
    );
  };

  function getHandleDelete() {
    return (): void => {
      props.handleClickDelete(deleteQuantity);
      setTrackCheckedItem(new Array(subPackages.length - deleteQuantity));
      setDeleteQuantity(0);
    };
  }

  return (
    <Modal isOpen={props.modalDivideCoupon} className="sipModalCouponInfo" toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>{t('T??ch ki???n')}</ModalHeader>
      <ModalBody>
        <Row className="sipPackageInfo">
          <Col xs="12">
            <Row className="color-bluegreen mb-3">
              <Col xs="4" lg="4" className="sipLabel">
                {t('Danh s??ch b??u g???i')}
              </Col>
              <Col xs="4" lg="4" className="sipLabel">
                {t('S??? l?????ng')}
              </Col>
              <Col xs="4" lg="4" className="sipLabel">
                {t('Tr???ng l?????ng')}
              </Col>
            </Row>
            {renderTableRows()}
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" disabled={deleteQuantity === 0} onClick={getHandleDelete()}>
          {t('X??a')}
        </Button>
        <Button color="primary" onClick={dispatchActionApi_ZTMI213}>
          {t('X??c nh???n')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDivideConpon;
