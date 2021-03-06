import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import moment from 'moment';
import { get, isEmpty, map } from 'lodash';
import { default as NumberFormat } from 'react-number-format';

import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import PrintBangKeChiTiet from 'components/Printable/PrintBangKeChiTiet';
import { toastError } from 'components/Toast';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow, makeSelectorTotalItem, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import routesMap from 'utils/routesMap';
import { getPageItems } from 'utils/common';

// eslint-disable-next-line max-lines-per-function
const BangKeDaDong: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const listBangKeDaDong = useSelector(makeSelectorRow(SipDataType.BANG_KE, SipDataState.DA_DONG));
  const countBangKeDaDong = useSelector(makeSelectorTotalItem(SipDataType.BANG_KE, SipDataState.DA_DONG));
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.BANG_KE, SipDataState.DA_DONG));
  const pageItems = getPageItems();
  const [torIdSearch, setTorIdSearch] = useState<string>('');

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  }

  const getListBangKe = useCallback(
    function(payload = {}): void {
      dispatch(
        action_MIOA_ZTMI047(
          {
            IV_TOR_TYPE: SipDataType.BANG_KE,
            IV_CUST_STATUS: SipDataState.GAN_BANG_KE_VAO_TAI,
            IV_NO_PER_PAGE: pageItems,
            ...payload,
          },
          {
            onFailure: (error: Error) => {
              toastErrorOnSearch(error, payload.IV_TOR_ID);
            },
          },
          { flow: SipFlowType.KHAI_THAC_DI },
        ),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageItems],
  );

  useEffect((): void => {
    getListBangKe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toastErrorOnSearch = (error: Error, torId: string): void => {
    if (!isEmpty(torId)) {
      toastError(error.message);
    }
  };

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
        title: t('In'),
        className: 'SipTableFunctionIcon',
        children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
      }}
      modalBodyProps={{
        children: <PrintBangKeChiTiet idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In danh s??ch b??u g???i c???a b???ng k??'),
      }}
    />
  );
  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('M?? b???ng k??'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('??i???m ?????n'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('S??? l?????ng'),
        accessor: 'countChuyenThu',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <NumberFormat
              value={get(row, 'original.countChuyenThu', '')}
              displayType={'text'}
              thousandSeparator="."
              decimalSeparator=","
            />
          );
        },
      },
      {
        Header: t('Ng?????i nh???p'),
        accessor: 'CREATED_BY',
      },
      {
        Header: t('Ng??y nh???p'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Ghi ch??'),
        accessor: 'NOTE_OF',
      },
      {
        Header: t('Qu???n tr???'),
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
      CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format('DD/MM/YYYY'),
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
                placeholder={t('T??m ki???m b???ng k??')}
                onChange={handleChangeTextboxValue(setTorIdSearch)}
              />
            </div>
            <Button color="primary" className="ml-2" onClick={handleSearchBangKe}>
              {t('T??m ki???m')}
            </Button>
            {/*_______________temporary hide because of no requirement______________*/}
            <Button color="gray" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow hide">
              <img src={'../../assets/img/icon/iconRemove2.svg'} alt="VTPostek" />
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('T???ng s???')}:{' '}
            <span>
              <NumberFormat value={countBangKeDaDong} displayType={'text'} thousandSeparator="." decimalSeparator="," />
            </span>
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
