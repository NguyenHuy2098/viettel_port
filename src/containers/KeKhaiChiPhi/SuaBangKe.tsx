import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Row } from 'reactstrap';
import { Cell, Row as TableRow } from 'react-table';
import { get, sumBy, toNumber } from 'lodash';
import { match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import produce from 'immer';
import moment from 'moment';

import ButtonGoBack from 'components/Button/ButtonGoBack';
import DataTable from 'components/DataTable/Grouped';
import useLoggedInUser from 'hooks/useLoggedInUser';
import ThemMoiKhoanMuc from 'containers/KeKhaiChiPhi/ThemMoiKhoanMuc';
import { action_ZFI007 } from 'redux/ZFI007/actions';
import { select_ZFI007, select_MT_DETAIL_RECEIVER_ZFI007 } from 'redux/ZFI007/selectors';
import ThemMoiChiPhi from './ThemMoiChiPhi';
import Index from './DanhSachBangKe/index';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const SuaBangKe = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [data, setData] = React.useState<API.LISTMTDETAILRECEIVER[]>([]);

  const userLogin = useLoggedInUser();

  const idBangKe = get(props, 'match.params.idBangKe', '');

  React.useEffect(() => {
    const payloads = {
      MA_BUU_CUC: 'BDH',
      BK_ID: idBangKe,
      IV_PAGENO: '1',
      IV_NO_PER_PAGE: '10',
    };
    dispatch(action_ZFI007(payloads));
  }, [dispatch, idBangKe]);

  const list = useSelector(select_ZFI007);
  React.useEffect((): void => {
    setData(list);
  }, [list]);

  function formatStatusItem(status: number): string {
    let statusItem = '';
    if (status === 0) statusItem = 'Tạo mới';
    if (status === 1) statusItem = 'Chờ phê duyệt';
    if (status === 2) statusItem = 'Phê duyệt';
    if (status === 3) statusItem = 'Duyệt 1 phần';
    return statusItem;
  }

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mẫu hợp đồng'),
        accessor: 'MAU_HD',
      },
      {
        Header: t('Ký hiệu'),
        accessor: 'KIHIEU_HD',
      },
      {
        Header: t('Số'),
        accessor: 'SO_HD',
      },
      {
        Header: t('Ngày'),
        accessor: 'NGAY_HD',
      },
      {
        Header: t('Trạng thái'),
        accessor: 'STATUS_ITEM',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          const status = get(row, 'original.STATUS_ITEM', '');
          return formatStatusItem(status);
        },
      },
      {
        Header: t('Người bán'),
        accessor: 'NGUOI_BAN',
      },
      {
        Header: t('MST'),
        accessor: 'MST',
      },
      {
        Header: t('Hàng hoá'),
        accessor: 'DESCR',
      },
      {
        Header: t('Giá chưa thuế'),
        accessor: 'AMOUNT',
      },
      {
        Header: t('Phụ phí'),
        accessor: 'PHU_PHI',
      },
      {
        Header: t('TS'),
        accessor: 'TAX',
      },
      {
        Header: t('Thuế GTGT'),
        accessor: 'TAX_AMOUNT',
      },
      {
        Header: t('Tổng'),
        accessor: 'SUM_AMOUNT',
      },
      {
        Header: t('Link URL'),
        accessor: 'URL',
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): string => {
          return get(row, 'original.URL', '');
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.LISTMTDETAILRECEIVER>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const renderFirstControllers = (): JSX.Element => (
    <>
      <Index ids={[idBangKe]} />
      {!status && (
        <>
          <Button color="primary" className="ml-2">
            <i className="fa fa-save mr-2" />
            {t('Lưu')}
          </Button>
          <Button color="primary" className="ml-2">
            <i className="fa fa-send mr-2" />
            {t('Nộp')}
          </Button>
        </>
      )}
    </>
  );

  const detailRecerver = useSelector(select_MT_DETAIL_RECEIVER_ZFI007);
  const status = get(detailRecerver, 'header.BK_STATUS', 4);

  const renderThongTinBangKe = (): JSX.Element => (
    <Row>
      <Col xs={12} md={6} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Mã bảng kê')}:</div>
          <span>{idBangKe}</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Trạng thái')}:</div>
          <span>{t('Sửa bảng kê')}</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Kỳ')}:</div>
          {/*<span>{`${moment(monthYear, 'MM/yyyy').format('MM')}/${moment(monthYear, 'MM/yyyy').format('YYYY')}`}</span>*/}
          <span>{`${10}/${2019}`}</span>
        </div>
      </Col>
      <Col xs={12} md={6} xl={8}>
        <Row>
          <Col xs={12} xl={6}>
            <div className="sipFicoBangKeInformation">
              <div>{t('Người tạo')}:</div>
              <span>{get(userLogin, 'user.profile.preferred_username', '')}</span>
            </div>
            <div className="sipFicoBangKeInformation">
              <div>{t('Đơn vị')}:</div>
              <span>{get(userLogin, 'user.profile.bp_org_unit', '')}</span>
            </div>
          </Col>
          <Col xs={12} xl={6}>
            <div className="sipFicoBangKeInformation">
              <div>{t('Tổng giá trị')}:</div>
              <span>{sumBy(data, (item: API.LISTMTDETAILRECEIVER): number => toNumber(item.SUM_AMOUNT))}</span>
            </div>
            <div className="sipFicoBangKeInformation">
              <div>{t('Ngày tạo')}:</div>
              <span>{moment(get(detailRecerver, 'header.CRE_TIME', ''), 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}</span>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  function handleSubmitKhoanMuc(item: API.LIST): void {
    const nextState = produce(data, draftState => {
      draftState.unshift({ TEN_KM: item.km_text });
    });
    setData(nextState);
  }

  const renderSecondControllers = (): JSX.Element => <ThemMoiKhoanMuc handleSubmit={handleSubmitKhoanMuc} />;

  function handleSubmit(payload: API.LISTMTDETAILRECEIVER): void {
    const nextState = produce(data, draftState => {
      draftState.unshift(payload);
    });
    setData(nextState);
  }

  const renderGroupedRow = (rows: TableRow<API.RowMTZTMI047OUT>[], index: string): JSX.Element => {
    return <ThemMoiChiPhi index={index} handleSubmit={handleSubmit} rows={rows} />;
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          <div className="d-flex sipTitle">
            <ButtonGoBack />
            <h4>{t('Sửa bảng kê')}</h4>
          </div>
        </Col>
        <Col className="d-flex justify-content-end">{renderFirstControllers()}</Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <div className="bg-white p-3 shadow-sm">{renderThongTinBangKe()}</div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <h1 className="sipTitle">{t('Danh sách khoản mục chi phí')}</h1>
        </Col>
        {!status && <Col className="d-flex justify-content-end">{renderSecondControllers()}</Col>}
      </Row>

      <Row>
        <Col>
          <div className="sipTableContainerAmountListContainer">
            <div className="sipTableContainer sipTableContainerAmountList">
              {status ? (
                <DataTable columns={columns} data={data} groupKey={'TEN_KM'} />
              ) : (
                <DataTable columns={columns} data={data} groupKey={'TEN_KM'} renderGroupedRow={renderGroupedRow} />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SuaBangKe;
