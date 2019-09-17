import React, { useCallback, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { forEach, noop, map, get, toNumber, trim, toLower, round, size } from 'lodash';
import moment from 'moment';

import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { select_MT_ZTMI031_OUT } from 'redux/MIOA_ZTMI031/selectors';
import { testData } from './helper';

let tempDivideQuantity = 0;

interface SubPackage {
  ID: number;
  QUANTITY: number;
  QUANTITY_UOM: string;
  GROSS_WEIGHT: number;
  WEIGHT_UOM: string;
}

// eslint-disable-next-line max-lines-per-function
const SplitCoupon: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [showDivideCouponUI, setShowDivideCouponUI] = useState<boolean>(false);
  const [searchKey, setSearchkey] = useState<string>('');
  const [divideQuantity, setDivideQuantity] = useState<number>(0);
  const [subPackages, setSubPackages] = useState<SubPackage[]>([]);

  const thongTinPhieuGui = useSelector(select_MT_ZTMI031_OUT);

  // eslint-disable-next-line
  console.log('divideQuantity', divideQuantity);

  function renderShippingInformationTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Tách phiếu gửi')}</h1>
      </Row>
    );
  }

  // function renderListCouponTitle(): JSX.Element {
  //   return (
  //     <Row className="mb-3 sipTitleContainer">
  //       <h1 className="sipTitle">{t('Danh sách phiếu gửi')}</h1>
  //       <div className="sipTitleRightBlock">
  //         <Button className="sipTitleRightBlockBtnIcon">
  //           <i className="fa fa-trash-o" />
  //         </Button>
  //         <Button>
  //           <i className="fa fa-barcode" />
  //           {t('In mã vạch')}
  //         </Button>
  //         <Button>
  //           <i className="fa fa-print" />
  //           {t(' In mã phiếu')}
  //         </Button>
  //       </div>
  //     </Row>
  //   );
  // }

  const handerEnterDivideQuantity = (event: React.FormEvent<HTMLInputElement>): void => {
    tempDivideQuantity = toNumber(event.currentTarget.value);
  };

  const handleDevideCoupon = useCallback((): void => {
    if (size(testData) === 1) {
      const newSubPackages: SubPackage[] = [];
      if (toNumber(testData[0].Quantity) < tempDivideQuantity) {
        newSubPackages.push({
          ID: 0,
          GROSS_WEIGHT: toNumber(testData[0].GROSS_WEIGHT),
          QUANTITY: toNumber(testData[0].Quantity),
          QUANTITY_UOM: 'EA',
          WEIGHT_UOM: 'G',
        });
      } else {
        for (let i = 0; i < tempDivideQuantity; i++) {
          if (i === tempDivideQuantity - 1) {
            newSubPackages.push({
              ID: i,
              GROSS_WEIGHT:
                toNumber(testData[0].GROSS_WEIGHT) -
                round(toNumber(testData[0].GROSS_WEIGHT) / tempDivideQuantity) * (tempDivideQuantity - 1),
              QUANTITY:
                toNumber(testData[0].Quantity) -
                round(toNumber(testData[0].Quantity) / tempDivideQuantity) * (tempDivideQuantity - 1),
              QUANTITY_UOM: 'EA',
              WEIGHT_UOM: 'G',
            });
          } else {
            newSubPackages.push({
              ID: i,
              GROSS_WEIGHT: round(toNumber(testData[0].GROSS_WEIGHT) / tempDivideQuantity),
              QUANTITY: round(toNumber(testData[0].Quantity) / tempDivideQuantity),
              QUANTITY_UOM: 'EA',
              WEIGHT_UOM: 'G',
            });
          }
        }
      }
      setSubPackages(newSubPackages);
      setShowDivideCouponUI(true);
      setDivideQuantity(tempDivideQuantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testData]);

  const handleOnChangeQuantiy = (subPackageId: number) => (event: React.FormEvent<HTMLInputElement>): void => {
    const newSubPackages = [...subPackages];
    forEach(newSubPackages, subPackage => {
      if (subPackage.ID === subPackageId) {
        subPackage.QUANTITY = toNumber(event.currentTarget.value);
      }
    });
    setSubPackages(newSubPackages);
  };

  const handleChangeWeight = (subPackageId: number) => (event: React.FormEvent<HTMLInputElement>): void => {
    const newSubPackages = [...subPackages];
    forEach(newSubPackages, subPackage => {
      if (subPackage.ID === subPackageId) {
        subPackage.GROSS_WEIGHT = toNumber(event.currentTarget.value);
      }
    });
    setSubPackages(newSubPackages);
  };

  // eslint-disable-next-line max-lines-per-function
  const renderTableRows = (): React.ReactNode => {
    return map(
      subPackages,
      (subPackage: SubPackage, index: number): JSX.Element => {
        return (
          <Row className="mb-2" key={index}>
            <Col xs="4" lg="4">
              Bưu gửi {index}
            </Col>
            <Col xs="4" lg="4">
              <Input
                className="text-center"
                type="text"
                value={subPackage.QUANTITY}
                onChange={handleOnChangeQuantiy(subPackage.ID)}
              />
            </Col>
            <Col xs="4" lg="4">
              <Input
                className="text-center"
                type="text"
                value={subPackage.GROSS_WEIGHT}
                onChange={handleChangeWeight(subPackage.ID)}
              />
            </Col>
          </Row>
        );
      },
    );
  };

  const dispatchActionApi_ZTMI213 = (): void => {
    noop();
  };

  const renderDivideCouponUI = (): JSX.Element => {
    return (
      <>
        <Row className="mb-3 sipTitleContainer">
          <h1 className="sipTitle">{t('Danh sách phiếu gửi')}</h1>
          <div className="sipTitleRightBlock">
            <Button onClick={dispatchActionApi_ZTMI213}>
              <i className="fa fa-check-square-o" />
              {t('Hoàn thành')}
            </Button>
          </div>
        </Row>
        <Row className="sipSummaryContent">
          <Col lg="8" xs="12">
            <Row className="color-bluegreen mb-3">
              <Col xs="4" lg="4">
                {t('Mã phiếu gửi')}
              </Col>
              <Col xs="4" lg="4">
                {t('Số lượng')}
              </Col>
              <Col xs="4" lg="4">
                {t('Trọng lượng')}
              </Col>
            </Row>
            {renderTableRows()}
          </Col>
        </Row>
      </>
    );
  };

  function renderCouponInformation(): JSX.Element {
    return (
      <Row className="sipSummaryContent">
        <Col lg="4" xs="12">
          <Row>
            <Col xs="4">{t('Mã phiếu')}: </Col>
            <Col xs="6">{testData[0].FWO}</Col>
          </Row>

          <Row>
            <Col xs="4">{t('Ngày gửi')}: </Col>
            <Col xs="6">{moment(trim(testData[0].CREATED_ON), 'YYYYMMDD').format('DD/MM/YYYY')}</Col>
          </Row>
        </Col>
        <Col lg="4" xs="12">
          <Row>
            <Col xs="4">{t('Số lượng')}: </Col>
            <Col xs="4">{toNumber(testData[0].Quantity)}</Col>
          </Row>
          <Row>
            <Col xs="4">{t('Trọng lượng')}: </Col>
            <Col xs="4">{`${parseFloat(testData[0].GROSS_WEIGHT || '0')} ${toLower(
              get(thongTinPhieuGui, 'WEIGHT_UOM', ''),
            )}`}</Col>
          </Row>
        </Col>
        <Col xs={12} className="mt-3">
          <Label className="mr-3">{t('Số lượng tách')}</Label>
          <div className="sipScanCodeContainer">
            <Input type="number" onChange={handerEnterDivideQuantity} />
            <Button color="primary" onClick={handleDevideCoupon}>
              Tách phiếu
            </Button>
          </div>
        </Col>
      </Row>
    );
  }

  // function renderFindCoupon(): JSX.Element {
  //   return (
  //     <Row className="sipBgWhiteContainer">
  //       <Label className="mr-3">
  //         {t('Mã phiếu gửi')}
  //         <span className="color-red"> *</span>
  //       </Label>
  //       <div className="sipScanCodeContainer">
  //         <Input type="text" placeholder="Nhập mã phiếu gửi" />
  //         <Button color="primary">Quét mã</Button>
  //       </div>
  //     </Row>
  //   );
  // }

  // function renderListCoupon(): JSX.Element {
  //   return (
  //     <Row className="sipSummaryContent">
  //       <Col lg="8" xs="12">
  //         <Row className="color-bluegreen mb-3">
  //           <Col xs="6" lg="5">
  //             {t('Mã phiếu gửi')}
  //           </Col>
  //           <Col xs="6" lg="7">
  //             {t('Trọng lượng')}
  //           </Col>
  //         </Row>
  //         <Row className="mb-2">
  //           <Col xs="6" lg="5">
  //             <Label check>
  //               <Input type="checkbox" />
  //               V00596290_01
  //             </Label>
  //           </Col>
  //           <Col xs="6" lg="7">
  //             <Input className="text-center" type="text" defaultValue="250 g" />
  //           </Col>
  //         </Row>
  //         <Row className="mb-2">
  //           <Col xs="6" lg="5">
  //             <Label check>
  //               <Input type="checkbox" />
  //               V00596290_01
  //             </Label>
  //           </Col>
  //           <Col xs="6" lg="7">
  //             <Input className="text-center" type="text" defaultValue="50 g" />
  //           </Col>
  //         </Row>
  //         <Row className="mb-2">
  //           <Col xs="6" lg="5">
  //             <Label check>
  //               <Input type="checkbox" />
  //               V00596290_01
  //             </Label>
  //           </Col>
  //           <Col xs="6" lg="7">
  //             <Input className="text-center" type="text" defaultValue="400 g" />
  //           </Col>
  //         </Row>
  //       </Col>
  //     </Row>
  //   );
  // }

  const dispatchActionAPI_ZTMI031 = useCallback((): void => {
    dispatch(action_MIOA_ZTMI031({ FWO_ID: searchKey, Buyer_reference_Number: '' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const changeSearchKeyValue = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
    setSearchkey(event.currentTarget.value);
  }, []);

  return (
    <div>
      {renderShippingInformationTitle()}
      <div className="shadow-sm p-3 mb-3 bg-white">
        <Row>
          <div className="btn-toolbar col-10">
            <div className="sipTitleRightBlockInput col-4 p-0 m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('Tìm kiếm phiếu gửi')} onChange={changeSearchKeyValue} />
            </div>
            <Button className="ml-2" color="primary" onClick={dispatchActionAPI_ZTMI031}>
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Row>
      </div>
      {size(thongTinPhieuGui) > 0 && renderCouponInformation()}
      {showDivideCouponUI && renderDivideCouponUI()}
      {/*{renderListCouponTitle()}*/}
      {/*{renderListCoupon()}*/}
    </div>
  );
};

export default SplitCoupon;
