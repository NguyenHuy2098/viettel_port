import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { push } from 'connected-react-router';
// import { map, get } from 'lodash';
import { Button, Col, Input, Row } from 'reactstrap';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorKienChuaDongChuyenThu } from 'redux/MIOA_ZTMI047/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import routesMap from 'utils/routesMap';
import ModalPopupConfirm from 'components/ModalConfirm/ModalPopupConfirm';
// import moment from 'moment';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const KienChuaDongChuyenThu: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getListChuyenThu = useCallback(
    function(payload = {}): void {
      // dispatch(
      //   action_MIOA_ZTMI047({
      //     IV_TOR_ID: '',
      //     IV_TOR_TYPE: 'ZBIG',
      //     IV_FR_LOC_ID: 'BHD',
      //     IV_TO_LOC_ID: '',
      //     IV_CUST_STATUS: '101',
      //     IV_FR_DATE: '20190727',
      //     IV_TO_DATE: '20190828',
      //     IV_PAGENO: '1',
      //     IV_NO_PER_PAGE: '20',
      //   }),
      // );
    },
    [dispatch],
  );

  useEffect((): void => getListChuyenThu(), [getListChuyenThu]);
  // eslint-disable-next-line no-undef
  const listKienChuaDongChuyenThu = useSelector(makeSelectorKienChuaDongChuyenThu);

  function handleSearchChuyenThu(e: React.ChangeEvent<HTMLInputElement>): void {
    const payload = {
      IV_TOR_ID: e.target.value,
    };
    getListChuyenThu(payload);
  }

  const handleRedirectDetail = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      dispatch(push(`${routesMap.DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU}/${item.TOR_ID}`));
    };
  };
  const handleDeleteChuyenThu = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      const payload = {
        IV_TOR_ID: '',
        IV_TOR_TYPE: 'ZBIG',
        IV_FR_LOC_ID: 'BHD',
        IV_TO_LOC_ID: '',
        IV_CUST_STATUS: '101',
        IV_FR_DATE: '20190727',
        IV_TO_DATE: '20190828',
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '20',
      };
      dispatch(
        action_MIOA_ZTMI016(payload, {
          onFinish: (): void => {
            const payload = {
              IV_TOR_ID: '',
              IV_TOR_TYPE: 'ZBIG',
              IV_FR_LOC_ID: 'BHD',
              IV_TO_LOC_ID: '',
              IV_CUST_STATUS: '101',
              IV_FR_DATE: '20190727',
              IV_TO_DATE: '20190828',
              IV_PAGENO: '1',
              IV_NO_PER_PAGE: '20',
            };
            dispatch(action_MIOA_ZTMI047(payload));
          },
        }),
      );
    };
  };

  const columns = useMemo(
    () => [
      {
        Header: t('Mã phiếu gửi'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('Số lượng'),
        accessor: 'chua có',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'ITEM_NO',
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'DATETIME_CHLC',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon" onClick={handleRedirectDetail(row.original)}>
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
            {t('Tổng số')}: <span>01</span>
          </p>
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={listKienChuaDongChuyenThu} />
      </Row>
    </>
  );
};

export default KienChuaDongChuyenThu;
