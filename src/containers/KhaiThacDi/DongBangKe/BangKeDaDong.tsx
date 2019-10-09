import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Col, Input, Row } from 'reactstrap';
import { map, get } from 'lodash';
import { push } from 'connected-react-router';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow, makeSelectorTotalPage, makeSelectorTotalItem } from 'redux/MIOA_ZTMI047/selectors';
import routesMap from 'utils/routesMap';
import { Cell } from 'react-table';
import moment from 'moment';
import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import { generatePath } from 'react-router-dom';
import { SipDataState, SipDataType } from 'utils/enums';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import PrintBangKeChiTiet from 'components/Printable/PrintBangKeChiTiet';

// eslint-disable-next-line max-lines-per-function
const BangKeDaDong: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userMaBp = useSelector(makeSelectorMaBP);

  const listBangKeDaDong = useSelector(makeSelectorRow(SipDataType.BANG_KE, SipDataState.DA_DONG));
  const countBangKeDaDong = useSelector(makeSelectorTotalItem(SipDataType.BANG_KE, SipDataState.DA_DONG));
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.BANG_KE, SipDataState.DA_DONG));

  const [torIdSearch, setTorIdSearch] = useState<string>('');

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  }

  const getListBangKe = useCallback(
    function(payload = {}): void {
      dispatch(
        action_MIOA_ZTMI047({
          IV_TOR_ID: '',
          IV_TOR_TYPE: 'ZC1',
          IV_FR_LOC_ID: userMaBp,
          IV_CUST_STATUS: '102',
          IV_FR_DATE: moment().format('YYYYMMDD'),
          IV_TO_DATE: moment().format('YYYYMMDD'),
          IV_PAGENO: '1',
          IV_NO_PER_PAGE: '10',
          ...payload,
        }),
      );
    },
    [dispatch, userMaBp],
  );

  useEffect((): void => getListBangKe(), [getListBangKe, userMaBp]);

  function handleSearchBangKe(): void {
    const payload = {
      IV_TOR_ID: torIdSearch,
    };
    getListBangKe(payload);
  }

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE_DA_DONG, { idBangKe: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listBangKeDaDong],
  );

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    const payload = {
      IV_TOR_ID: torIdSearch,
      IV_PAGENO: selectedItem.selected + 1,
    };
    getListBangKe(payload);
  };

  const renderPrintButton = (idChuyenThu: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
      }}
      modalBodyProps={{
        children: <PrintBangKeChiTiet idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In danh sách bưu gửi của bảng kê'),
      }}
    />
  );
  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã bảng kê'),
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
        accessor: 'CREATED_BY',
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
          return renderPrintButton(get(row, 'values.TOR_ID', ''));
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const data = map(listBangKeDaDong, (item: API.RowMTZTMI047OUT) => {
    const thisDescription = get(item, 'Childs[0].DESCRIPTION', '');
    return {
      TOR_ID: item.TOR_ID ? item.TOR_ID : '',
      LOG_LOCID_TO: item.LOG_LOCID_TO ? item.LOG_LOCID_TO : '',
      countChuyenThu: item.ITEM_NO ? item.ITEM_NO : '',
      CREATED_BY: item.CREATED_BY ? item.CREATED_BY : '',
      CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY '),
      NOTE_OF: thisDescription ? thisDescription : '',
    };
  });

  return (
    <>
      <Row className="sipContentContainer">
        <Col xl={6} lg={8} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input
                value={torIdSearch}
                type="text"
                placeholder={t('Tìm kiếm bảng kê')}
                onChange={handleChangeTextboxValue(setTorIdSearch)}
              />
            </div>
            <Button color="primary" className="ml-2" onClick={handleSearchBangKe}>
              {t('Tìm kiếm')}
            </Button>
            {/*_______________temporary hide because of no requirement______________*/}
            <Button color="gray" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow hide">
              <img src={'../../assets/img/icon/iconRemove2.svg'} alt="VTPostek" />
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>{countBangKeDaDong}</span>
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
          onThisPaginationChange={onPaginationChange}
        />
      </Row>
    </>
  );
};

export default BangKeDaDong;
