import React, { useCallback, useMemo, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, concat, get } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Scan from 'components/Input/Scan';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
const NhanRiengBangKePhieuGui: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [listBangKePhieuGuiDaQuet, setListBangKePhieuGuiDaQuet] = useState<API.RowResponseZTMI023OUT[]>([]);

  const handleSuccessQuetNhan = (infoBangKePhieuGui: API.RowResponseZTMI023OUT): void => {
    setListBangKePhieuGuiDaQuet(concat(listBangKePhieuGuiDaQuet, infoBangKePhieuGui));
  };

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã bảng kê / Phiếu gửi'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đi'),
        accessor: 'FR_LOG_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'TO_LOG_ID',
      },
      {
        Header: t('Số lượng'),
        accessor: 'CHILD_COUNT',
      },
      {
        Header: t('Trọng lượng'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `${ceil(get(row, 'original.GRO_WEI_VAL'), 2)} ${get(row, 'original.GRO_WEI_UNI')}`;
        },
      },
      {
        Header: t('Ngày tạo'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.CREATED_ON'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
      {
        Header: t('Loại'),
        accessor: 'TOR_TYPE',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <Button className="SipTableFunctionIcon">
              <i className="fa fa-print fa-lg color-green" />
            </Button>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.THONG_TIN_BANG_KE_PHIEU_GUI, { idBangKe: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listBangKePhieuGuiDaQuet],
  );

  const renderToolbar = (): JSX.Element => (
    <Row>
      <Col className="btn-toolbar" md={6}>
        <Scan onSuccess={handleSuccessQuetNhan} placeholder={t('Quét mã bảng kê/phiếu gửi')} />
      </Col>
    </Row>
  );

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={listBangKePhieuGuiDaQuet} onRowClick={handleRedirectDetail} />
      </Row>
    </>
  );
};

export default NhanRiengBangKePhieuGui;
