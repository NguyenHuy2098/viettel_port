import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Button, Input, InputGroup, InputGroupAddon, Row, Form } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, get } from 'lodash';

import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorCountMT_ZTMI046 } from 'redux/MIOA_ZTMI046/selectors';
import { makeSelectorChuyenThuDaQuetNhan } from 'redux/MIOA_ZTMI047/selectors';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
const ShippingInformation: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const countChuyenThu = useSelector(makeSelectorCountMT_ZTMI046);
  const chuyenThuDaQuetNhan = useSelector(makeSelectorChuyenThuDaQuetNhan);
  const [codeChuyenThu, setCodeChuyenThu] = useState<string>();

  function dispatch_action_MIOA_ZTMI047(): void {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_TOR_TYPE: 'ZC3',
        IV_FR_LOC_ID: '',
        IV_TO_LOC_ID: 'HUB1',
        IV_CUST_STATUS: '106',
        IV_FR_DATE: '20190501',
        IV_TO_DATE: '20190831',
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '10',
      }),
    );
  }

  useEffect(() => {
    dispatch_action_MIOA_ZTMI047();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderOrderInformationTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <Col className="px-0" md={9}>
          <h3>{t('Nhận chuyến thư')}</h3>
        </Col>
        <Col className="px-0" md={3}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">
                <i className="fa fa-search" />
              </span>
            </InputGroupAddon>
            <Input className="w-25" type="search" placeholder={t('Tra cứu chuyến thư')} />
          </InputGroup>
        </Col>
      </Row>
    );
  }

  function handleChangeCodeChuyenThu(e: ChangeEvent<HTMLInputElement>): void {
    setCodeChuyenThu(e.target.value);
  }

  function handleSearchCodeChuyenThu(): void {
    dispatch(
      action_MIOA_ZTMI046({
        IV_TOR_ID: codeChuyenThu,
      }),
    );
    dispatch(
      action_MIOA_ZTMI023({
        IV_ID: codeChuyenThu,
      }),
    );
  }

  function renderFindOrder(): JSX.Element {
    const renderForm = (): JSX.Element => (
      <Form inline>
        <InputGroup className="mr-3">
          <InputGroupAddon addonType="prepend">
            <span className="input-group-text">
              <i className="fa fa-barcode" />
            </span>
          </InputGroupAddon>
          <Input
            onChange={handleChangeCodeChuyenThu}
            placeholder="Quét mã chuyến thư"
            type="text"
            value={codeChuyenThu}
          />
        </InputGroup>
        <Button onClick={handleSearchCodeChuyenThu} color="primary">
          {t('Quét mã')}
        </Button>
      </Form>
    );

    return (
      <Row className="sipBgWhiteContainer d-flex justify-content-between">
        <Col md={10}>{renderForm()}</Col>
        <Col className="d-flex justify-content-end align-items-center" md={2}>
          {t('Tổng số')}
          {t('HYPHEN', ':')}&nbsp;<strong>{countChuyenThu}</strong>
        </Col>
      </Row>
    );
  }

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.THONG_TIN_CHUYEN_THU, { idChuyenThu: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const columns = useMemo(
    () => [
      {
        Header: t('Mã chuyến thư'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Bưu cục đi'),
        accessor: 'LOG_LOCID_FR',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'NET_WEI_VAL',
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <span>
              {ceil(get(row, 'original.NET_WEI_VAL'), 2)}&nbsp;{get(row, 'original.NET_WEI_UNI')}
            </span>
          );
        },
      },
      {
        Header: t('Ngày tạo'),
        accessor: 'DATETIME_CHLC',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div>
      {renderOrderInformationTitle()}
      {renderFindOrder()}
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={chuyenThuDaQuetNhan} onRowClick={handleRedirectDetail} />
      </Row>
    </div>
  );
};
export default ShippingInformation;
