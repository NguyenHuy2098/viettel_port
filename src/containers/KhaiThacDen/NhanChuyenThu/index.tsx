import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Button, Input, InputGroup, InputGroupAddon, Row, Form } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, get, toNumber } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import { action_MIOA_ZTMI022 } from 'redux/MIOA_ZTMI022/actions';
import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorPaging, makeSelectorRow, makeSelectorPagingCount } from 'redux/MIOA_ZTMI047/selectors';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
const ShippingInformation: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pagingChuyenThuDaQuetNhan = useSelector(makeSelectorPaging('ZC3', '106'));
  const listChuyenThuDaQuetNhan = useSelector(makeSelectorRow('ZC3', '106'));
  const countChuyenThuDaQuetNhan = useSelector(makeSelectorPagingCount('ZC3', '106'));
  const [idChuyenThu, setIdChuyenThu] = useState<string>();
  const [page, setPage] = useState<number>(1);

  function getListChuyenThuDaQuetNhan(): void {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_TOR_TYPE: 'ZC3',
        IV_FR_LOC_ID: '',
        IV_TO_LOC_ID: 'HUB1',
        IV_CUST_STATUS: '106',
        IV_FR_DATE: '20190501',
        IV_TO_DATE: '20190831',
        IV_PAGENO: page,
        IV_NO_PER_PAGE: '10',
      }),
    );
  }

  useEffect(() => {
    getListChuyenThuDaQuetNhan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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

  function handleChangeCodeChuyenThu(event: ChangeEvent<HTMLInputElement>): void {
    setIdChuyenThu(event.target.value);
  }

  function handleQuetNhanChuyenThu(): void {
    dispatch(
      action_MIOA_ZTMI023(
        {
          IV_ID: idChuyenThu,
        },
        {
          onSuccess: (data: API.MIOAZTMI023Response) => {
            const infoChuyenThu: API.RowResponseZTMI023OUT = get(data, 'MT_ZTMI023_OUT.row[0]');
            dispatch(
              action_MIOA_ZTMI022(
                {
                  row: {
                    CU_NO: '',
                    FU_NO: get(infoChuyenThu, 'TOR_ID'),
                    LOC_ID: 'HUB1',
                    STATUS_ID: '1',
                    USER_ID: 'KT1',
                  },
                },
                // {
                //   onSuccess: (data: API.MIOAZTMI022Response) => {
                //     console.log(data);
                //   },
                // },
              ),
            );
          },
        },
      ),
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
            value={idChuyenThu}
          />
        </InputGroup>
        <Button onClick={handleQuetNhanChuyenThu} color="primary">
          {t('Quét mã')}
        </Button>
      </Form>
    );

    return (
      <Row className="sipBgWhiteContainer d-flex justify-content-between">
        <Col md={10}>{renderForm()}</Col>
        <Col className="d-flex justify-content-end align-items-center" md={2}>
          {t('Tổng số')}
          {t('HYPHEN', ':')}&nbsp;<strong>{countChuyenThuDaQuetNhan}</strong>
        </Col>
      </Row>
    );
  }

  const handlePageChange = ({ selected }: { selected: number }): void => {
    setPage(selected + 1);
  };

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
        Cell: ({ row }: Cell): string => {
          return `${ceil(get(row, 'original.NET_WEI_VAL'), 2)} ${get(row, 'original.NET_WEI_UNI')}`;
        },
      },
      {
        Header: t('Ngày tạo'),
        Cell: ({ row }: Cell): string => {
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
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
        <DataTable columns={columns} data={listChuyenThuDaQuetNhan} onRowClick={handleRedirectDetail} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={toNumber(get(pagingChuyenThuDaQuetNhan, 'EV_TOTAL_PAGE'))}
          onPageChange={handlePageChange}
        />
      </Row>
    </div>
  );
};
export default ShippingInformation;
