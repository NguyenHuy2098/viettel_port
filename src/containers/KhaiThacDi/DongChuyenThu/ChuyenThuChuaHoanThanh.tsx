import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { push } from 'connected-react-router';
import { map, get } from 'lodash';
import { Button, Col, Input, Row } from 'reactstrap';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import {
  makeSelectorChuyenThuChuaHoanThanh,
  makeSelectorCountChuyenThuChuaHoanThanh,
} from 'redux/MIOA_ZTMI047/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import routesMap from 'utils/routesMap';
import ModalPopupConfirm from 'components/ModalConfirm/ModalPopupConfirm';
import moment from 'moment';
import { Cell } from 'react-table';
import DataTable from '../../../components/DataTable';

// eslint-disable-next-line max-lines-per-function
const ChuyenThuChuaHoanThanh: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getListChuyenThu = useCallback(
    function(payload = {}): void {
      dispatch(
        action_MIOA_ZTMI047({
          IV_TOR_ID: '',
          IV_TOR_TYPE: 'ZC3',
          IV_FR_LOC_ID: 'BHD',
          IV_CUST_STATUS: '101',
          IV_TO_LOC_ID: '',
          LanguageId: '',
          LanguageDefaultId: '',
          ...payload,
        }),
      );
    },
    [dispatch],
  );

  useEffect((): void => {
    getListChuyenThu();
  }, [getListChuyenThu]);

  const countChuyenThuChuaHoanThanh = useSelector(makeSelectorCountChuyenThuChuaHoanThanh);
  const listChuyenThuChuaHoanThanh = useSelector(makeSelectorChuyenThuChuaHoanThanh);

  function handleSearchChuyenThu(e: React.ChangeEvent<HTMLInputElement>): void {
    const payload = {
      IV_TOR_ID: e.target.value,
    };
    getListChuyenThu(payload);
  }

  const handleDeleteChuyenThu = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: '3',
            IV_TOR_TYPE: 'ZC3',
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
          },
          {
            onFinish: (): void => {
              dispatch(
                action_MIOA_ZTMI047({
                  IV_TOR_ID: '',
                  IV_TOR_TYPE: 'ZC3',
                  IV_FR_LOC_ID: 'BHD',
                  IV_TO_LOC_ID: '',
                  IV_CUST_STATUS: '101',
                }),
              );
            },
          },
        ),
      );
    };
  };

  const handleRedirectDetail = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      dispatch(push(`${routesMap.DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU}/${item.TOR_ID}`));
    };
  };
  const columns = useMemo(
    () => [
      {
        Header: t('Mã chuyễn th'),
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
              <ModalPopupConfirm handleDoSomething={handleDeleteChuyenThu} />
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const data = map(get(listChuyenThuChuaHoanThanh, ''), (item: API.RowMTZTMI047OUT) => {
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
              <Input type="text" placeholder={t('Tìm kiếm chuyến thư')} onChange={handleSearchChuyenThu} />
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
            {t('Tổng số')}: <span>{countChuyenThuChuaHoanThanh}</span>
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

export default ChuyenThuChuaHoanThanh;
