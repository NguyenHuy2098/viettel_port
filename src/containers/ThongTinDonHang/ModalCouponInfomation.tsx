import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { get, trim, toNumber, toLower, round, floor, isInteger } from 'lodash';
import moment from 'moment';
import ModalDivideCoupon from './ModalDivideCoupon';
import { toastError } from '../../utils/commonJsx';

interface Props {
  modalCouponInfo: boolean;
  couponInfomation: API.RowMTZTMI031OUT[];
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
const ModalCouponInfo: React.FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation();
  const thongTinPhieuGui = props.couponInfomation;
  const [divideQuantity, setDivideQuantity] = useState<number>(0);
  const [subPackages, setSubPackages] = useState<SubPackage[]>([]);
  const [modalDivideCoupon, setModalDivideCoupon] = useState<boolean>(false);

  function toggleModalDivide(): void {
    setModalDivideCoupon(!modalDivideCoupon);
    setDivideQuantity(0);
  }

  function toggleModal(): void {
    props.toggle();
    setDivideQuantity(0);
  }

  const handleClickDelete = (deleteQuantity: number): void => {
    setDivideQuantity(divideQuantity - deleteQuantity);
  };

  const handerEnterDivideQuantity = (event: React.FormEvent<HTMLInputElement>): void => {
    setDivideQuantity(toNumber(event.currentTarget.value));
  };

  const disableButtonTachPhieu = useMemo((): boolean => {
    if (divideQuantity <= 0) {
      return true;
    }
    return false;
  }, [divideQuantity]);

  const handleDevideCoupon = useCallback((): void => {
    if (isInteger(divideQuantity)) {
      const newSubPackages: SubPackage[] = [];
      if (toNumber(thongTinPhieuGui[0].Quantity) < divideQuantity) {
        setDivideQuantity(toNumber(thongTinPhieuGui[0].Quantity));
        // newSubPackages.push({
        //   ID: 0,
        //   GROSS_WEIGHT: toNumber(thongTinPhieuGui[0].GROSS_WEIGHT),
        //   QUANTITY: toNumber(thongTinPhieuGui[0].Quantity),
        //   QUANTITY_UOM: 'EA',
        //   WEIGHT_UOM: get(thongTinPhieuGui[0], 'WEIGHT_UOM', ''),
        // });
      }
      let soGoiConLai = toNumber(thongTinPhieuGui[0].Quantity);
      const soLuongGoiTrongMotGio = floor(toNumber(thongTinPhieuGui[0].Quantity) / divideQuantity);
      for (let i = 0; i < divideQuantity; i++) {
        if (i === divideQuantity - 1) {
          newSubPackages.push({
            ID: i,
            GROSS_WEIGHT:
              toNumber(thongTinPhieuGui[0].GROSS_WEIGHT) -
              round(toNumber(thongTinPhieuGui[0].GROSS_WEIGHT) / divideQuantity) * (divideQuantity - 1),
            QUANTITY: soGoiConLai,
            QUANTITY_UOM: 'EA',
            WEIGHT_UOM: get(thongTinPhieuGui[0], 'WEIGHT_UOM', ''),
          });
        } else {
          newSubPackages.push({
            ID: i,
            GROSS_WEIGHT: round(toNumber(thongTinPhieuGui[0].GROSS_WEIGHT) / divideQuantity),
            QUANTITY: soLuongGoiTrongMotGio,
            QUANTITY_UOM: 'EA',
            WEIGHT_UOM: get(thongTinPhieuGui[0], 'WEIGHT_UOM', ''),
          });
          soGoiConLai -= soLuongGoiTrongMotGio;
        }
      }

      setSubPackages(newSubPackages);
      setModalDivideCoupon(true);
      props.toggle();
    } else {
      toastError(t('S??? l?????ng t??ch ph???i l?? s??? nguy??n'));
    }
  }, [thongTinPhieuGui, divideQuantity, props, t]);

  useEffect(() => {
    if (isInteger(divideQuantity)) {
      const newSubPackages: SubPackage[] = [];
      let soGoiConLai = toNumber(thongTinPhieuGui[0].Quantity);
      // const khoiLuongMotGoi = toNumber(thongTinPhieuGui[0].GROSS_WEIGHT) / toNumber(thongTinPhieuGui[0].Quantity);
      const soLuongGoiTrongMotGio = floor(toNumber(thongTinPhieuGui[0].Quantity) / divideQuantity);
      for (let i = 0; i < divideQuantity; i++) {
        if (i === divideQuantity - 1) {
          newSubPackages.push({
            ID: i,
            // GROSS_WEIGHT: khoiLuongMotGoi * soGoiConLai,
            GROSS_WEIGHT:
              toNumber(thongTinPhieuGui[0].GROSS_WEIGHT) -
              round(toNumber(thongTinPhieuGui[0].GROSS_WEIGHT) / divideQuantity) * (divideQuantity - 1),
            QUANTITY: soGoiConLai,
            QUANTITY_UOM: 'EA',
            WEIGHT_UOM: get(thongTinPhieuGui[0], 'WEIGHT_UOM', ''),
          });
        } else {
          newSubPackages.push({
            ID: i,
            // GROSS_WEIGHT: khoiLuongMotGoi * soLuongGoiTrongMotGio,
            GROSS_WEIGHT: round(toNumber(thongTinPhieuGui[0].GROSS_WEIGHT) / divideQuantity),
            QUANTITY: soLuongGoiTrongMotGio,
            QUANTITY_UOM: 'EA',
            WEIGHT_UOM: get(thongTinPhieuGui[0], 'WEIGHT_UOM', ''),
          });
          soGoiConLai -= soLuongGoiTrongMotGio;
        }
      }
      setSubPackages(newSubPackages);
    }
  }, [divideQuantity, thongTinPhieuGui]);

  const modalBody = (): JSX.Element => (
    <Row className="sipPackageInfo">
      <Col lg="6" xl={6} xs="12">
        <Row>
          <Col xs="4">{t('M?? phi???u')}: </Col>
          <Col style={{ fontWeight: 600 }} xs="7">
            {toNumber(get(thongTinPhieuGui[0], 'FWO', ''))}
          </Col>
        </Row>
        <Row>
          <Col xs="4">{t('Ng??y g???i')}: </Col>
          <Col style={{ fontWeight: 600 }} xs="7">
            {moment(trim(get(thongTinPhieuGui[0], 'CREATED_ON'), ''), 'YYYYMMDD').format('DD/MM/YYYY')}
          </Col>
        </Row>
      </Col>
      <Col lg="6" xs="12" xl={6}>
        <Row>
          <Col xs="4">{t('S??? l?????ng')}: </Col>
          <Col style={{ fontWeight: 600 }} xs="7">
            {toNumber(get(thongTinPhieuGui[0], 'Quantity', '0'))}
          </Col>
        </Row>
        <Row>
          <Col xs="4">{t('Tr???ng l?????ng')}: </Col>
          <Col style={{ fontWeight: 600 }} xs="7">{`${toNumber(
            get(thongTinPhieuGui[0], 'GROSS_WEIGHT', '0'),
          )} ${toLower(get(thongTinPhieuGui[0], 'WEIGHT_UOM', ''))}`}</Col>
        </Row>
      </Col>
      <Col xs={12} className="mt-3" style={{ marginLeft: 15, alignItems: 'center' }}>
        <Row>
          <Label style={{ alignSelf: 'center', margin: 0 }}>{t('S??? l?????ng t??ch')}</Label>
          <div className="sipInputQuantity">
            <Input type="number" onChange={handerEnterDivideQuantity} value={divideQuantity} />
          </div>
        </Row>
      </Col>
    </Row>
  );

  return (
    <>
      <Modal isOpen={props.modalCouponInfo} toggle={toggleModal} className="sipModalCouponInfo">
        <ModalHeader toggle={toggleModal}>{t('T??ch ki???n')}</ModalHeader>
        <ModalBody>{modalBody()}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDevideCoupon} disabled={disableButtonTachPhieu}>
            {t('T??ch phi???u')}
          </Button>
        </ModalFooter>
      </Modal>
      <ModalDivideCoupon
        handleClickDelete={handleClickDelete}
        toggle={toggleModalDivide}
        modalDivideCoupon={modalDivideCoupon}
        infoPackages={subPackages}
        thongTinPhieuGui={thongTinPhieuGui}
      />
    </>
  );
};

export default ModalCouponInfo;
