import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Col, Button, Input, InputGroup, InputGroupAddon, Row, Form } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { push } from 'connected-react-router';

import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { makeSelectorNhanChuyenThu } from 'redux/MIOA_ZTMI023/selectors';
import { makeSelectorCountMT_ZTMI046 } from 'redux/MIOA_ZTMI046/selectors';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
const ShippingInformation: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dataNhanChuyenThu = useSelector(makeSelectorNhanChuyenThu);
  const countChuyenThu = useSelector(makeSelectorCountMT_ZTMI046);
  const [codeChuyenThu, setCodeChuyenThu] = useState<string>();

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
        accessor: 'FR_LOG_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'TO_LOG_ID',
      },
      {
        Header: t('Số lượng'),
        accessor: 'countChuyenThu',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GRO_WEI_VAL',
      },
      {
        Header: t('Ngày tạo'),
        accessor: 'CREATED_ON',
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
        <DataTable columns={columns} data={dataNhanChuyenThu} onRowClick={handleRedirectDetail} />
      </Row>
    </div>
  );
};
export default ShippingInformation;
