/* eslint-disable max-lines */
import React, { useCallback, useMemo, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  floor,
  round,
  forEach,
  noop,
  map,
  get,
  isInteger,
  isNil,
  toNumber,
  toString,
  trim,
  toLower,
  size,
} from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import { Cell } from 'react-table';
import moment from 'moment';

import { action_ZTMI213 } from 'redux/ZTMI213/actions';
import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { select_MT_ZTMI031_OUT } from 'redux/MIOA_ZTMI031/selectors';
import { select_ZTMI213 } from 'redux/ZTMI213/selectors';

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
  const [showListCoupon, setShowListCoupon] = useState<boolean>(false);
  const [enableDivideButton, setEnableDivideButton] = useState<boolean>(true);

  const thongTinPhieuGui = useSelector(select_MT_ZTMI031_OUT);
  const ZTMI213_ResponseRow = useSelector(select_ZTMI213);

  function renderShippingInformationTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Tách kiện')}</h1>
      </Row>
    );
  }

  function renderListCouponTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Danh sách phiếu gửi')}</h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-trash-o" />
          </Button>
          <Button color="primary" className="ml-2">
            <i className="fa fa-barcode mr-2" />
            {t('In mã vạch')}
          </Button>
          <Button color="primary" className="ml-2">
            <i className="fa fa-print mr-2" />
            {t(' In mã phiếu')}
          </Button>
          {/*<Button onClick={dispatchActionApi_ZTMI213}>*/}
          {/*  <i className="fa fa-check-square-o" />*/}
          {/*  {t('Hoàn thành')}*/}
          {/*</Button>*/}
        </div>
      </Row>
    );
  }

  const handerEnterDivideQuantity = (event: React.FormEvent<HTMLInputElement>): void => {
    setDivideQuantity(toNumber(event.currentTarget.value));
  };

  // eslint-disable-next-line max-lines-per-function
  const handleDevideCoupon = useCallback((): void => {
    if (size(thongTinPhieuGui) === 1 && isInteger(divideQuantity)) {
      const newSubPackages: SubPackage[] = [];
      if (toNumber(thongTinPhieuGui[0].Quantity) < divideQuantity) {
        newSubPackages.push({
          ID: 0,
          GROSS_WEIGHT: toNumber(thongTinPhieuGui[0].GROSS_WEIGHT),
          QUANTITY: toNumber(thongTinPhieuGui[0].Quantity),
          QUANTITY_UOM: 'EA',
          WEIGHT_UOM: get(thongTinPhieuGui[0], 'WEIGHT_UOM', ''),
        });
      } else {
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
      }
      setSubPackages(newSubPackages);
      setShowDivideCouponUI(true);
    } else {
      if (!isInteger(divideQuantity)) {
        toast(
          <>
            <i className="fa fa-window-close-o mr-2" />
            {t('Số lượng tách phải là số nguyên')}
          </>,
          {
            containerId: 'SplitCoupon',
            type: 'error',
          },
        );
      } else {
        toast(
          <>
            <i className="fa fa-window-close-o mr-2" />
            {t('Phiếu gửi không đủ tiêu chí để tách')}
          </>,
          {
            containerId: 'SplitCoupon',
            type: 'error',
          },
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thongTinPhieuGui, divideQuantity]);

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
                defaultValue={toString(subPackage.QUANTITY)}
                onChange={handleOnChangeQuantiy(subPackage.ID)}
              />
            </Col>
            <Col xs="4" lg="4">
              <Input
                className="text-center"
                type="number"
                defaultValue={`${subPackage.GROSS_WEIGHT}`}
                onChange={handleChangeWeight(subPackage.ID)}
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
    }

    return totalSubPackagesQuantity !== toNumber(thongTinPhieuGui[0].Quantity);
  };

  const totalWeightInvalid = (subPackages: SubPackage[]): boolean => {
    let totalSubPackagesWeight = 0;
    for (let i = 0; i < subPackages.length; i++) {
      totalSubPackagesWeight += subPackages[i].GROSS_WEIGHT;
    }
    return totalSubPackagesWeight !== toNumber(thongTinPhieuGui[0].GROSS_WEIGHT);
  };

  // eslint-disable-next-line max-lines-per-function
  const dispatchActionApi_ZTMI213 = (): void => {
    if (totalQuantityInvalid(subPackages)) {
      toast(
        <>
          <i className="fa fa-window-close-o mr-2" />
          {t('Tổng số lượng tách không hợp lệ ')}
        </>,
        {
          containerId: 'SplitCoupon',
          type: 'error',
        },
      );
      return;
    }

    if (totalWeightInvalid(subPackages)) {
      toast(
        <>
          <i className="fa fa-window-close-o mr-2" />
          {t('Tổng khối lượng tách không hợp lệ ')}
        </>,
        {
          containerId: 'SplitCoupon',
          type: 'error',
        },
      );
      return;
    }
    dispatch(
      action_ZTMI213(
        {
          PACKAGE_ID: thongTinPhieuGui[0].PACKAGE_ID,
          row: subPackages,
        },
        {
          onSuccess: (data: API.ZTMI213Response): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {t('Tách kiện thành công')}
              </>,
              {
                containerId: 'SplitCoupon',
                type: 'success',
              },
            );
            setEnableDivideButton(false);
            setShowDivideCouponUI(false);
            setShowListCoupon(true);
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages', 'Đã có lỗi xảy ra ')}
              </>,
              {
                containerId: 'SplitCoupon',
                type: 'error',
              },
            );
          },
        },
      ),
    );
  };

  const renderDivideCouponUI = (): JSX.Element => {
    return (
      <>
        <Row className="mb-3 sipTitleContainer">
          <h1 className="sipTitle">{t('Danh sách phiếu gửi')}</h1>
          <div className="sipTitleRightBlock">
            <Button onClick={dispatchActionApi_ZTMI213} color="primary" className="ml-2">
              <i className="fa fa-check-square-o  mr-2" />
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
            <Col xs="6">{thongTinPhieuGui[0].FWO}</Col>
          </Row>

          <Row>
            <Col xs="4">{t('Ngày gửi')}: </Col>
            <Col xs="6">{moment(trim(thongTinPhieuGui[0].CREATED_ON), 'YYYYMMDD').format('DD/MM/YYYY')}</Col>
          </Row>
        </Col>
        <Col lg="4" xs="12">
          <Row>
            <Col xs="4">{t('Số lượng')}: </Col>
            <Col xs="4">{toNumber(thongTinPhieuGui[0].Quantity)}</Col>
          </Row>
          <Row>
            <Col xs="4">{t('Trọng lượng')}: </Col>
            <Col xs="4">{`${toNumber(get(thongTinPhieuGui[0], 'GROSS_WEIGHT', '0'))} ${toLower(
              get(thongTinPhieuGui[0], 'WEIGHT_UOM', ''),
            )}`}</Col>
          </Row>
        </Col>
        <Col xs={12} className="mt-3">
          <Label className="mr-3">{t('Số lượng tách')}</Label>
          <div className="sipScanCodeContainer">
            <Input type="number" onChange={handerEnterDivideQuantity} />
            <Button color="primary" onClick={handleDevideCoupon} disabled={divideQuantity <= 0 && enableDivideButton}>
              {t('Tách phiếu')}
            </Button>
          </div>
        </Col>
      </Row>
    );
  }

  const dispatchActionAPI_ZTMI031 = useCallback((): void => {
    dispatch(
      action_MIOA_ZTMI031(
        { FWO_ID: searchKey, Buyer_reference_Number: '' },
        {
          onSuccess: (data: API.MIOAZTMI031Response): void => {
            if (isNil(data)) {
              toast(
                <>
                  <i className="fa fa-window-close-o mr-2" />
                  {t('Không có kết quả tìm kiếm')}
                </>,
                {
                  containerId: 'SplitCoupon',
                  type: 'error',
                },
              );
            }
          },
          onFailure: (): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {t('Có lỗi xảy ra trong quá trình tìm kiếm kiện')}
              </>,
              {
                containerId: 'SplitCoupon',
                type: 'error',
              },
            );
          },
        },
      ),
    );
    setShowDivideCouponUI(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const changeSearchKeyValue = useCallback((event: React.FormEvent<HTMLInputElement>): void => {
    setSearchkey(event.currentTarget.value);
  }, []);

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <Label check>
              <Input type="checkbox" onClick={noop} />
            </Label>
          );
        },
      },
      {
        Header: t('Mã phiếu gửi'),
        accessor: 'PACKAGE_ID',
      },

      {
        Header: t('Số lượng'),
        accessor: 'QUANTITY',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <Input
              type="text"
              defaultValue={`${toNumber(get(row, 'values.QUANTITY'))}`}
              className="text-center"
              readOnly
            />
          );
        },
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GROSS_WEIGHT',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <Input
              type="text"
              defaultValue={`${toNumber(get(row, 'values.GROSS_WEIGHT'))} ${toLower(
                get(row, 'original.WEIGHT_UOM', ''),
              )}`}
              className="text-center"
              readOnly
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
      {showListCoupon && renderListCouponTitle()}
      {showListCoupon && (
        <Row className="sipTableContainer sipTableRowClickable">
          <DataTable columns={columns} data={ZTMI213_ResponseRow} onRowClick={noop} />
        </Row>
      )}

      <ToastContainer containerId={'SplitCoupon'} />
    </div>
  );
};

export default SplitCoupon;
