import React, { useCallback, useMemo } from 'react';
import { Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, get } from 'lodash';
import moment from 'moment';

import ButtonPrintable from 'components/Button/ButtonPrintable';
import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import PrintablePhieuGiaoTuiThu from 'components/Printable/PrintablePhieuGiaoTuiThu';
import PrintableMaCoTai from 'components/Printable/PrintableMaCoTai';
import { useSipDataType } from 'hooks/useTranslations';
import { makeSelectorRow, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import routesMap from 'utils/routesMap';

interface Props {
  getTaiDaNhan: (IV_PAGENO: number) => void;
}

// eslint-disable-next-line max-lines-per-function
const TaiDaNhan: React.FC<Props> = ({ getTaiDaNhan }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listTaiDaNhan = useSelector(makeSelectorRow(SipDataType.TAI, SipDataState.TAI_KIEN_DA_QUET_NHAN));
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.TAI, SipDataState.TAI_KIEN_DA_QUET_NHAN));

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    getTaiDaNhan(selectedItem.selected + 1);
  };

  const renderPrintButton = (idChuyenThu: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
      }}
      modalBodyProps={{
        children: <PrintablePhieuGiaoTuiThu idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In danh sách bảng kê thuộc tải'),
      }}
    />
  );
  const inMaCoTaiButton = (idTai: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <i className="fa fa-barcode fa-lg color-blue" />,
      }}
      modalBodyProps={{
        children: <PrintableMaCoTai idTai={idTai} />,
      }}
      modalHeaderProps={{
        children: t('In mã cổ tải'),
      }}
    />
  );

  const columns = useMemo(
    () => [
      {
        Header: t('Mã tải'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đi'),
        accessor: 'LOG_LOCID_FR',
      },
      {
        Header: t('Điểm đến'),
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
      {
        Header: t('Loại'),
        accessor: 'TOR_TYPE',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return <>{useSipDataType(get(row, 'original.TOR_TYPE'))}</>;
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              {inMaCoTaiButton(get(row, 'values.TOR_ID', ''))}
              {renderPrintButton(get(row, 'values.TOR_ID', ''))}
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.THONG_TIN_TAI, { idTaiKien: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listTaiDaNhan],
  );

  return (
    <>
      <div className="shadow-sm mb-3 bg-white" />
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={listTaiDaNhan || []} onRowClick={handleRedirectDetail} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onThisPaginationChange={onPaginationChange}
        />
      </Row>
    </>
  );
};

export default TaiDaNhan;
