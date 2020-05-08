/* eslint-disable max-lines */
import React, { useMemo, useState } from 'react';
import { Button, Row, Col, Fade } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, match, Link } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { drop, findIndex, get, size, slice } from 'lodash';

import ButtonGoBack from 'components/Button/ButtonGoBack';
import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { select_MT_ZTMI031_OUT, select_MT_ZTMI031_INSTANE } from 'redux/MIOA_ZTMI031/selectors';
import { action_GET_ADDRESS } from 'redux/LocationSearch/actions';
import routesMap from 'utils/routesMap';

interface Props {
  match: match;
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
  const [provinceReceiver, setProvinceReceiver] = useState<string>('');
  const [districtReceiver, setDistrictReceiver] = useState<string>('');
  const [wardReceiver, setWardReceiver] = useState<string>('');

  //eslint-disable-next-line max-lines-per-function
  React.useEffect((): void => {
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
          idDonHang: idDonHang,
          idKienHang: item.PACKAGE_ID,
        }),
      ),
    );
  };

  const handleGotoEditForwardingOrder = (): void => {
    dispatch(push(generatePath(routesMap.PHIEU_GUI_TRONG_NUOC, { idDonHang })));
  };

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
  //       children: t('In Thông Tin Đơn Hàng'),
  //     }}
  //   />
  // );

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã kiện hàng'),
        accessor: 'PACKAGE_ID',
      },
      {
        Header: t('Tên hàng'),
        accessor: 'ITEM_DESCRIPTION',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const thisWeight = get(row, 'values.ITEM_DESCRIPTION', '');
          return <>{thisWeight ? thisWeight : ''}</>;
        },
      },
      {
        Header: t('Giá trị'),
        accessor: '',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return <>Thiếu Api</>;
        },
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GROSS_WEIGHT',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const thisWeight = get(row, 'values.GROSS_WEIGHT', '');
          return <>{thisWeight ? parseFloat(thisWeight).toFixed(2) : ''}</>;
        },
      },
      {
        Header: t('Số lượng'),
        accessor: 'Quantity',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const thisQuantity = get(row, 'values.Quantity', '');
          return <>{thisQuantity ? parseFloat(thisQuantity).toFixed(0) : ''}</>;
        },
      },
      {
        Header: t('Dịch vụ'),
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
        Header: t('Quản trị'),
        accessor: '',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => (
          <Link
            className="SipTableFunctionIcon"
            to={`/in-don-hang/${idDonHang}?idChuyenThu=${get(row, 'values.PACKAGE_ID', '')}`}
            target="_blank"
          >
            <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />
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
            <h3> {t('Người gửi')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" sm="5" md={4} xl={3}>
                {t('Họ & tên')}:
              </Col>
              <Col xs="12" sm="7" md={8} xl={9}>
                {orderInformationInstane && orderInformationInstane.SHIPER_NAME}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5" md={4} xl={3}>
                {t('Điện thoại')}:
              </Col>
              <Col xs="12" sm="7" md={8} xl={9}>
                {get(orderInformationInstane, 'MOBILE_PHONE_SRC')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5" md={4} xl={3}>
                {t('Địa chỉ')}:
              </Col>
              <Col xs="12" sm="7" md={8} xl={9}>
                {orderInformationInstane &&
                  `${orderInformationInstane.HOUSE_NO_SOURCE ? orderInformationInstane.HOUSE_NO_SOURCE : ''}${' '}
                  ${orderInformationInstane.STREET_ID_SOURCE ? orderInformationInstane.STREET_ID_SOURCE : ''}${' '}
                  ${wardSender}${' '}
                  ${districtSender}${' '}
                  ${provinceSender}`}
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
            <h3> {t('Người nhận')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" sm="5" md={4} xl={3}>
                {t('Họ & tên')}:
              </Col>
              <Col xs="12" sm="7" md={8} xl={9}>
                {orderInformationInstane && orderInformationInstane.CONSIGNEE_NAME}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5" md={4} xl={3}>
                {t('Điện thoại')}:
              </Col>
              <Col xs="12" sm="7" md={8} xl={9}>
                {orderInformationInstane && orderInformationInstane.MOBILE_PHONE_DES}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5" md={4} xl={3}>
                {t('Địa chỉ')}:
              </Col>
              <Col xs="12" sm="7" md={8} xl={9}>
                {orderInformationInstane &&
                  `${orderInformationInstane.HOUSE_NO_DES ? orderInformationInstane.HOUSE_NO_DES : ''}${
                    orderInformationInstane.STREET_ID_DES ? orderInformationInstane.STREET_ID_DES : ''
                  }${' '}
                  ${wardReceiver}${' '}
                  ${districtReceiver}${' '}
                  ${provinceReceiver}`}
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
        <h1 className="sipTitle">{t('Thông tin đơn hàng')}</h1>
        <div className="sipTitleRightBlock">
          <Button className="ml-2" color="primary" onClick={handleGotoEditForwardingOrder}>
            <i className="fa fa-pencil mr-2" />
            Sửa phiếu gửi
          </Button>
          <Button className="ml-2" color="primary">
            <i className="fa fa-barcode mr-2" />
            In mã vạch
          </Button>
          <Button className="ml-2" color="primary">
            <i className="fa fa-print mr-2" />
            In mã phiếu
          </Button>
        </div>
      </Row>
      <Row className="sipOrderInputRow">
        {renderSenderCustomer()}
        {renderReceiveCustomer()}
      </Row>
      <h1 className="sipTitle">{t('Danh sách kiện hàng')}</h1>
      {renderTable()}
    </>
  ) : (
    <Fade in={true} timeout={1000}>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
          {t('Quay lại')}
        </h1>
      </Row>
      <div className="row mb-5" />
      <h3 className="text-center">{t('Không tìm thấy thông tin phiếu gửi!')}</h3>
    </Fade>
  );
};

export default OrderInformation;
