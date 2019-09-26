import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { map, get, noop, toString, trim } from 'lodash';
import { Button, Col, Input, Row } from 'reactstrap';
import { push } from 'connected-react-router';

import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow, makeSelectorTotalPage, makeSelectorTotalItem } from 'redux/MIOA_ZTMI047/selectors';
import routesMap from 'utils/routesMap';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import { generatePath } from 'react-router-dom';
import { SipDataState, SipDataType } from 'utils/enums';
import { makeSelectorMaBP } from 'redux/auth/selectors';

// eslint-disable-next-line max-lines-per-function
const TaiDaDong: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userMaBp = useSelector(makeSelectorMaBP);

  const listTaiDaDong = useSelector(makeSelectorRow(SipDataType.TAI, SipDataState.GAN_TAI_KIEN_VAO_CHUYEN_THU));
  const countTaiDaDong = useSelector(makeSelectorTotalItem(SipDataType.TAI, SipDataState.GAN_TAI_KIEN_VAO_CHUYEN_THU));
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.TAI, SipDataState.GAN_TAI_KIEN_VAO_CHUYEN_THU));

  const [torIdSearch, setTorIdSearch] = useState<string>('');

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  }

  const getListTai = useCallback(
    function(payload = {}): void {
      dispatch(
        action_MIOA_ZTMI047({
          IV_TOR_ID: '',
          IV_TOR_TYPE: 'ZC2',
          IV_FR_LOC_ID: userMaBp,
          IV_CUST_STATUS: '103',
          IV_FR_DATE: trim(toString(moment().format(' YYYYMMDD'))),
          IV_TO_DATE: trim(toString(moment().format(' YYYYMMDD'))),
          IV_PAGENO: '1',
          IV_NO_PER_PAGE: '10',
          ...payload,
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, userMaBp],
  );

  useEffect((): void => getListTai(), [getListTai]);

  function handleSearchTai(): void {
    const payload = {
      IV_TOR_ID: torIdSearch,
    };
    getListTai(payload);
  }

  function printTai(tai: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (event: React.MouseEvent): void => {
      event.stopPropagation();
      noop('print', tai.TOR_ID);
    };
  }

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI_DA_DONG, { idTai: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listTaiDaDong],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    const payload = {
      IV_TOR_ID: torIdSearch,
      IV_PAGENO: selectedItem.selected + 1,
    };
    getListTai(payload);
  };

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã tải'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('Số lượng'),
        accessor: 'countChuyenThu',
      },
      {
        Header: t('Người nhập'),
        accessor: 'PERSONAL',
      },
      {
        Header: t('Ngày nhập'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Ghi chú'),
        accessor: 'NOTE_OF',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <Button className="SipTableFunctionIcon" onClick={printTai(row.original)}>
              <i className="fa fa-print fa-lg color-green" />
            </Button>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const data = map(listTaiDaDong, (item: API.RowMTZTMI047OUT) => {
    const thisDescription = get(item, 'Childs[0].DESCRIPTION', '');
    return {
      TOR_ID: item.TOR_ID ? item.TOR_ID : '',
      LOG_LOCID_TO: item.LOG_LOCID_TO ? item.LOG_LOCID_TO : '',
      countChuyenThu: item.ITEM_NO ? item.ITEM_NO : '',
      PERSONAL: item.CREATED_BY ? item.CREATED_BY : '',
      CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY '),
      NOTE_OF: thisDescription ? thisDescription : '',
    };
  });
  return (
    <>
      <Row className="sipContentContainer">
        <Col xl={6} lg={9} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input
                value={torIdSearch}
                type="text"
                placeholder={t('Tìm kiếm tải')}
                onChange={handleChangeTextboxValue(setTorIdSearch)}
              />
            </div>
            <Button color="primary" className="ml-2" onClick={handleSearchTai}>
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>{countTaiDaDong}</span>
          </p>
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={data} onRowClick={handleRedirectDetail} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onPageChange={onPaginationChange}
        />
      </Row>
    </>
  );
};

export default TaiDaDong;
