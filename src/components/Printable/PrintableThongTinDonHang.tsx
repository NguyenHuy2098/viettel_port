import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import JsBarcode from 'jsbarcode';
import moment from 'moment';
import { head, get, isEmpty, split } from 'lodash';
import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';
import { action_GET_ADDRESS } from 'redux/LocationSearch/actions';

interface Props {
  idDonHang: string;
  idChuyenThu: string;
  type: string;
}

// eslint-disable-next-line max-lines-per-function
const PrintableThongTinDonHang = (props: Props): JSX.Element => {
  const { idDonHang, idChuyenThu, type } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [data, setData] = useState<API.RowMTZTMI031OUT | undefined>(undefined);
  const [provinceSender, setProvinceSender] = useState<string>('');
  const [districtSender, setDistrictSender] = useState<string>('');
  const [wardSender, setWardSender] = useState<string>('');
  const [provinceReceiver, setProvinceReceiver] = useState<string>('');
  const [districtReceiver, setDistrictReceiver] = useState<string>('');
  const [wardReceiver, setWardReceiver] = useState<string>('');

  useEffect(() => {
    if (!isEmpty(idDonHang)) {
      dispatch(
        action_MIOA_ZTMI031(
          {
            FWO_ID: idDonHang,
            BUYER_REFERENCE_NUMBER: '',
          },
          {
            onSuccess: (data: API.MIOAZTMI031Response): void => {
              setData(get(data, 'MT_ZTMI031_OUT.Row[0]'));
            },
          },
          {
            stateless: true,
          },
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idDonHang]);

  // eslint-disable-next-line max-lines-per-function
  useEffect((): void => {
    if (get(data, 'PROVINCE_ID_SOURCE')) {
      dispatch(
        action_GET_ADDRESS(
          { Id: get(data, 'PROVINCE_ID_SOURCE') },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              setProvinceSender(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (get(data, 'DISTRICT_ID_SOURCE')) {
      dispatch(
        action_GET_ADDRESS(
          { Id: get(data, 'DISTRICT_ID_SOURCE') },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              setDistrictSender(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (get(data, 'WARD_ID_SOURCE')) {
      dispatch(
        action_GET_ADDRESS(
          { Id: get(data, 'WARD_ID_SOURCE') },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              setWardSender(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (get(data, 'PROVINCE_ID_DES')) {
      dispatch(
        action_GET_ADDRESS(
          { Id: get(data, 'PROVINCE_ID_DES') },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              setProvinceReceiver(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (get(data, 'DISTRICT_ID_DES')) {
      dispatch(
        action_GET_ADDRESS(
          { Id: get(data, 'DISTRICT_ID_DES') },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              setDistrictReceiver(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    if (get(data, 'WARD_ID_DES')) {
      dispatch(
        action_GET_ADDRESS(
          { Id: get(data, 'WARD_ID_DES') },
          {
            onSuccess: (data: VtpAddressResponse): void => {
              setWardReceiver(get(data, 'LocationModels[0].N'));
            },
          },
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    JsBarcode('#barcode', idChuyenThu, {
      displayValue: false,
      height: 65,
      margin: 5,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idChuyenThu, type]);

  function renderABC(): JSX.Element {
    return (
      <Row className="border-bottom">
        <Col xs={3} className="border-right pt-2">
          <p>{t('Thu h???')}</p>
        </Col>
        <Col xs={9} className="pt-2">
          <p>Lo???i h??nh : Ch??a c?? API</p>
          <Row>
            <Col xs={6}>
              <p>
                <strong>Ti???n thu h???:</strong>
              </p>
            </Col>
            <Col xs={6}>
              <p>
                <strong>
                  {get(data, 'COD')} ({get(data, 'Item[0].CURRENCY_ITEM')})
                </strong>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  const renderTableBody = (): JSX.Element => {
    return (
      <tbody>
        <tr>
          <td className="border-0">
            <strong>
              {wardReceiver} {districtReceiver}
            </strong>
          </td>
          <td className="border-0">T???nh ph??t: {provinceReceiver}</td>
        </tr>
        {/* <tr>
          <td className="border-0">
            <strong>{districtReceiver}</strong>
          </td>
          <td className="border-0">
            <strong>{provinceReceiver}</strong>
          </td>
        </tr> */}
      </tbody>
    );
  };

  function renderKhachHangNhan(): JSX.Element {
    return (
      <Row className="border-bottom part-3">
        <Col xs={3} className="border-right pt-2">
          <p>{t('Kh??ch h??ng nh???n')}</p>
        </Col>
        <Col xs={9} className="pt-2 part-3-right">
          <p>Ng?????i nh???n : {get(data, 'CONSIGNEE_NAME')}</p>
          <p>??i???n tho???i: {get(data, 'MOBILE_PHONE_DES')}</p>
          <strong>
            ??ia ch???:
            {`${get(data, 'HOUSE_NO_DES') ? get(data, 'HOUSE_NO_DES') : ''}${' '}
                  ${get(data, 'STREET_ID_DES') ? get(data, 'STREET_ID_DES') : ''}${' '}
                  ${wardReceiver}${' '}
                  ${districtReceiver}${' '}
                  ${provinceReceiver}`}
          </strong>
          <table className="table border-top">{renderTableBody()}</table>
        </Col>
      </Row>
    );
  }

  return (
    <Container style={{ overflow: 'auto' }}>
      <Col className="border">
        <Row className="p-1 border-bottom part-1">
          <Col xs={6} className="">
            <h5 className="font-weight-bold mt-2">
              {t('D???ch v???')}: {get(data, 'SERVICE_TYPE')}
            </h5>
            <p>{moment(get(data, 'CREATED_ON'), 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}</p>
          </Col>
          <Col xs={6} className="">
            <h5 className="font-weight-bold mt-2">
              {t('BC G???C')}: {get(data, 'SOURCE_PO_ID')}
            </h5>
            <p>??i???n tho???i: -/- </p>
          </Col>
        </Row>
        <Row className="border-bottom text-center part-2">
          <Col xs={12} className="text-center">
            <p className="">
              <img className="" id="barcode" alt="barcode" />
            </p>
            <p className="text-center">{idChuyenThu}</p>
          </Col>
        </Row>
        <Row className="border-bottom">
          <Col xs={3} className="border-right pt-2">
            <p>{t('Kh??ch h??ng g???i')}</p>
          </Col>
          <Col xs={9} className="pt-2">
            <p>Ng?????i g???i : {get(data, 'SHIPER_NAME')}</p>
            <p>??i???n tho???i : {get(data, 'MOBILE_PHONE_SRC')}</p>
            <p>
              ?????a ch??? :
              {`${get(data, 'HOUSE_NO_SOURCE') ? get(data, 'HOUSE_NO_SOURCE') : ''}${' '}
                  ${get(data, 'STREET_ID_SOURCE') ? get(data, 'STREET_ID_SOURCE') : ''}${' '}
                  ${wardSender}${' '}
                  ${districtSender}${' '}
                  ${provinceSender}`}
            </p>
          </Col>
        </Row>
        {renderKhachHangNhan()}
        {renderABC()}
        <Row className="border-bottom">
          <Col xs={6} className="border-right pt-2">
            <div>
              <p className="lin">
                {t('N???i dung ')} :{head(split(get(data, 'HEADER_NOTE', ''), '/'))}
              </p>
              {/*{moment(get(infoChuyenThu, 'DATETIME_CHLC', ''), 'YYYYMMDDhhmmss').format('DD/MM/YYYY')}*/}
            </div>
            <div>
              <p>{t('??u ti??n giao ')} : Gia h??ng t??? 8h ?????n 10h s??ng</p>
              {/*{get(infoChuyenThu, 'LOG_LOCID_SRC')}*/}
            </div>
            {/*<div>*/}
            {/*  {t('M?? t??i th??')}*/}
            {/*  {t('COLON', ': ')}*/}
            {/*  {get(infoChuyenThu, 'TOR_ID')}*/}
            {/*</div>*/}
          </Col>
          <Col xs={6} className="border-right pt-2 part-n-1">
            <div className="pb-lg-5 sender-sign-box">
              <p>{t('Ch??? k?? ng?????i g???i')} : </p>
            </div>
            <div className="pb-lg-5">
              <p>{t('Ch??? k?? ng?????i nh???n')} : </p>
            </div>
          </Col>
        </Row>
        <Row className="">
          <Col xs={12} className="part-end text-center pt-2">
            <p>www.viettelpost.com.vn - Hotline: 190.8095</p>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default PrintableThongTinDonHang;
