import React, { useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Cell } from 'react-table';
import JsBarcode from 'jsbarcode';
import { get, isEmpty, size, toString } from 'lodash';

import DataTable from 'components/DataTable/Printable';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';

interface Props {
  idTai: string;
}

// eslint-disable-next-line max-lines-per-function
const PrintableMaCoTai = (props: Props): JSX.Element => {
  const { idTai } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [infoChuyenThu, setInfoChuyenThu] = useState<API.RowMTZTMI046OUT[]>([]);

  useEffect(() => {
    if (!isEmpty(idTai)) {
      dispatch(
        action_MIOA_ZTMI046(
          {
            IV_TOR_ID: idTai,
            IV_NO_PER_PAGE: '10000',
            IV_PAGENO: '1',
          },
          {
            onSuccess: (data: API.MIOAZTMI046Response): void => {
              setInfoChuyenThu(get(data, 'MT_ZTMI046_OUT.Row', []));
            },
          },
          {
            stateless: true,
          },
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTai]);

  useEffect(() => {
    JsBarcode('#barcode', idTai, {
      displayValue: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: t('TL'),
        Cell: ({ row }: Cell<API.RowMTZTMI046OUT>): string => {
          return parseFloat(get(row, 'original.NET_WEI_VAL', '0')).toFixed(2);
        },
      },
      {
        Header: t('SL'),
        Cell: ({ row }: Cell<API.RowMTZTMI046OUT>): string => {
          return toString(size(get(row, 'original.CHILDS')));
        },
      },
      {
        Header: t('Mã BC đi'),
        accessor: 'LOG_LOCID_SRC',
      },
      {
        Header: t('MÃ BC đến'),
        accessor: 'LOG_LOCID_DES',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [infoChuyenThu],
  );

  const renderBarCode = (): JSX.Element => {
    return (
      <Col xs={4}>
        <div>
          <img id="barcode" alt="barcode" width="100%" />
        </div>
      </Col>
    );
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col xs={6}>
          <Row className="ml-0">
            <b>{get(infoChuyenThu, 'LOG_LOCID_SRC', '')}</b>
          </Row>
          <Row className="ml-0">
            <p className="align-items-center mb-0 d-flex text-bold">SCAN</p>
            {renderBarCode()}
          </Row>
          <Row className="ml-0">{idTai}</Row>
          <Row className="ml-0 text-bold">AUTO</Row>
          <DataTable columns={columns} data={infoChuyenThu} />
        </Col>
      </Row>
    </Container>
  );
};

export default PrintableMaCoTai;
