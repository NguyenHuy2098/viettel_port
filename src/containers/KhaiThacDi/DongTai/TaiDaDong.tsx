import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Row } from 'reactstrap';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { get, isEmpty, map } from 'lodash';
import moment from 'moment';

import { toastError } from 'components/Toast';
import PrintablePhieuGiaoTuiThu from 'components/Printable/PrintablePhieuGiaoTuiThu';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import PrintableMaCoTai from 'components/Printable/PrintableMaCoTai';
import { makeSelectorBPOrg } from 'redux/GetProfileByUsername/selectors';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow, makeSelectorTotalItem, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import routesMap from 'utils/routesMap';
import { getPageItems } from 'utils/common';

// eslint-disable-next-line max-lines-per-function
const TaiDaDong: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userMaBp = useSelector(makeSelectorBPOrg);
  const listTaiDaDong = useSelector(makeSelectorRow(SipDataType.TAI, SipDataState.GAN_TAI_KIEN_VAO_CHUYEN_THU));
  const countTaiDaDong = useSelector(makeSelectorTotalItem(SipDataType.TAI, SipDataState.GAN_TAI_KIEN_VAO_CHUYEN_THU));
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.TAI, SipDataState.GAN_TAI_KIEN_VAO_CHUYEN_THU));

  const [torIdSearch, setTorIdSearch] = useState<string>('');

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  }

  const toastErrorOnSearch = (error: Error, torId: string): void => {
    if (!isEmpty(torId)) {
      toastError(error.message);
    }
  };

  const pageItems = getPageItems();

  const getListTai = useCallback(
    function(payload = {}): void {
      dispatch(
        action_MIOA_ZTMI047(
          {
            IV_TOR_TYPE: SipDataType.TAI,
            IV_CUST_STATUS: SipDataState.GAN_TAI_KIEN_VAO_CHUYEN_THU,
            IV_NO_PER_PAGE: pageItems,
            ...payload,
          },
          {
            onFailure: (error: Error) => {
              toastErrorOnSearch(error, payload.IV_TOR_ID);
            },
          },
          {
            flow: SipFlowType.KHAI_THAC_DI,
          },
        ),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, userMaBp, pageItems],
  );

  useEffect((): void => getListTai(), [getListTai]);

  function handleSearchTai(): void {
    getListTai({ IV_TOR_ID: torIdSearch });
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
  const renderPrintButton = (idChuyenThu: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        title: t('In'),
        className: 'SipTableFunctionIcon',
        children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
      }}
      modalBodyProps={{
        children: <PrintablePhieuGiaoTuiThu idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In danh s??ch b???ng k?? thu???c t???i'),
      }}
    />
  );
  const inMaCoTaiButton = (idTai: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        title: t('In m??'),
        className: 'SipTableFunctionIcon',
        children: <i className="fa fa-barcode fa-lg color-blue" />,
      }}
      modalBodyProps={{
        children: <PrintableMaCoTai idTai={idTai} />,
      }}
      modalHeaderProps={{
        children: t('In m?? c??? t???i'),
      }}
    />
  );

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('M?? t???i'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('??i???m ?????n'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('S??? l?????ng'),
        accessor: 'countChuyenThu',
      },
      {
        Header: t('Ng?????i nh???p'),
        accessor: 'PERSONAL',
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
  const data = map(listTaiDaDong, (item: API.RowMTZTMI047OUT) => {
    const thisDescription = get(item, 'Childs[0].DESCRIPTION', '');
    return {
      TOR_ID: item.TOR_ID ? item.TOR_ID : '',
      LOG_LOCID_TO: item.LOG_LOCID_TO ? item.LOG_LOCID_TO : '',
      countChuyenThu: item.ITEM_NO ? item.ITEM_NO : '',
      PERSONAL: item.CREATED_BY ? item.CREATED_BY : '',
      CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format('DD/MM/YYYY'),
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
                placeholder={t('T??m ki???m t???i')}
                onChange={handleChangeTextboxValue(setTorIdSearch)}
              />
            </div>
            <Button color="primary" className="ml-2" onClick={handleSearchTai}>
              {t('T??m ki???m')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('T???ng s???')}: <span>{countTaiDaDong}</span>
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

export default TaiDaDong;
