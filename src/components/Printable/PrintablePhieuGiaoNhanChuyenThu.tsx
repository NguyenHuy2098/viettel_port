import React, { useEffect, useMemo } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from 'react-table';
import JsBarcode from 'jsbarcode';
import { ceil, get, isEmpty, toNumber } from 'lodash';

import DataTable from 'components/DataTable/Printable';
import DefaultHeadline from 'components/Printable/DefaultHeadline';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { makeSelector046ListChildren, makeSelector046RowFirstChild } from 'redux/MIOA_ZTMI046/selectors';
import { SipDataType } from 'utils/enums';

interface Props {
  idChuyenThu: string;
}

// eslint-disable-next-line max-lines-per-function
const PrintablePhieuGiaoNhanChuyenThu = (props: Props): JSX.Element => {
  const { idChuyenThu } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const infoChuyenThu = useSelector(makeSelector046RowFirstChild);
  const data = useSelector(makeSelector046ListChildren);

  useEffect(() => {
    if (!isEmpty(idChuyenThu)) {
      dispatch(
        action_MIOA_ZTMI046({
          IV_TOR_ID: idChuyenThu,
          IV_NO_PER_PAGE: '10000',
          IV_PAGENO: '1',
        }),
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
        Header: t('MÃ SỐ'),
      },
      {
        Header: t('SMS ID'),
      },
      {
        Header: t('SỐ HIỆU TẢI KIỆN'),
        accessor: 'TOR_ID',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          const torType = get(row, 'original.TOR_TYPE', '');
          if (torType === SipDataType.BUU_GUI || torType === SipDataType.KIEN) {
            return get(row, 'original.PACKAGE_ID', '');
          }
          return get(row, 'original.TOR_ID', '');
        },
      },
      {
        Header: t('MÃ SỐ BẢNG KÊ'),
      },
      {
        Header: t('S.L (bp)'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return get(row, 'original.child_count');
        },
      },
      {
        Header: t('T.Lượng NET'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          const groWeiVal = toNumber(get(row, 'original.GRO_WEI_VAL'));
          return groWeiVal ? `${ceil(groWeiVal, 2)} ${get(row, 'original.GRO_WEI_UNI')}` : '';
        },
      },
      {
        Header: t('T.L CƯỚC'),
      },
      {
        Header: t('DOANH SỐ'),
      },
      {
        Header: t('DỊCH VỤ'),
      },
      {
        Header: t('BƯU CỤC GỐC'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return get(row, 'original.SRC_LOC_IDTRQ', '');
        },
      },
      {
        Header: t('NƠI ĐI'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return get(row, 'original.SRC_LOC_IDTRQ', '');
        },
      },
      {
        Header: t('NƠI ĐẾN'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return get(row, 'original.DES_LOC_IDTRQ', '');
        },
      },
      {
        Header: t('BƯU CỤC PHÁT'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return get(row, 'original.DES_LOC_IDTRQ', '');
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Container>
      <DefaultHeadline />
      <Row className="mb-4">
        <Col xs={12}>
          <h4 className="text-center font-weight-bold">{t('PHIẾU GIAO NHẬN CHUYẾN THƯ')}</h4>
        </Col>
      </Row>
      <Row className="">
        <Col xs={4}>
          <div className="font-weight-bold">
            {t('Từ')}
            {t('COLON', ': ')}
            {get(infoChuyenThu, 'LOG_LOCID_SRC')}
          </div>
          <div className="font-weight-bold">
            {t('Chuyến thư')}
            {t('COLON', ': ')}
            {get(infoChuyenThu, 'TOR_ID')}
          </div>
          <div>
            {t('Dự định đi')}
            {t('COLON', ': ')}
          </div>
        </Col>
        <Col xs={4}>
          <div className="font-weight-bold">
            {t('Đến')}
            {t('COLON', ': ')}
            {get(infoChuyenThu, 'LOG_LOCID_DES')}
          </div>
          <div className="font-weight-bold">
            {t('Trọng lượng')}
            {t('COLON', ': ')}
            {ceil(toNumber(get(infoChuyenThu, 'NET_WEI_VAL')), 2)}
            {t(' ')}
            {get(infoChuyenThu, 'NET_WEI_UNI')}
          </div>
          <div>
            {t('Dự định đến')}
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
        <Col className="font-italic" xs={8}>
          {t('Ghi chú')}
          {t('COLON', ': ')}
        </Col>
        <Col xs={4}>
          <div className="text-center">
            {t('ID chuyến thư')}
            {t('COLON', ': ')}
            {idChuyenThu}
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} className="sipTableNoBreakWord">
          <DataTable columns={columns} data={data} />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col xs={3}>
          <div className="text-center">{t('Chữ ký')}</div>
          <div className="text-center">{t('Nhân viên đóng chuyến thư')}</div>
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
          <div className="text-center">{t('Nhân viên nhận chuyến thư')}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default PrintablePhieuGiaoNhanChuyenThu;
