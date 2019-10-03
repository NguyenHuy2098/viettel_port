import React, { useCallback, useMemo, useState } from 'react';
import { Row, Input, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, get, isEmpty } from 'lodash';
import moment from 'moment';

// import blackBag from 'assets/img/blackBag.png';
// import deliveryBox from 'assets/img/box.png';
import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import Scan from 'components/Input/Scan';
import { actionQuetNhan } from 'redux/common/actions';
import { makeSelector046ChildrenByLifecycle } from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState } from 'utils/enums';
import routesMap from 'utils/routesMap';
import PrintablePhieuGiaoTuiThu from '../../../components/PrintablePhieuGiaoTuiThu';
import PrintableModal from '../../../components/Button/ButtonPrintable';

// eslint-disable-next-line max-lines-per-function
const TaiKienChuaNhan: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [idTaiKien, setIdTaiKien] = useState<string>('');
  const listTaiKienChuaNhan = useSelector(makeSelector046ChildrenByLifecycle(SipDataState.CHUYEN_THU_DA_QUET_NHAN));

  function handleQuetTaiKienId(): void {
    if (!isEmpty(idTaiKien)) {
      dispatch(actionQuetNhan({ IV_ID: idTaiKien }));
    }
  }

  function handleChangeTaiKienId(event: React.ChangeEvent<HTMLInputElement>): void {
    setIdTaiKien(event.target.value);
  }

  const redirectToThongTinTai = useCallback(
    (item: API.Child) => {
      dispatch(push(generatePath(routesMap.THONG_TIN_TAI, { idTaiKien: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const renderPrintButton = (idChuyenThu: string): JSX.Element => (
    <PrintableModal
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <i className="fa fa-print fa-lg color-green" />,
      }}
      modalBodyProps={{
        children: <PrintablePhieuGiaoTuiThu idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In danh sách bảng kê thuộc tải'),
      }}
    />
  );

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <Label check>
              <Input type="checkbox" />
            </Label>
          );
        },
      },
      {
        Header: t('Mã tải/kiện'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đi'),
        accessor: 'SRC_LOC_IDTRQ',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('Số lượng'),
        accessor: 'child_count',
      },
      {
        Header: t('Trọng lượng'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `${ceil(get(row, 'original.GRO_WEI_VAL'), 2)} ${get(row, 'original.GRO_WEI_UNI')}`;
        },
      },
      {
        Header: t('Ngày tạo'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
      {
        Header: t('Loại'),
        accessor: 'TOR_TYPE',
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

  function renderToolbar(): JSX.Element {
    return (
      <Row>
        <div className="btn-toolbar col-10">
          <Scan
            buttonProps={{
              onClick: handleQuetTaiKienId,
            }}
            onChange={handleChangeTaiKienId}
            placeholder={t('Quét mã tải/kiện')}
          />
          {/*<Button className="sipButtonTypeC mr-2">*/}
          {/*  <img src={blackBag} alt="black-bag" className="mr-2" />*/}
          {/*  {t('Tải')}&nbsp;({'05'})*/}
          {/*</Button>*/}
          {/*<Button className="sipButtonTypeC">*/}
          {/*  <img src={deliveryBox} alt="delivery-box" className="mr-2" />*/}
          {/*  {t('Kiện')}&nbsp;({'20'})*/}
          {/*</Button>*/}
        </div>
        {/*<div className="btn-toolbar col-2 align-items-end flex-column">*/}
        {/*  <Button color="primary">*/}
        {/*    <i className="fa fa-cube mr-1" />*/}
        {/*    {t('Nhận')}*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </Row>
    );
  }

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={listTaiKienChuaNhan} onRowClick={redirectToThongTinTai} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={1}
          // onPageChange={handlePageChange}
        />
      </Row>
    </>
  );
};

export default withRouter(TaiKienChuaNhan);
