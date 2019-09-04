/* eslint-disable max-lines */
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Cell } from 'react-table';
import { generatePath, match } from 'react-router-dom';
import { drop, findIndex, get, map, size, slice } from 'lodash';
import DataTable from 'components/DataTable';
import { Button, Row, Col, Fade } from 'reactstrap';
import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { select_MT_ZTMI031_OUT, select_MT_ZTMI031_INSTANE } from 'redux/MIOA_ZTMI031/selectors';
import { action_GET_ADDRESS } from 'redux/SearchLocation/actions';
import routesMap from 'utils/routesMap';
import { goBack } from 'connected-react-router';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const OrderInformation: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const idDonHang = get(props, 'match.params.idDonHang');
  const handleBack = (): void => {
    dispatch(goBack());
  };

  const orderInformation = useSelector(select_MT_ZTMI031_OUT);
  const orderInformationInstane = useSelector(select_MT_ZTMI031_INSTANE);
  const orderInfoTableData = map(
    orderInformation,
    (item: API.RowMTZTMI031OUT, index: number): API.RowMTZTMI031OUT => {
      return {
        PACKAGE_ID: item.PACKAGE_ID,
        ITEM_DESCRIPTION: item.ITEM_DESCRIPTION,
        FWO: item.FWO,
        GROSS_WEIGHT: item.GROSS_WEIGHT ? parseFloat(item.GROSS_WEIGHT).toFixed(2) : '',
        Quantity: item.Quantity ? parseFloat(item.Quantity).toFixed(2) : '',
        SERVICE_TYPE: item.SERVICE_TYPE,
      };
    },
  );
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
    dispatch(push(generatePath(routesMap.NHAP_PHIEU_GUI_TRONG_NUOC, { idDonHang })));
  };

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
      },
      {
        Header: t('Giá trị'),
        accessor: '',
        Cell: ({ row }: Cell): JSX.Element => {
          return <>Thiếu Api</>;
        },
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GROSS_WEIGHT',
      },
      {
        Header: t('Số lượng'),
        accessor: 'Quantity',
      },
      {
        Header: t('Dịch vụ'),
        accessor: 'SERVICE_TYPE',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          const serviceType: string[] = drop(get(row, 'values.SERVICE_TYPE', ''), 1);
          return (
            <>
              {slice(
                serviceType,
                0,
                findIndex(serviceType, (item: string): boolean => {
                  return item === '/';
                }),
              )}
            </>
          );
        },
      },
      {
        Header: t('Quản trị'),
        accessor: '',
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-print fa-lg color-green" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function renderTable(): JSX.Element {
    return (
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={orderInfoTableData} onRowClick={handleRedirectDetail} />
      </Row>
    );
  }

  function renderSenderCustomer(): JSX.Element {
    return (
      <Col xl="6" xs="12" className="mb-4">
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
                {orderInformationInstane && orderInformationInstane.MOBILE_PHONE_SRT}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5" md={4} xl={3}>
                {t('Địa chỉ')}:
              </Col>
              <Col xs="12" sm="7" md={8} xl={9}>
                {orderInformationInstane &&
                  `${orderInformationInstane.HOUSE_NO_DES !== 0 ? orderInformationInstane.HOUSE_NO_DES : ''}${' '}
                  ${orderInformationInstane.STREET_ID_DES !== null ? orderInformationInstane.STREET_ID_DES : ''}${' '}
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
      <Col xl="6" xs="12" className="mb-4">
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
                  `${orderInformationInstane.HOUSE_NO_SOURCE !== 0 ? orderInformationInstane.HOUSE_NO_SOURCE : ''}${' '}
                  ${
                    orderInformationInstane.STREET_ID_SOURCE !== null ? orderInformationInstane.STREET_ID_SOURCE : ''
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
          <Button onClick={handleGotoEditForwardingOrder}>
            <i className="fa fa-pencil" />
            Sửa phiếu gửi
          </Button>
          <Button>
            <i className="fa fa-barcode" />
            In mã vạch
          </Button>
          <Button>
            <i className="fa fa-print" />
            In mã phiếu
          </Button>
        </div>
      </Row>
      <Row>
        {renderSenderCustomer()}
        {renderReceiveCustomer()}
      </Row>
      <div className="row mt-3" />
      <h1 className="sipTitle">{t('Danh sách kiện hàng')}</h1>
      {renderTable()}
    </>
  ) : (
    <Fade in={true} timeout={1000}>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack} className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Quay lại')}
        </h1>
      </Row>
      <div className="row mb-5" />
      <h3 className="text-center">{t('Không tìm thấy thông tin phiếu gửi!')}</h3>
    </Fade>
  );
};

export default OrderInformation;
