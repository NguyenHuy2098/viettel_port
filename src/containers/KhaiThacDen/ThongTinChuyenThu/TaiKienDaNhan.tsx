import React, { useCallback, useMemo, useState } from 'react';
import { Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, filter, get, includes, trim } from 'lodash';
import moment from 'moment';

import ButtonPrintable from 'components/Button/ButtonPrintable';
import DataTable from 'components/DataTable';
import Filter from 'components/Input/Filter';
import Pagination from 'components/Pagination';
import PrintablePhieuGiaoTuiThu from 'components/Printable/PrintablePhieuGiaoTuiThu';
import { useSipDataType } from 'hooks/useTranslations';
import { makeSelector046ChildrenTaiKienDaNhan } from 'redux/MIOA_ZTMI046/selectors';
import routesMap from 'utils/routesMap';
import PrintableMaCoTai from 'components/Printable/PrintableMaCoTai';
import { SipDataType } from '../../../utils/enums';

type Props = RouteComponentProps;

// eslint-disable-next-line max-lines-per-function
const TaiKienDaNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const listTaiKienDaNhan = useSelector(makeSelector046ChildrenTaiKienDaNhan);
  const [searchText, setSearchText] = useState<string>('');

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
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã tải/kiện'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `${
            get(row, 'original.TOR_TYPE') === SipDataType.TAI
              ? get(row, 'original.TOR_ID')
              : get(row, 'original.PACKAGE_ID')
          }`;
        },
      },
      {
        Header: t('Điểm đi'),
        accessor: 'SRC_LOC_IDTRQ',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('Số lượng'),
        accessor: 'child_count',
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
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
      {
        Header: t('Loại'),
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
    [listTaiKienDaNhan],
  );

  const handleChangeSearchText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(trim(event.target.value));
  };

  const redirectToThongTinTai = useCallback(
    (item: API.Child) => {
      dispatch(push(generatePath(routesMap.THONG_TIN_TAI, { idTaiKien: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const filteredListTaiKienDaNhan = useMemo(
    () => filter(listTaiKienDaNhan, (child: API.Child) => includes(JSON.stringify(child), searchText)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listTaiKienDaNhan, searchText],
  );

  function renderToolbar(): JSX.Element {
    return (
      <Row>
        <div className="btn-toolbar col-10">
          <Filter
            onChange={handleChangeSearchText}
            placeholder={t('Tìm kiếm tải/kiện')}
            searchResult={filteredListTaiKienDaNhan}
          />
          {/*<button className="btn btn-outline-primary mr-2">*/}
          {/*  {t('Tải')}&nbsp;({'05'})*/}
          {/*</button>*/}
          {/*<button className="btn btn-outline-secondary">*/}
          {/*  {t('Kiện')}&nbsp;({'20'})*/}
          {/*</button>*/}
        </div>
      </Row>
    );
  }

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={filteredListTaiKienDaNhan} onRowClick={redirectToThongTinTai} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={1}
          // onThisPaginationChange={handlePageChange}
        />
      </Row>
    </>
  );
};

export default withRouter(TaiKienDaNhan);
