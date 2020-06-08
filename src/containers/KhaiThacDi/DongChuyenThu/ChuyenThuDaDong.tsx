import React, { useCallback, useEffect, useMemo } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { get } from 'lodash';
import moment from 'moment';

import ButtonPrintable from 'components/Button/ButtonPrintable';
import DataTable from 'components/DataTable';
import Search from 'components/Input/Search';
import Pagination from 'components/Pagination';
import PrintablePhieuGiaoNhanChuyenThu from 'components/Printable/PrintablePhieuGiaoNhanChuyenThu';
import { makeSelectorRow, makeSelectorTotalItem, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import routesMap from 'utils/routesMap';
import { getPageItems } from 'utils/common';

interface Props {
  getListChuyenThuDaDong: (IV_PAGENO?: number, IV_TOR_ID?: string) => void;
}

// eslint-disable-next-line max-lines-per-function
const ChuyenThuDaDong: React.FC<Props> = (props: Props): JSX.Element => {
  const { getListChuyenThuDaDong } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listChuyenThuDaDong = useSelector(makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.HOAN_THANH_CHUYEN_THU));
  const countChuyenThuDaDong = useSelector(
    makeSelectorTotalItem(SipDataType.CHUYEN_THU, SipDataState.HOAN_THANH_CHUYEN_THU),
  );
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.CHUYEN_THU, SipDataState.HOAN_THANH_CHUYEN_THU));

  const pageItems = getPageItems();

  useEffect((): void => {
    getListChuyenThuDaDong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageItems]);

  const handleSearchChuyenThu = (searchText: string): void => {
    getListChuyenThuDaDong(1, searchText);
  };

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU_DA_DONG, { idChuyenThu: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listChuyenThuDaDong],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    getListChuyenThuDaDong(selectedItem.selected + 1);
  };

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã chuyến thư'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'LOG_LOCID_TO',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return get(row, 'original.LOG_LOCID_TO', '');
        },
      },
      {
        Header: t('Số lượng'),
        accessor: 'ITEM_NO',
      },
      {
        Header: t('Người nhập'),
        accessor: 'CREATED_BY',
      },
      {
        Header: t('Ngày nhập'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
      {
        Header: t('Ghi chú'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return get(row, 'original.Childs[0].DESCRIPTION', '') || '';
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <ButtonPrintable
              btnProps={{
                title: t('In'),
                className: 'SipTableFunctionIcon',
                children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
              }}
              modalBodyProps={{
                children: <PrintablePhieuGiaoNhanChuyenThu idChuyenThu={get(row, 'original.TOR_ID')} />,
              }}
              modalHeaderProps={{
                children: t('In thông tin chuyến thư'),
              }}
            />
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listChuyenThuDaDong],
  );

  const renderToolbar = (): JSX.Element => (
    <Row>
      <Col lg={6} xl={5}>
        <Search onSubmitSearch={handleSearchChuyenThu} placeholder={t('Tìm kiếm chuyến thư')} />
      </Col>
      <Col lg={1}>
        {/*_______________temporary hide because of no requirement______________*/}
        <Button color="white" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow hide">
          <img src={'../../assets/img/icon/iconRemove2.svg'} alt="VTPostek" />
        </Button>
      </Col>
      <Col>
        <p className="text-right mt-2 mb-0">
          {t('Tổng số')}: <span>{countChuyenThuDaDong}</span>
        </p>
      </Col>
    </Row>
  );

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={listChuyenThuDaDong} onRowClick={handleRedirectDetail} />
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

export default ChuyenThuDaDong;
