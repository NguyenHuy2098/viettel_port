import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Col, Input, Row } from 'reactstrap';
import { push } from 'connected-react-router';
import { map, get } from 'lodash';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorBangKeChuaDongTai, makeSelectorCountBangKeChuaDongTai } from 'redux/MIOA_ZTMI047/selectors';
import ModalPopupConfirm from 'components/ModalConfirm/ModalPopupConfirm';
import routesMap from 'utils/routesMap';
import { Cell } from 'react-table';
import moment from 'moment';
import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const BangKeDaDong: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const countBangKeChuaDongTai = useSelector(makeSelectorCountBangKeChuaDongTai);
  const listBangKeChuaDongTai = useSelector(makeSelectorBangKeChuaDongTai);

  const getListBangKe = useCallback(
    function(payload = {}): void {
      dispatch(
        action_MIOA_ZTMI047({
          IV_TOR_ID: '',
          IV_TOR_TYPE: 'ZC1',
          IV_FR_LOC_ID: 'BDH',
          IV_CUST_STATUS: '101',
          IV_TO_LOC_ID: '',
          ...payload,
        }),
      );
    },
    [dispatch],
  );

  useEffect((): void => getListBangKe(), [getListBangKe]);

  function handleSearchBangKe(e: React.ChangeEvent<HTMLInputElement>): void {
    const payload = {
      IV_TOR_ID: e.target.value,
    };
    getListBangKe(payload);
  }

  const handleDeleteManifest = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      const payload = {
        IV_FLAG: '3',
        IV_TOR_TYPE: 'ZC1',
        IV_TOR_ID_CU: item.TOR_ID,
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
      dispatch(
        action_MIOA_ZTMI016(payload, {
          onFinish: (): void => getListBangKe(),
        }),
      );
    };
  };

  const handleRedirectDetail = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      dispatch(push(`${routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE_DA_DONG}/${item.TOR_ID}`));
    };
  };

  const columns = useMemo(
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
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-print fa-lg color-green" />
              </Button>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-pencil fa-lg color-blue" />
              </Button>
              <ModalPopupConfirm handleDoSomething={handleDeleteManifest} />
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const data = map(get(listBangKeChuaDongTai, 'Row[0].CHILDS'), (item: API.RowMTZTMI047OUT) => {
    return {
      TOR_ID: item.TOR_ID,
      LOG_LOCID_TO: item.LOG_LOCID_TO,
      PERSONAL: item.ITEM_NO,
      countChuyenThu: 222,
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
              <Input type="text" placeholder={t('Tìm kiếm bảng kê')} onChange={handleSearchBangKe} />
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
        <DataTable columns={columns} data={data} onRowClick={handleRedirectDetail} />
      </Row>
    </>
  );
};

export default BangKeDaDong;
