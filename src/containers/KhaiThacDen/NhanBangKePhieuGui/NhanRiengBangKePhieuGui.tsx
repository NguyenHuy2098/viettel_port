import React, { useCallback, useMemo, useState } from 'react';
import { Button, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, concat, get } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Scan from 'components/Input/Scan';
import { makeSelectorMaBP, makeSelectorPreferredUsername } from 'redux/auth/selectors';
import { action_MIOA_ZTMI022 } from 'redux/MIOA_ZTMI022/actions';
import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
const NhanRiengBangKePhieuGui: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const maBP = useSelector(makeSelectorMaBP);
  const userId = useSelector(makeSelectorPreferredUsername);
  const [idBangKePhieuGui, setIdBangKePhieuGui] = useState<string>('');
  const [listBangKePhieuGuiDaQuet, setListBangKePhieuGuiDaQuet] = useState<API.RowResponseZTMI023OUT[]>([]);

  const handleQuetBangKePhieuGuiId = (): void => {
    dispatch(
      action_MIOA_ZTMI023(
        {
          IV_ID: idBangKePhieuGui,
        },
        {
          onSuccess: (data: API.MIOAZTMI023Response) => {
            const infoBangKePhieuGui: API.RowResponseZTMI023OUT = get(data, 'MT_ZTMI023_OUT.row[0]');
            dispatch(
              action_MIOA_ZTMI022(
                {
                  row: {
                    CU_NO: '',
                    FU_NO: get(infoBangKePhieuGui, 'TOR_ID'),
                    LOC_ID: maBP,
                    STATUS_ID: '1',
                    USER_ID: userId,
                  },
                },
                {
                  onSuccess: () => {
                    setListBangKePhieuGuiDaQuet(concat(listBangKePhieuGuiDaQuet, infoBangKePhieuGui));
                  },
                },
              ),
            );
          },
        },
      ),
    );
  };

  const handleChangeBangKePhieuGuiId = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIdBangKePhieuGui(event.target.value);
  };

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã tải'),
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
      <div className="btn-toolbar col-10">
        <Scan
          buttonProps={{
            onClick: handleQuetBangKePhieuGuiId,
          }}
          onChange={handleChangeBangKePhieuGuiId}
          placeholder={t('Quét mã bảng kê/phiếu gửi')}
        />
      </div>
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
