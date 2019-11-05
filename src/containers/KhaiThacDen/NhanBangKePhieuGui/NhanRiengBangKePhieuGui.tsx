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
import { SipDataTorType, SipFlowType } from 'utils/enums';

// eslint-disable-next-line max-lines-per-function
const NhanRiengBangKePhieuGui: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [listBangKePhieuGuiDaQuet, setListBangKePhieuGuiDaQuet] = useState<API.RowResponseZTMI023OUT[]>([]);

  const handleSuccessQuetNhan = (infoBangKePhieuGui: API.RowResponseZTMI023OUT): void => {
    const check = listBangKePhieuGuiDaQuet.map(item => item.TOR_ID === infoBangKePhieuGui.TOR_ID);
    if (check.length === 0) {
      setListBangKePhieuGuiDaQuet(concat(listBangKePhieuGuiDaQuet, infoBangKePhieuGui));
    }
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
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          const value = get(SipDataTorType, get(row, 'original.TOR_TYPE', ''), '');
          if (value) return value;
          return '';
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <Button className="SipTableFunctionIcon">
              <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />
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
        <Scan flow={SipFlowType.KHAI_THAC_DEN} onSuccess={handleSuccessQuetNhan} placeholder={t('Quét mã bảng kê')} />
      </Col>
    </Row>
  );

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={listBangKePhieuGuiDaQuet} onRowClick={handleRedirectDetail} />
      </Row>
    </>
  );
};

export default NhanRiengBangKePhieuGui;
