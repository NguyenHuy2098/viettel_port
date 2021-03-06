/* eslint-disable max-lines */
import React, { useMemo, useState } from 'react';
import { Button, Row, Col, Fade } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, match, Link } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { drop, findIndex, get, size, slice, find, toNumber } from 'lodash';

import ButtonGoBack from 'components/Button/ButtonGoBack';
import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { select_MT_ZTMI031_OUT, select_MT_ZTMI031_INSTANE } from 'redux/MIOA_ZTMI031/selectors';
import { action_GET_ADDRESS } from 'redux/LocationSearch/actions';
import routesMap from 'utils/routesMap';
import { numberFormat } from 'utils/common';
import ModalCouponInfomation from './ModalCouponInfomation';
// eslint-disable-next-line import/imports-first
import { findCountry } from 'containers/NhapPhieuGui/PhieuGuiQuocTe/countryList';
// import { Typeahead as RootTypeahead } from 'react-bootstrap-typeahead';
import { toastError } from '../../utils/commonJsx';

interface Props {
  match: match;
}

interface TrqType {
  id: string;
  description: string;
}

interface SubPackage {
  ID: number;
  QUANTITY: number;
  QUANTITY_UOM: string;
  GROSS_WEIGHT: number;
  WEIGHT_UOM: string;
}
// eslint-disable-next-line max-lines-per-function
const OrderInformation: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const idDonHang = get(props, 'match.params.idDonHang');
  const orderInformation = useSelector(select_MT_ZTMI031_OUT);
  const orderInformationInstane = useSelector(select_MT_ZTMI031_INSTANE);
  const [provinceSender, setProvinceSender] = useState<string>('');
  const [districtSender, setDistrictSender] = useState<string>('');
  const [wardSender, setWardSender] = useState<string>('');
  const [countrySender, setCountrySender] = useState<string>('');
  const [provinceReceiver, setProvinceReceiver] = useState<string>('');
  const [districtReceiver, setDistrictReceiver] = useState<string>('');
  const [wardReceiver, setWardReceiver] = useState<string>('');
  const [countryReceiver, setcountryReceiver] = useState<string>('');
  const [visableCouponInfo, setVisableCouponInfo] = useState<boolean>(false);

  // const [listLocation, setListLocation] = useState<OrderSuggestedItem[]>([]);

  function toggleCouponInfo(): void {
    setVisableCouponInfo(!visableCouponInfo);
  }

  //eslint-disable-next-line max-lines-per-function
  React.useEffect((): void => {
    if (orderInformationInstane.COUNTRY_ID_SOURCE) {
      setCountrySender(findCountry(orderInformationInstane.COUNTRY_ID_SOURCE));
    }
    if (orderInformationInstane) {
      if (orderInformationInstane.PROVINCE_ID_SOURCE) {
        dispatch(
          action_GET_ADDRESS(
            { Id: orderInformationInstane.PROVINCE_ID_SOURCE },
            {
              onSuccess: (data: VtpAddressResponse): void => {
                setProvinceSender(get(data, 'LocationModels[0].N'));
              },
            },
          ),
        );
      }
      if (orderInformationInstane.DISTRICT_ID_SOURCE) {
        dispatch(
          action_GET_ADDRESS(
            { Id: orderInformationInstane.DISTRICT_ID_SOURCE },
            {
              onSuccess: (data: VtpAddressResponse): void => {
                setDistrictSender(get(data, 'LocationModels[0].N'));
              },
            },
          ),
        );
      }
      if (orderInformationInstane.WARD_ID_SOURCE) {
        dispatch(
          action_GET_ADDRESS(
            { Id: orderInformationInstane.WARD_ID_SOURCE },
            {
              onSuccess: (data: VtpAddressResponse): void => {
                setWardSender(get(data, 'LocationModels[0].N'));
              },
            },
          ),
        );
      }
      if (orderInformationInstane.COUNTRY_ID_DES) {
        setcountryReceiver(findCountry(orderInformationInstane.COUNTRY_ID_DES));
      }
      if (orderInformationInstane.PROVINCE_ID_DES) {
        dispatch(
          action_GET_ADDRESS(
            { Id: orderInformationInstane.PROVINCE_ID_DES },
            {
              onSuccess: (data: VtpAddressResponse): void => {
                setProvinceReceiver(get(data, 'LocationModels[0].N'));
              },
            },
          ),
        );
      }
      if (orderInformationInstane.DISTRICT_ID_DES) {
        dispatch(
          action_GET_ADDRESS(
            { Id: orderInformationInstane.DISTRICT_ID_DES },
            {
              onSuccess: (data: VtpAddressResponse): void => {
                setDistrictReceiver(get(data, 'LocationModels[0].N'));
              },
            },
          ),
        );
      }
      if (orderInformationInstane.WARD_ID_DES) {
        dispatch(
          action_GET_ADDRESS(
            { Id: orderInformationInstane.WARD_ID_DES },
            {
              onSuccess: (data: VtpAddressResponse): void => {
                setWardReceiver(get(data, 'LocationModels[0].N'));
              },
            },
          ),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderInformationInstane]);

  const payloadFirstLoad = {
    FWO_ID: idDonHang,
    BUYER_REFERENCE_NUMBER: '',
  };

  React.useEffect((): void => {
    dispatch(action_MIOA_ZTMI031(payloadFirstLoad));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idDonHang]);

  const handleRedirectDetail = (item: API.RowMTZTMI031OUT): void => {
    dispatch(
      push(
        generatePath(routesMap.THONG_TIN_KIEN_HANG, {
          idDonHang: item.FWO,
          idKienHang: item.PACKAGE_ID,
        }),
      ),
    );
  };

  const handleGotoEditForwardingOrder = (): void => {
    dispatch(push(generatePath(routesMap.PHIEU_GUI_TRONG_NUOC, { idDonHang })));
  };

  const handleGotoTachKien = (): void => {
    if (
      size(orderInformation) === 1 &&
      toNumber(orderInformation[0].Quantity) > 1 &&
      orderInformation[0].FU_STATUS === '306'
    ) {
      setVisableCouponInfo(true);
    } else if (orderInformation[0].FU_STATUS !== '306') {
      toastError(t('Ch??? cho ph??p t??ch ki???n ??? tr???ng th??i 306'));
    } else {
      toastError(t('Phi???u g???i kh??ng ????? ti??u ch?? ????? t??ch'));
    }
  };

  const trqType: TrqType[] = [
    {
      id: 'V001',
      description: t('????n g???c'),
    },
    {
      id: 'V002',
      description: t('????n g???c'),
    },
    {
      id: 'V003',
      description: t('????n g???c'),
    },
    {
      id: 'V004',
      description: t('????n g???c'),
    },
    {
      id: 'V005',
      description: t('????n g???c'),
    },
    {
      id: 'V009',
      description: t('Chuy???n ho??n'),
    },
    {
      id: 'V010',
      description: t('Chuy???n ti???p'),
    },
  ];

  // const renderPrintButton = (idChuyenThu: string): JSX.Element => (
  //   <PrintableModal
  //     btnProps={{
  //       className: 'SipTableFunctionIcon',
  //       children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
  //     }}
  //     modalProps={{
  //       size: 'lg',
  //     }}
  //     modalBodyProps={{
  //       children: <PrintableThongTinDonHang idDonHang={idDonHang} idChuyenThu={idChuyenThu} type="TTDH" />,
  //     }}
  //     modalHeaderProps={{
  //       children: t('In Th??ng Tin ????n H??ng'),
  //     }}
  //   />
  // );

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('M?? ki???n h??ng'),
        accessor: 'PACKAGE_ID',
      },
      {
        Header: t('T??n h??ng'),
        accessor: 'ITEM_DESCRIPTION',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const thisWeight = get(row, 'values.ITEM_DESCRIPTION', '');
          return <>{thisWeight ? thisWeight : ''}</>;
        },
      },
      {
        Header: t('Gi?? tr???'),
        accessor: 'GoodValue',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const GoodValue = get(row, 'values.GoodValue', '');
          return <>{GoodValue ? numberFormat(GoodValue) : ''}</>;
        },
      },
      {
        Header: t('Tr???ng l?????ng'),
        accessor: 'GROSS_WEIGHT',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const thisWeight = get(row, 'values.GROSS_WEIGHT', '');
          return <>{thisWeight ? parseFloat(thisWeight).toFixed(0) : ''} g</>;
        },
      },
      {
        Header: t('S??? l?????ng'),
        accessor: 'Quantity',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const thisQuantity = get(row, 'values.Quantity', '');
          return <>{thisQuantity ? parseFloat(thisQuantity).toFixed(0) : ''}</>;
        },
      },
      {
        Header: t('D???ch v???'),
        accessor: 'SERVICE_TYPE',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const serviceType: string[] = drop(get(row, 'values.SERVICE_TYPE', ''), 1);
          return (
            <>
              {findIndex(serviceType, (item: string): boolean => {
                return item === '/';
              }) !== -1
                ? slice(
                    serviceType,
                    0,
                    findIndex(serviceType, (item: string): boolean => {
                      return item === '/';
                    }),
                  )
                : serviceType}
            </>
          );
        },
      },
      {
        Header: t('Lo???i'),
        accessor: 'Trq_type',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          return (
            <>
              {get(
                find(trqType, (item: TrqType): boolean => {
                  return item.id === get(row, 'values.Trq_type', '');
                }),
                'description',
                '',
              )}
            </>
          );
        },
      },
      {
        Header: t('Qu???n tr???'),
        accessor: '',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => (
          <Link
            className="SipTableFunctionIcon"
            to={`/in-don-hang/${idDonHang}?idChuyenThu=${get(row, 'values.PACKAGE_ID', '')}`}
            target="_blank"
          >
            <img title="In" src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />
          </Link>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function renderTable(): JSX.Element {
    return (
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={orderInformation} onRowClick={handleRedirectDetail} />
      </Row>
    );
  }

  function renderSenderCustomer(): JSX.Element {
    return (
      <Col xl="6" xs="12" className="mb-3 sipOrderInputCol">
        <div className="sipContentContainer">
          <div className="sipInputBlock mb-0">
            <h3> {t('Ng?????i g???i')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" sm="5" md={4} xl={3}>
                {t('H??? & t??n')}:
              </Col>
              <Col xs="12" sm="7" md={8} xl={9}>
                {orderInformationInstane && orderInformationInstane.SHIPER_NAME}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5" md={4} xl={3}>
                {t('??i???n tho???i')}:
              </Col>
              <Col xs="12" sm="7" md={8} xl={9}>
                {get(orderInformationInstane, 'MOBILE_PHONE_SRC')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5" md={4} xl={3}>
                {t('?????a ch???')}:
              </Col>
              <Col xs="12" sm="7" md={8} xl={9}>
                {orderInformationInstane &&
                  `${orderInformationInstane.HOUSE_NO_SOURCE ? orderInformationInstane.HOUSE_NO_SOURCE : ''}${' '}
                  ${orderInformationInstane.STREET_ID_SOURCE ? orderInformationInstane.STREET_ID_SOURCE : ''}${' '}
                  ${wardSender}${' '}
                  ${districtSender}${' '}
                  ${provinceSender}${' '}
                  ${countrySender}`}
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }

  function renderReceiveCustomer(): JSX.Element {
    return (
      <Col xl="6" xs="12" className="mb-3 sipOrderInputCol">
        <div className="sipContentContainer">
          <div className="sipInputBlock mb-0">
            <h3> {t('Ng?????i nh???n')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" sm="5" md={4} xl={3}>
                {t('H??? & t??n')}:
              </Col>
              <Col xs="12" sm="7" md={8} xl={9}>
                {orderInformationInstane && orderInformationInstane.CONSIGNEE_NAME}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5" md={4} xl={3}>
                {t('??i???n tho???i')}:
              </Col>
              <Col xs="12" sm="7" md={8} xl={9}>
                {orderInformationInstane && orderInformationInstane.MOBILE_PHONE_DES}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5" md={4} xl={3}>
                {t('?????a ch???')}:
              </Col>
              <Col xs="12" sm="7" md={8} xl={9}>
                {orderInformationInstane &&
                  `${orderInformationInstane.HOUSE_NO_DES ? orderInformationInstane.HOUSE_NO_DES : ''}${' '}
                  ${orderInformationInstane.STREET_ID_DES ? orderInformationInstane.STREET_ID_DES : ''}${' '}
                  ${wardReceiver}${' '}
                  ${districtReceiver}${' '}
                  ${provinceReceiver}${' '}
                  ${countryReceiver}`}
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }

  return size(orderInformation) > 0 ? (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Th??ng tin ????n h??ng')}</h1>
        {/* <RootTypeahead
          id="location"
          //  labelKey={labelKeyLocation}
          options={listLocation}
          placeholder="Ch???n ????n v???"
        // onInputChange={setKeywords}
        //  onChange={handleSelectedLocation}
        //  selected={selectedLocation}
        >
          <span
            style={{
              position: 'absolute',
              right: '8px',
              top: '10px',
            }}
            className="fa fa-caret-down"
          />
        </RootTypeahead> */}
        <div className="sipTitleRightBlock">
          <Button className="ml-2" color="primary" onClick={handleGotoTachKien}>
            <img src={'../../assets/img/icon/iconTachKien.svg'} alt="VTPostek" />
            {t('T??ch ki???n')}
          </Button>
          <Button className="ml-2" color="primary" onClick={handleGotoEditForwardingOrder}>
            <i className="fa fa-pencil mr-2" />
            {t('S???a phi???u g???i')}
          </Button>
          <Button className="ml-2" color="primary">
            <img src={'../../assets/img/icon/iconInBuuGui.svg'} alt="VTPostek" />
            {t('In b??u g???i')}
          </Button>
        </div>
      </Row>
      <Row className="sipOrderInputRow">
        {renderSenderCustomer()}
        {renderReceiveCustomer()}
      </Row>
      <h1 className="sipTitle">{t('Danh s??ch phi???u g???i')}</h1>
      {renderTable()}
      <ModalCouponInfomation
        couponInfomation={orderInformation}
        modalCouponInfo={visableCouponInfo}
        toggle={toggleCouponInfo}
      />
    </>
  ) : (
    <Fade in={true} timeout={1000}>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
          {t('Quay l???i')}
        </h1>
      </Row>
      <div className="row mb-5" />
      <h3 className="text-center">{t('Kh??ng t??m th???y th??ng tin phi???u g???i!')}</h3>
    </Fade>
  );
};

export default OrderInformation;
