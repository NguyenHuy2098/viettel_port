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
import { action_GET_ADDRESS } from 'redux/LocationSearch/actions';
import routesMap from 'utils/routesMap';
import { Cell } from 'react-table';
import moment from 'moment';
import { numberFormat } from 'utils/common';
import { findCountry } from 'containers/NhapPhieuGui/PhieuGuiQuocTe/countryList';
import ButtonGoBack from 'components/Button/ButtonGoBack';

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
  const [countrySender, setCountrySender] = useState<string>('');
  const [provinceReceiver, setProvinceReceiver] = useState<string>('');
  const [districtReceiver, setDistrictReceiver] = useState<string>('');
  const [wardReceiver, setWardReceiver] = useState<string>('');
  const [countryReceiver, setcountryReceiver] = useState<string>('');

  //eslint-disable-next-line max-lines-per-function
  React.useEffect((): void => {
    if (packageInformation) {
      if (packageInformation.COUNTRY_ID_SOURCE) {
        setCountrySender(findCountry(packageInformation.COUNTRY_ID_SOURCE));
      }
      if (packageInformation.PROVINCE_ID_SOURCE) {
        dispatch(
          action_GET_ADDRESS(
            { Id: packageInformation.PROVINCE_ID_SOURCE },
            {
              onSuccess: (data: VtpAddressResponse): void => {
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
              onSuccess: (data: VtpAddressResponse): void => {
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
              onSuccess: (data: VtpAddressResponse): void => {
                setWardSender(get(data, 'LocationModels[0].N'));
              },
            },
          ),
        );
      }
      if (packageInformation.COUNTRY_ID_DES) {
        setcountryReceiver(findCountry(packageInformation.COUNTRY_ID_DES));
      }
      if (packageInformation.PROVINCE_ID_DES) {
        dispatch(
          action_GET_ADDRESS(
            { Id: packageInformation.PROVINCE_ID_DES },
            {
              onSuccess: (data: VtpAddressResponse): void => {
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
              onSuccess: (data: VtpAddressResponse): void => {
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
              onSuccess: (data: VtpAddressResponse): void => {
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
      description: t('Nh???n h??ng th??nh c??ng'),
    },
    {
      id: 'ZPOPU_SPL',
      description: t('Nh???n h??ng th??nh c??ng cho b??u ph???m ?????c bi???t'),
    },
    {
      id: 'DEPARTURE',
      description: t('Xe xu???t ph??t'),
    },
    {
      id: 'ARRIV_DEST',
      description: t('Xe ?????n'),
    },
    {
      id: 'ZARRIV_COMBSACK',
      description: t('Nh???n chuy???n th?? ?????n'),
    },
    {
      id: 'ZARRIV_SACK',
      description: t('Nh???n t???i'),
    },
    {
      id: 'ZARRIV_MANIFEST',
      description: t('Nh???n b???ng k??'),
    },
    {
      id: 'ZARRIV_PARCEL',
      description: t('Nh???n b??u g???i, ki???n (c???a kh??ch h??ng)'),
    },
    {
      id: 'POD',
      description: t('Giao h??ng th??nh c??ng'),
    },
    {
      id: 'ZPOD_SPL',
      description: t('Giao h??ng th??nh c??ng cho b??u ph???m ?????c bi???t'),
    },
    {
      id: 'ZFAILED_DLV',
      description: t('Giao h??ng kh??ng th??nh c??ng'),
    },
    {
      id: 'ZFAILED_PICK',
      description: t('Nh???n h??ng kh??ng th??nh c??ng'),
    },
    {
      id: 'ZPOSTMAN_DELIVER',
      description: t('Ph??n c??ng giao h??ng'),
    },
    {
      id: 'ZPOSTMAN_PICK',
      description: t('Ph??n c??ng nh???n h??ng'),
    },
    {
      id: 'ZDAMAGE_VEHICLE',
      description: t('Xe h???ng'),
    },
    {
      id: 'ZEXEC_READY',
      description: t('Ho??n th??nh chuy???n th??'),
    },
    {
      id: 'ZSTOCK',
      description: t('Qu??t t???n'),
    },
    {
      id: 'ZTRANSFER',
      description: t('Chuy???n ti???p'),
    },
    {
      id: 'ZCOLLECT_PARCEL',
      description: t('Kh??ch h??ng nh???n t???i b??u c???c'),
    },
    {
      id: 'ZRETRY_DELIVERY',
      description: t('Ph??t ti???p'),
    },
    {
      id: 'ZFU_ASSIGN',
      description: t('G??n b??u g???i v??o b???ng k??'),
    },
    {
      id: 'ZTU_ASSIGN',
      description: t('G??n b???ng k?? v??o t???i'),
    },
    {
      id: 'ZTU_ASSIGN2',
      description: t('G??n t???i v??o chuy???n th??'),
    },
    {
      id: 'ZBLOCK',
      description: t('H???y ????n/b??u g???i'),
    },
    {
      id: 'ZPOD_PARTIAL',
      description: t('Giao th??nh c??ng 1 ph???n'),
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

  const handleGotoEditForwardingOrder = (): void => {
    dispatch(push(generatePath(routesMap.PHIEU_GUI_TRONG_NUOC, { idDonHang })));
  };

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('M?? b??u c???c'),
        accessor: 'LOCATION_DESCRIPTION',
      },
      {
        Header: t('Th???i gian'),
        // accessor: 'TIME_DATE',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.TIME_DATE'), 'YYYYMMDDHHmmss').format('HH:mm DD/MM/YYYY');
        },
      },
      {
        Header: t('T??c ?????ng'),
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
        Header: t('Th??ng tin b???ng k??'),
        accessor: '',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          const type = get(row, 'original.Tor_parent_type');
          const tor = get(row, 'original.Tor_parent');
          return <>{type && tor ? t(type) + ' ' + tor : ''}</>;
        },
      },
      {
        Header: t('Ng?????i t??c ?????ng'),
        accessor: '',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>{`${get(row, 'original.CHANGED_BY') || ''} ${get(row, 'original.NAME_CHANGED_BY') || ''} ${get(
              row,
              'original.MOB_CHANGED_BY',
            ) || ''}`}</>
          );
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
      <Col xl="4" xs="12" className="mb-3 sipOrderInputCol">
        <div className="sipContentContainer">
          <div className="sipInputBlock">
            <h3>{t('Th??ng tin b??u ki???n')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('M?? b??u ki???n')}:
              </Col>
              <Col xs="12" sm="7" className="color-primary">
                {packageInformation && packageInformation.PACKAGE_ID}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Ng??y t???o')}:
              </Col>
              <Col xs="12" sm="7">
                {packageInformation && moment(packageInformation.CREATED_ON, 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('D???ch v???')}:
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
                {t('Tr???ng th??i')}:
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
      <Col xl="4" xs="12" className="mb-3 sipOrderInputCol">
        <div className="sipContentContainer">
          <div className="sipInputBlock">
            <h3> {t('Ng?????i g???i')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('H??? & t??n')}:
              </Col>
              <Col xs="12" sm="7">
                {get(packageInformation, 'SHIPER_NAME')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('??i???n tho???i')}:
              </Col>
              <Col xs="12" sm="7">
                {get(packageInformation, 'MOBILE_PHONE_SRC')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('?????a ch???')}:
              </Col>
              <Col xs="12" sm="7">
                {packageInformation &&
                  `${packageInformation.HOUSE_NO_SOURCE ? packageInformation.HOUSE_NO_SOURCE : ''}${' '}
                  ${packageInformation.STREET_ID_SOURCE ? packageInformation.STREET_ID_SOURCE : ''}${' '}
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

  function renderReceiverCustomer(): JSX.Element {
    return (
      <Col xl="4" xs="12" className="mb-3 sipOrderInputCol">
        <div className="sipContentContainer">
          <div className="sipInputBlock">
            <h3> {t('Ng?????i nh???n')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('H??? & t??n')}:
              </Col>
              <Col xs="12" sm="7">
                {packageInformation && packageInformation.CONSIGNEE_NAME}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('??i???n tho???i')}:
              </Col>
              <Col xs="12" sm="7">
                {packageInformation && packageInformation.MOBILE_PHONE_DES}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('?????a ch???')}:
              </Col>
              <Col xs="12" sm="7">
                {packageInformation &&
                  `${packageInformation.HOUSE_NO_DES ? packageInformation.HOUSE_NO_DES : ''}${' '}
                  ${packageInformation.STREET_ID_DES ? packageInformation.STREET_ID_DES : ''}${' '}
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

  // eslint-disable-next-line max-lines-per-function
  function renderPackageInformation(): JSX.Element {
    return (
      <Col xl="4" xs="12">
        <div className="sipInputBlock">
          <h3>{t('Th??ng tin h??ng h??a')}</h3>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('M???t h??ng')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.ITEM_DESCRIPTION}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Tr???ng l?????ng')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.GROSS_WEIGHT && parseInt(packageInformation.GROSS_WEIGHT)} g
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('S??? l?????ng')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.Quantity && parseFloat(packageInformation.Quantity).toFixed(0)}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Gi?? tr???')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.GoodValue && numberFormat(packageInformation.GoodValue)} ??
            </Col>
          </Row>
          {/* <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('C?????c ph??')}:
            </Col>
            <Col xs="12" sm="8">
              23.500 ?? (ch??a c?? y??u c???u)
            </Col>
          </Row> */}
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('Ti???n thu h???')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.COD && numberFormat(packageInformation.COD)} ??
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
          <h3> {t('B??u t?? giao')}</h3>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('H??? & t??n')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.DELIVERY_POSTMAN_NAME}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('S??? ??i???n tho???i')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.DELIVERY_POSTMAN_PHONE}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('B??u c???c')}:
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
          <h3> {t('B??u t?? nh???n')}</h3>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('H??? & t??n')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.PICKUP_POSTMAN_NAME}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('S??? ??i???n tho???i')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.PHONE_OF_PICKUP_POSTMAN}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="4">
              {t('B??u c???c')}:
            </Col>
            <Col xs="12" sm="8">
              {packageInformation && packageInformation.SOURCE_PO_ID}
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
          <ButtonGoBack />
          {t('Th??ng tin ????n h??ng')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="ml-2" color="primary" onClick={handleGotoEditForwardingOrder}>
            <i className="fa fa-pencil mr-2" />
            {t('S???a phi???u g???i')}
          </Button>
          <Button className="ml-2" color="primary">
            <i className="fa fa-barcode mr-2" />
            {t('In m?? v???ch')}
          </Button>
          <Button className="ml-2" color="primary">
            <i className="fa fa-print mr-2" />
            {t('In m?? phi???u')}
          </Button>
        </div>
      </Row>
      <Row className="sipOrderInputRow">
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
      <h1 className="sipTitle">{t('Th??ng tin h??nh tr??nh')}</h1>
      {renderTable()}
    </>
  );
};

export default PackageInformation;
