import React, { ChangeEvent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { map, noop, get } from 'lodash';
import { Button, Col, Input, Row } from 'reactstrap';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorBangKeChuaDongTai, makeSelectorCountBangKeChuaDongTai } from 'redux/MIOA_ZTMI047/selectors';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const BuuGuiChuaDongTai: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const listBangKeChuaDongTai = useSelector(makeSelectorBangKeChuaDongTai);
  const countBangKeChuaDongTai = useSelector(makeSelectorCountBangKeChuaDongTai);

  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    const payload = {
      IV_TOR_ID: event.target.value,
      IV_TOR_TYPE: 'ZC1',
      IV_FR_LOC_ID: 'BDH',
      IV_CUST_STATUS: '101',
    };
    dispatch(action_MIOA_ZTMI047(payload));
  }

  function printBangKe(bangKe: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (): void => {
      noop('print', bangKe.TOR_ID);
    };
  }

  function editBangKe(bangKe: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (): void => {
      noop('edit', bangKe.TOR_ID);
    };
  }

  function deleteBangKe(bangKe: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (): void => {
      const payload = {
        IV_FLAG: '3',
        IV_TOR_TYPE: 'ZC1',
        IV_TOR_ID_CU: bangKe.TOR_ID,
        IV_SLOCATION: '',
        IV_DLOCATION: '',
        IV_DESCRIPTION: '',
        T_ITEM: [
          {
            ITEM_ID: '',
            ITEM_TYPE: '',
          },
        ],
      };
      if (!window.confirm('Bạn có chắc chắn?')) return;
      dispatch(
        action_MIOA_ZTMI016(payload, {
          onSuccess: (): void => {
            const payload = {
              IV_TOR_ID: '',
              IV_TOR_TYPE: 'ZC1',
              IV_FR_LOC_ID: 'BDH',
              IV_CUST_STATUS: '101',
            };
            dispatch(action_MIOA_ZTMI047(payload));
          },
        }),
      );
    };
  }

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
              <Button className="SipTableFunctionIcon" onClick={editBangKe(row.original)}>
                <i className="fa fa-pencil fa-lg color-blue" />
              </Button>
              <Button className="SipTableFunctionIcon" onClick={deleteBangKe(row.original)}>
                <i className="fa fa-trash-o fa-lg color-red" />
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
            {t('Tổng số')}: <span>{countBangKeChuaDongTai}</span>
          </p>
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} />
      </Row>
    </>
  );
};

export default BuuGuiChuaDongTai;
