import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Cell } from 'react-table';
import JsBarcode from 'jsbarcode';

import { ceil, get, isEmpty } from 'lodash';
import DataTable from 'components/DataTable/Printable';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import logo from '../../assets/img/logo.png';

interface Props {
  idChuyenThu: string;
}

// eslint-disable-next-line max-lines-per-function
const PrintBangKeChiTiet = (props: Props): JSX.Element => {
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
              setInfoChuyenThu(get(data, 'MT_ZTMI046_OUT.Row[0]'));
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
        Header: t('Số hiệu BP'),
        accessor: 'PACKAGE_ID',
      },
      {
        Header: t('Vận đơn gốc'),
        accessor: 'PACKAGE_ID',
      },

      {
        Header: t('Nơi đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('B.cục gốc'),
        accessor: 'SRC_LOC_IDTRQ',
      },
      {
        Header: t('B.cục phát'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('T.Lượng NET'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return get(row, 'original.GRO_WEI_VAL')
            ? `${ceil(get(row, 'original.GRO_WEI_VAL'), 2)} ${get(row, 'original.GRO_WEI_UNI')}`
            : '';
        },
      },
      {
        Header: t('Cước phí'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `Thiếu API`;
        },
      },
      {
        Header: t('Phụ phí khác'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `Thiếu API`;
        },
      },
      {
        Header: t('Mã KH'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `Thiếu API`;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const footerTable = (): ReactElement => {
    return (
      <tfoot>
        <tr>
          <td colSpan={6}>
            <div className="font-weight-bold">
              {t('Tổng cộng')}
              {t('COLON', ': ')}
            </div>
          </td>
          <td>
            <div className="font-weight-bold">
              {get(infoChuyenThu, 'NET_WEI_VAL') && ceil(get(infoChuyenThu, 'NET_WEI_VAL'), 2)}{' '}
              {get(infoChuyenThu, 'NET_WEI_UNI')}
            </div>
          </td>

          <td>
            <div className="font-weight-bold">Thiếu API</div>
          </td>
          <td>
            <div className="font-weight-bold">Thiếu API</div>
          </td>
          <td>
            <div className="font-weight-bold">Thiếu API</div>
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
      <Row>
        <Col xs={12}>
          <h4 className="text-center font-weight-bold">{t('BẢNG KÊ CHI TIẾT')}</h4>
        </Col>
      </Row>
      <Row className="">
        <Col xs={4}>
          <div>
            {t('Mã bảng kê')}
            {t('COLON', ': ')}
            {get(infoChuyenThu, 'TOR_ID')}
          </div>
          <div>
            {t('Từ')}
            {t('COLON', ': ')}
            {get(infoChuyenThu, 'LOG_LOCID_SRC')}
          </div>
        </Col>
        <Col xs={4}>
          <div>
            {t('Mã túi thư')}
            {t('COLON', ': ')}
          </div>

          <div>
            {t('Đến')}
            {t('COLON', ': ')}
            {get(infoChuyenThu, 'LOG_LOCID_DES')}
          </div>
          <div>
            {t('Trọng lượng')}
            {t('COLON', ': ')}
            {get(infoChuyenThu, 'NET_WEI_VAL') && ceil(get(infoChuyenThu, 'NET_WEI_VAL'), 2)}{' '}
            {get(infoChuyenThu, 'NET_WEI_UNI')}
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
      <Row className="mb-4">
        <Col xs={12} className={'font-weight-bold'}>
          {t('LINE')}
          {t('COLON', ': ')}
          {get(data, '[0].DESCRIPTION')}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12}>
          <DataTable columns={columns} data={data} renderFooter={footerTable} />
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={3}>
          <div className="text-center">{t('Chữ ký')}</div>
          <div className="text-center">{t('Nhân viên đóng túi')}</div>
        </Col>
        <Col xs={3}>
          <div className="text-center">{t('Chữ ký')}</div>
          <div className="text-center">{t('Nhân viên mở túi')}</div>
        </Col>
        <Col xs={3}>
          <div className="text-center">{t('Dấu ngày bưu cục đóng chuyến thư')}</div>
        </Col>
        <Col xs={3}>
          <div className="text-center">{t('Dấu ngày bưu cục nhận chuyến thư')}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default PrintBangKeChiTiet;
