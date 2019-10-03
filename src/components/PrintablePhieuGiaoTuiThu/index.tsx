import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Cell } from 'react-table';
import JsBarcode from 'jsbarcode';
import moment from 'moment';

import { ceil, get, isEmpty } from 'lodash';
import DataTable from 'components/DataTable/Printable';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import logo from '../../assets/img/logo.png';

interface Props {
  idChuyenThu: string;
}

// eslint-disable-next-line max-lines-per-function
const PrintablePhieuGiaoTuiThu = (props: Props): JSX.Element => {
  const { idChuyenThu } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [infoChuyenThu, setInfoChuyenThu] = useState<API.Child | undefined>();
  const [data, setData] = useState<API.Child[]>([]);

  useEffect(() => {
    if (!isEmpty(idChuyenThu)) {
      dispatch(
        action_MIOA_ZTMI046(
          {
            IV_TOR_ID: idChuyenThu,
            IV_NO_PER_PAGE: '10000',
            IV_PAGENO: '1',
          },
          {
            onSuccess: (data: API.MIOAZTMI046Response): void => {
              setData(get(data, 'MT_ZTMI046_OUT.Row[0].CHILDS', []) || []);
              setInfoChuyenThu(get(data, 'MT_ZTMI046_OUT.Row[0].CHILDS[0]'));
            },
          },
          {
            stateless: true,
          },
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idChuyenThu]);

  useEffect(() => {
    JsBarcode('#barcode', idChuyenThu, {
      displayValue: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('STT'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `${row.index + 1}`;
        },
      },
      {
        Header: t('SỐ HIỆU TÚI ĐÓNG'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('T.Lượng NET'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `${ceil(get(row, 'original.GRO_WEI_VAL'), 2)} ${get(row, 'original.GRO_WEI_UNI')}`;
        },
      },
      {
        Header: t('NƠI GỬI'),
        accessor: 'SRC_LOC_IDTRQ',
      },
      {
        Header: t('NƠI NHẬN'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('GHI CHÚ'),
        accessor: 'DESCRIPTION',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const footerTable = (): ReactElement => {
    return (
      <tfoot>
        <tr>
          <td colSpan={columns.length}>
            <div className="font-weight-bold">
              {t('Tổng số túi')}
              {t('COLON', ': ')}
              {data.length}
            </div>
          </td>
        </tr>
      </tfoot>
    );
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col xs={3}>
          <img src={logo} alt="ViettelPost Logo" width="100%" />
        </Col>
        <Col xs={9} className="border-bottom">
          <h5 className="text-center font-weight-bold">{t('CHUYÊN NGHIỆP - NHANH - HIỆU QUẢ')}</h5>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12}>
          <h4 className="text-center font-weight-bold">{t('PHIẾU GIAO NHẬN TÚI THƯ')}</h4>
        </Col>
      </Row>
      <Row className="">
        <Col xs={4}>
          <div>
            {t('Ngày tháng')}
            {t('COLON', ': ')}
            {moment(get(infoChuyenThu, 'DATETIME_CHLC', ''), 'YYYYMMDDhhmmss').format(' DD/MM/YYYY ')}
          </div>
          <div>
            {t('Từ')}
            {t('COLON', ': ')}
            {get(infoChuyenThu, 'LOG_LOCID_SRC')}
          </div>
          <div>
            {t('Mã túi thư')}
            {t('COLON', ': ')}
            {get(infoChuyenThu, 'TOR_ID')}
          </div>
        </Col>
        <Col xs={4}>
          <div>
            <br />
            <span></span>
          </div>

          <div>
            {t('Đến')}
            {t('COLON', ': ')}
            {get(infoChuyenThu, 'LOG_LOCID_DES')}
          </div>
          <div>
            {t('Mã đến')}
            {t('COLON', ': ')}
          </div>
        </Col>
        <Col xs={4}>
          <div>
            <img id="barcode" alt="barcode" width="100%" />
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="font-italic" xs={8}></Col>
        <Col xs={4}>
          <div className="text-center">{idChuyenThu}</div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <DataTable columns={columns} data={data} renderFooter={footerTable} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12}>
          {t('Ghi chú của túi thư')}
          {t('COLON', ': ')}
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={3}>
          <div className="text-center">{t('Chữ ký')}</div>
          <div className="text-center">{t('Nhân viên khai thác đóng túi thư')}</div>
        </Col>
        <Col xs={3}>
          <div className="text-center">{t('Chữ ký')}</div>
          <div className="text-center">{t('Kiểm soát viên')}</div>
        </Col>
        <Col xs={3}>
          <div className="text-center">{t('Chữ ký')}</div>
          <div className="text-center">{t('Hộ tống lái xe')}</div>
        </Col>
        <Col xs={3}>
          <div className="text-center">{t('Chữ ký')}</div>
          <div className="text-center">{t('Nhân viên bưu cục nhận túi thư')}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default PrintablePhieuGiaoTuiThu;
