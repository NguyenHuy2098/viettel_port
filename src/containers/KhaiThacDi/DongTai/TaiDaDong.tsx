import React, { ChangeEvent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { map, noop, get } from 'lodash';
import { push } from 'connected-react-router';
import routesMap from 'utils/routesMap';
import { Button, Col, Input, Row } from 'reactstrap';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorTaiDaDong, makeSelectorCountTaiDaDong } from 'redux/MIOA_ZTMI047/selectors';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const TaiDaDong: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const listBangKeChuaDongTai = useSelector(makeSelectorTaiDaDong);
  const countTaiDaDong = useSelector(makeSelectorCountTaiDaDong);

  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    const payload = {
      IV_TOR_ID: event.target.value,
      IV_TOR_TYPE: 'ZC2',
      IV_FR_LOC_ID: 'BDH',
      IV_CUST_STATUS: '103',
    };
    dispatch(action_MIOA_ZTMI047(payload));
  }

  function printBangKe(bangKe: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (): void => {
      noop('print', bangKe.TOR_ID);
    };
  }

  const handleRedirectDetail = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      dispatch(push(`${routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI_DA_DONG}/${item.TOR_ID}`));
    };
  };
  const columns = useMemo(
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
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon" onClick={printBangKe(row.original)}>
                <i className="fa fa-print fa-lg color-green" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const data = map(get(listBangKeChuaDongTai, ''), (item: API.RowMTZTMI047OUT) => {
    return {
      TOR_ID: item.TOR_ID,
      LOG_LOCID_TO: item.LOG_LOCID_TO,
      countChuyenThu: 222,
      PERSONAL: item.ITEM_NO,
      CREATED_ON: moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY '),
      NOTE_OF: item.EXEC_CONT,
    };
  });
  return (
    <>
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('Tìm kiếm tải')} onChange={handleSearch} />
            </div>
            <Button color="primary" className="ml-2">
              {t('Tìm kiếm')}
            </Button>
            <Button color="white" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow">
              <i className="fa fa-trash-o" />
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
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} onRowClick={handleRedirectDetail} />
      </Row>
    </>
  );
};

export default TaiDaDong;
