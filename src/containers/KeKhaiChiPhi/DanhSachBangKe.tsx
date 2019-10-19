import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { match } from 'react-router-dom';
import { push } from 'connected-react-router';
import { get } from 'lodash';
import { Button, Col, Input, Row, Label } from 'reactstrap';
import { Cell } from 'react-table';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';

import DataTable from 'components/DataTable';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import PrintBangKeChiTiet from 'components/Printable/PrintBangKeChiTiet';
import routesMap from 'utils/routesMap';

interface Props {
  match: match;
}

const stateMap = {
  A: 'Chờ phê duyệt',
  B: 'Tạo mới',
  C: 'Duyệt 1 phần',
  D: 'Phê duyệt',
};

// eslint-disable-next-line max-lines-per-function
const DanhSachBangKe = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [tuKy, setTuKy] = useState<string>('01/01/2019');
  const [denKy, setDenKy] = useState<string>('01/01/2020');
  const [filterTimeValue, setFilterTimeValue] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChangeDeliveryTime(event: any, picker: any): void {
    if (tuKy && denKy) {
      const thisTuKy = moment(get(picker, 'startDate')).format('DD/MM/YYYY');
      const thisDenKy = moment(get(picker, 'endDate')).format('DD/MM/YYYY');
      setTuKy(thisTuKy);
      setDenKy(thisDenKy);
      setFilterTimeValue(`${thisTuKy} - ${thisDenKy}`);
    }
  }

  const redirectToTaoMoiBangKe = (): void => {
    dispatch(push(routesMap.TAO_MOI_BANG_KE));
  };

  const renderTopController = (): JSX.Element => {
    return (
      <>
        <Button className="sipTitleRightBlockBtnIcon">
          <img src={'../../assets/img/icon/iconRefresh.svg'} alt="VTPostek" />
        </Button>
        <Button color="primary" className="ml-2">
          <img src={'../../assets/img/icon/iconExport.svg'} alt="VTPostek" />
          {t('Xuất file Excel')}
        </Button>
        <Button color="primary" className="ml-2">
          <img src={'../../assets/img/icon/iconPrintWhite.svg'} alt="VTPostek" />
          {t('In bảng kê')}
        </Button>
        <Button color="primary" className="ml-2" onClick={redirectToTaoMoiBangKe}>
          <img src={'../../assets/img/icon/iconPlus.svg'} alt="VTPostek" />
          {t('Thêm mới')}
        </Button>
      </>
    );
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

  const data = [
    {
      TYPE1: 'a',
      TYPE2: 'b',
      TYPE3: 'c',
      TYPE4: 'd',
      TYPE5: 'A',
      TYPE6: 'f',
    },
    {
      TYPE1: 'a',
      TYPE2: 'b',
      TYPE3: 'c',
      TYPE4: 'd',
      TYPE5: 'B',
      TYPE6: 'f',
    },
    {
      TYPE1: 'a',
      TYPE2: 'b',
      TYPE3: 'c',
      TYPE4: 'd',
      TYPE5: 'C',
      TYPE6: 'f',
    },
    {
      TYPE1: 'a',
      TYPE2: 'b',
      TYPE3: 'c',
      TYPE4: 'd',
      TYPE5: 'D',
      TYPE6: 'f',
    },
    {
      TYPE1: 'a',
      TYPE2: 'b',
      TYPE3: 'c',
      TYPE4: 'd',
      TYPE5: 'A',
      TYPE6: 'f',
    },
  ];

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <Label check>
              <Input type="checkbox" />
            </Label>
          );
        },
      },
      {
        Header: t('Mã bảng kê'),
        accessor: 'TYPE1',
      },
      {
        Header: t('Người nhập'),
        accessor: 'TYPE2',
      },
      {
        Header: t('Ngày tạo'),
        accessor: 'TYPE3',
      },
      {
        Header: t('Kỳ'),
        accessor: 'TYPE4',
      },
      {
        Header: t('Trạng thái'),
        accessor: 'TYPE5',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          const type5 = get(row, 'values.TYPE5');
          const type5Text = get(stateMap, type5);
          return (
            <>
              <Button className={`sipTableBtnStatus sipTableBtnStatus${type5}`}>{type5Text}</Button>
            </>
          );
        },
      },
      {
        Header: t('Người duyệt'),
        accessor: 'TYPE6',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <>
              {renderPrintButton('')}
              <Button className="SipTableFunctionIcon">
                <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
              </Button>
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
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Kê khai chi phí thường xuyên')}</h1>
        <div className="sipTitleRightBlock">{renderTopController()}</div>
      </Row>

      <Row className="sipBgWhiteContainer sipFilterContainer">
        <Col className="sipFilterCol">
          <div className="sipFilterColSearch">
            <Input type="text" placeholder="Tra cứu bảng kê" />
            <img src={'../../assets/img/icon/iconSearch.svg'} alt="VTPostek" />
          </div>
        </Col>
        <Col className="sipFilterCol">
          <DateRangePicker
            startDate={moment().format('MMDDYYYY')}
            endDate="01012020"
            onApply={handleChangeDeliveryTime}
          >
            <Input value={filterTimeValue} type="text" placeholder="Nhập khoảng thời gian" />
          </DateRangePicker>
        </Col>
        <Col className="sipFilterCol">
          <div className="sipFilterColSearch">
            <Input type="select">
              <option value={0}>Tất cả trạng thái</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Input>
            <img src={'../../assets/img/icon/iconFilter.svg'} alt="VTPostek" />
          </div>
        </Col>
        <Col className="sipFilterColBtn">
          <Button color="primary">Tìm kiếm</Button>
        </Col>
      </Row>

      <Row className="sipTableContainer">
        <DataTable columns={columns} data={data} />
      </Row>
    </>
  );
};

export default DanhSachBangKe;
