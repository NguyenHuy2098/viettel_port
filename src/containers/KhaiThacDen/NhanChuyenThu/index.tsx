import React, { useCallback, useEffect, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, get } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Scan from 'components/Input/Scan';
import Pagination from 'components/Pagination';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorPagingCount, makeSelectorRow, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
const ShippingInformation: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.CHUYEN_THU, SipDataState.CHUYEN_THU_DA_QUET_NHAN));
  const listChuyenThuDaQuetNhan = useSelector(
    makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.CHUYEN_THU_DA_QUET_NHAN),
  );
  const countChuyenThuDaQuetNhan = useSelector(
    makeSelectorPagingCount(SipDataType.CHUYEN_THU, SipDataState.CHUYEN_THU_DA_QUET_NHAN),
  );

  const getListChuyenThuDaQuetNhan = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_CUST_STATUS: SipDataState.CHUYEN_THU_DA_QUET_NHAN,
          IV_PAGENO: IV_PAGENO,
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DEN },
      ),
    );
  };

  useEffect(() => {
    getListChuyenThuDaQuetNhan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = ({ selected }: { selected: number }): void => {
    getListChuyenThuDaQuetNhan(selected + 1);
  };

  const handleSuccessQuetNhan = (): void => {
    getListChuyenThuDaQuetNhan();
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
        Header: t('Số lượng'),
        accessor: 'ITEM_NO',
      },
      {
        Header: t('Trọng lượng'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `${ceil(get(row, 'original.NET_WEI_VAL'), 2)} ${get(row, 'original.NET_WEI_UNI')}`;
        },
      },
      {
        Header: t('Ngày tạo'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const renderInfo = (): JSX.Element => (
    <Row className="mb-3 sipTitleContainer">
      <Col className="px-0" md={8}>
        <h3>{t('Nhận chuyến thư')}</h3>
      </Col>
    </Row>
  );

  const renderScanner = (): JSX.Element => (
    <Row className="sipBgWhiteContainer d-flex justify-content-between">
      <Col md={6}>
        <Scan onSuccess={handleSuccessQuetNhan} placeholder={t('Quét mã chuyến thư')} />
      </Col>
      <Col className="d-flex justify-content-end align-items-center" md={2}>
        {t('Tổng số')}
        {t('HYPHEN', ':')}&nbsp;<strong>{countChuyenThuDaQuetNhan}</strong>
      </Col>
    </Row>
  );

  return (
    <div>
      {renderInfo()}
      {renderScanner()}
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={listChuyenThuDaQuetNhan} onRowClick={handleRedirectDetail} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onThisPaginationChange={handlePageChange}
        />
      </Row>
    </div>
  );
};
export default ShippingInformation;
