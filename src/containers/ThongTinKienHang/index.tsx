/* eslint-disable max-lines */
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { drop, find, findIndex, get, slice } from 'lodash';
import { generatePath, match } from 'react-router-dom';
import DataTable from 'components/DataTable';
import { Button, Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { select_MT_ZTMI031_OUT } from 'redux/MIOA_ZTMI031/selectors';
import { action_GET_ADDRESS } from 'redux/SearchLocation/actions';
import routesMap from 'utils/routesMap';
import { Cell } from 'react-table';
import moment from 'moment';

interface Props {
  match: match;
}

interface ProgressEffect {
  id: string;
  description: string;
}

// eslint-disable-next-line max-lines-per-function
const PackageInformation: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const idDonHang = get(props, 'match.params.idDonHang');
  const idKienHang = get(props, 'match.params.idKienHang');
  const packageInformation: API.RowMTZTMI031OUT | undefined = find(
    useSelector(select_MT_ZTMI031_OUT),
    (item: API.RowMTZTMI031OUT): boolean => {
      return item.PACKAGE_ID === idKienHang;
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
    if (packageInformation) {
      if (packageInformation.PROVINCE_ID_SOURCE) {
        dispatch(
          action_GET_ADDRESS(
            { Id: packageInformation.PROVINCE_ID_SOURCE },
            {
              onSuccess: (data: API.VtpAddressResponse): void => {
                setProvinceSender(get(data, 'LocationModels[0].N'));
              },
            },
          ),
        );
      }
      if (packageInformation.DISTRICT_ID_SOURCE) {
        dispatch(
          action_GET_ADDRESS(
            { Id: packageInformation.DISTRICT_ID_SOURCE },
            {
              onSuccess: (data: API.VtpAddressResponse): void => {
                setDistrictSender(get(data, 'LocationModels[0].N'));
              },
            },
          ),
        );
      }
      if (packageInformation.WARD_ID_SOURCE) {
        dispatch(
          action_GET_ADDRESS(
            { Id: packageInformation.WARD_ID_SOURCE },
            {
              onSuccess: (data: API.VtpAddressResponse): void => {
                setWardSender(get(data, 'LocationModels[0].N'));
              },
            },
          ),
        );
      }
      if (packageInformation.PROVINCE_ID_DES) {
        dispatch(
          action_GET_ADDRESS(
            { Id: packageInformation.PROVINCE_ID_DES },
            {
              onSuccess: (data: API.VtpAddressResponse): void => {
                setProvinceReceiver(get(data, 'LocationModels[0].N'));
              },
            },
          ),
        );
      }
      if (packageInformation.DISTRICT_ID_DES) {
        dispatch(
          action_GET_ADDRESS(
            { Id: packageInformation.DISTRICT_ID_DES },
            {
              onSuccess: (data: API.VtpAddressResponse): void => {
                setDistrictReceiver(get(data, 'LocationModels[0].N'));
              },
            },
          ),
        );
      }
      if (packageInformation.WARD_ID_DES) {
        dispatch(
          action_GET_ADDRESS(
            { Id: packageInformation.WARD_ID_DES },
            {
              onSuccess: (data: API.VtpAddressResponse): void => {
                setWardReceiver(get(data, 'LocationModels[0].N'));
              },
            },
          ),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageInformation]);

  const progressEffect: ProgressEffect[] = [
    {
      id: 'POPU',
      description: t('Nhận hàng thành công'),
    },
    {
      id: 'ZPOPU_SPL',
      description: t('Nhận hàng thành công cho bưu phẩm đặc biệt'),
    },
    {
      id: 'DEPARTURE',
      description: t('Xe xuất phát'),
    },
    {
      id: 'ARRIV_DEST',
      description: t('Xe đến'),
    },
    {
      id: 'ZARRIV_COMBSACK',
      description: t('Nhận chuyến thư đến'),
    },
    {
      id: 'ZARRIV_SACK',
      description: t('Nhận tải'),
    },
    {
      id: 'ZARRIV_MANIFEST',
      description: t('Nhận bảng kê'),
    },
    {
      id: 'ZARRIV_PARCEL',
      description: t('Nhận bưu gửi, kiện (của khách hàng)'),
    },
    {
      id: 'POD',
      description: t('Giao hàng thành công'),
    },
    {
      id: 'ZPOD_SPL',
      description: t('Giao hàng thành công cho bưu phẩm đặc biệt'),
    },
    {
      id: 'ZFAILED_DLV',
      description: t('Giao hàng không thành công'),
    },
    {
      id: 'ZFAILED_PICK',
      description: t('Nhận hàng không thành công'),
    },
    {
      id: 'ZPOSTMAN_DELIVER',
      description: t('Phân công giao hàng'),
    },
    {
      id: 'ZPOSTMAN_PICK',
      description: t('Phân công nhận hàng'),
    },
    {
      id: 'ZDAMAGE_VEHICLE',
      description: t('Xe hỏng'),
    },
    {
      id: 'ZEXEC_READY',
      description: t('Hoàn thành chuyến thư'),
    },
    {
      id: 'ZSTOCK',
      description: t('Quét tồn'),
    },
    {
      id: 'ZTRANSFER',
      description: t('Chuyển tiếp'),
    },
    {
      id: 'ZCOLLECT_PARCEL',
      description: t('Khách hàng nhận tại bưu cục'),
    },
    {
      id: 'ZRETRY_DELIVERY',
      description: t('Phát tiếp'),
    },
    {
      id: 'ZFU_ASSIGN',
      description: t('Gán bưu gửi vào bảng kê'),
    },
    {
      id: 'ZTU_ASSIGN',
      description: t('Gán bảng kê vào tải'),
    },
    {
      id: 'ZTU_ASSIGN2',
      description: t('Gán tải vào chuyến thư'),
    },
    {
      id: 'ZBLOCK',
      description: t('Hủy đơn/bưu gửi'),
    },
    {
      id: 'ZPOD_PARTIAL',
      description: t('Giao thành công 1 phần'),
    },
  ];

  const payloadFirstLoad = {
    FWO_ID: idDonHang,
    BUYER_REFERENCE_NUMBER: '',
  };

  React.useEffect((): void => {
    dispatch(action_MIOA_ZTMI031(payloadFirstLoad));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleBackToOrderInformation = (): void => {
    dispatch(push(generatePath(routesMap.THONG_TIN_DON_HANG, { idDonHang })));
  };

  const handleGotoEditForwardingOrder = (): void => {
    dispatch(push(generatePath(routesMap.NHAP_PHIEU_GUI_TRONG_NUOC, { idDonHang })));
  };

  const columns = useMemo(
    () => [
      {
        Header: t('Mã bưu cục'),
        accessor: 'LOCATION_DESCRIPTION',
      },
      {
        Header: t('Thời gian'),
        accessor: 'TIME_DATE',
      },
      {
        Header: t('Tác động'),
        accessor: 'Event',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ row }: any): JSX.Element => {
          return (
            <>
              {get(
                find(progressEffect, (item: ProgressEffect): boolean => {
                  return item.id === get(row, 'values.Event', '');
                }),
                'description',
                '',
              )}
            </>
          );
        },
      },
      {
        Header: t('Thông tin bảng kê'),
        accessor: '',
        Cell: ({ row }: Cell): JSX.Element => {
          return <>Thiếu api</>;
        },
      },
      {
        Header: t('Người tác động'),
        accessor: '',
        Cell: ({ row }: Cell): JSX.Element => {
          return <>Thiếu api</>;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function renderTable(): JSX.Element {
    return (
      <Row className="sipTableContainer">
        <DataTable
          columns={columns}
          data={packageInformation && packageInformation.Execution ? packageInformation.Execution : []}
        />
      </Row>
    );
  }

  const serviceType: string[] = drop(get(packageInformation, 'SERVICE_TYPE', ''), 1);

  //eslint-disable-next-line max-lines-per-function
  function renderOrderInformation(): JSX.Element {
    return (
      <Col xl="4" xs="12" className="mb-4">
        <div className="sipContentContainer">
          <div className="sipInputBlock">
            <h3>{t('Thông tin bưu kiện')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Mã bưu kiện')}:
              </Col>
              <Col xs="12" sm="7" className="color-primary">
                {packageInformation && packageInformation.PACKAGE_ID}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Ngày tạo')}:
              </Col>
              <Col xs="12" sm="7">
                {packageInformation && moment(packageInformation.CREATED_ON, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY ')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Dịch vụ')}:
              </Col>
              <Col xs="12" sm="7">
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
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Trạng thái')}:
              </Col>
              <Col xs="12" sm="7">
                <span className="bg-success p-1 rounded">{packageInformation && packageInformation.FU_STATUS}</span>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }

  function renderSenderCustomer(): JSX.Element {
    return (
      <Col xl="4" xs="12" className="mb-4">
        <div className="sipContentContainer">
          <div className="sipInputBlock">
            <h3> {t('Người gửi')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Họ & tên')}:
              </Col>
              <Col xs="12" sm="7">
                {packageInformation && packageInformation.SHIPER_NAME}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Điện thoại')}:
              </Col>
              <Col xs="12" sm="7">
                {packageInformation && packageInformation.MOBILE_PHONE_SRT}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Địa chỉ')}:
              </Col>
              <Col xs="12" sm="7">
                {packageInformation &&
                  `${packageInformation.HOUSE_NO_DES !== 0 ? packageInformation.HOUSE_NO_DES : ''}${' '}
                  ${packageInformation.STREET_ID_DES !== null ? packageInformation.STREET_ID_DES : ''}${' '}
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

  function renderReceiverCustomer(): JSX.Element {
    return (
      <Col xl="4" xs="12" className="mb-4">
        <div className="sipContentContainer">
          <div className="sipInputBlock">
            <h3> {t('Người nhận')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Họ & tên')}:
              </Col>
              <Col xs="12" sm="7">
                {packageInformation && packageInformation.CONSIGNEE_NAME}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Điện thoại')}:
              </Col>
              <Col xs="12" sm="7">
                {packageInformation && packageInformation.MOBILE_PHONE_DES}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Địa chỉ')}:
              </Col>
              <Col xs="12" sm="7">
                {packageInformation &&
                  `${packageInformation.HOUSE_NO_SOURCE !== 0 ? packageInformation.HOUSE_NO_SOURCE : ''}${' '}
                  ${packageInformation.STREET_ID_SOURCE !== null ? packageInformation.STREET_ID_SOURCE : ''}${' '}
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

  // eslint-disable-next-line max-lines-per-function
  function renderPackageInformation(): JSX.Element {
    return (
      <Col xl="4" xs="12">
        <div className="sipInputBlock">
          <h3>{t('Thông tin hàng hóa')}</h3>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Mặt hàng')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.ITEM_DESCRIPTION}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Trọng lượng')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation &&
                packageInformation.GROSS_WEIGHT &&
                parseFloat(packageInformation.GROSS_WEIGHT).toFixed(2)}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Số lượng')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.Quantity && parseFloat(packageInformation.Quantity).toFixed(2)}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Giá trị')}:
            </Col>
            <Col xs="12" sm="8">
              50.000 đ (Api trả thiếu)
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Cước phí')}:
            </Col>
            <Col xs="12" sm="8">
              50.000 đ (chưa có yêu cầu)
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Tiền thu hộ')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.COD && parseInt(packageInformation.COD)}
            </Col>
          </Row>
        </div>
      </Col>
    );
  }

  function renderSenderPostman(): JSX.Element {
    return (
      <Col xl="4" xs="12">
        <div className="sipInputBlock">
          <h3> {t('Bưu tá giao')}</h3>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Họ & tên')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.DELIVERY_POSTMAN_NAME}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Số điện thoại')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.DELIVERY_POSTMAN_PHONE}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Bưu cục')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.DES_PO_ID}
            </Col>
          </Row>
        </div>
      </Col>
    );
  }

  function renderReceiverPostman(): JSX.Element {
    return (
      <Col xl="4" xs="12">
        <div className="sipInputBlock">
          <h3> {t('Bưu tá nhận')}</h3>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Họ & tên')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.PICKUP_POSTMAN_NAME}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Số điện thoại')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.PHONE_OF_PICKUP_POSTMAN}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Bưu cục')}:
            </Col>
            <Col xs="12" sm="8">
              BNE (Api trả thiếu)
            </Col>
          </Row>
        </div>
      </Col>
    );
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBackToOrderInformation} className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Thông tin kiện hàng')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button onClick={handleGotoEditForwardingOrder}>
            <i className="fa fa-pencil" />
            {t('Sửa phiếu gửi')}
          </Button>
          <Button>
            <i className="fa fa-barcode" />
            {t('In mã vạch')}
          </Button>
          <Button>
            <i className="fa fa-print" />
            {t('In mã phiếu')}
          </Button>
        </div>
      </Row>
      <Row>
        {renderOrderInformation()}
        {renderSenderCustomer()}
        {renderReceiverCustomer()}
      </Row>
      <Row className="sipContentContainer pt-4 pb-4">
        {renderPackageInformation()}
        {renderSenderPostman()}
        {renderReceiverPostman()}
      </Row>
      <div className="row mt-3" />
      <h1 className="sipTitle">{t('Thông tin hành trình')}</h1>
      {renderTable()}
    </>
  );
};

export default PackageInformation;
