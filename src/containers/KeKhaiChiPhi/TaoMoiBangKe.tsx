import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactDatePicker from 'react-datepicker';
import { Cell, Row as TableRow } from 'react-table';
import { Button, Col, Row } from 'reactstrap';
import XLSX, { WorkBook } from 'xlsx';
import { get, isEmpty, map } from 'lodash';
import moment from 'moment';

import ButtonGoBack from 'components/Button/ButtonGoBack';
import ButtonInputXlsxFile from 'components/Button/ButtonInputXlsxFile';
import ButtonLuuBangKe from 'components/Button/ButtonLuuBangKe';
import DataTable from 'components/DataTable/Grouped';
import ThemMoiKhoanMuc from 'containers/KeKhaiChiPhi/ThemMoiKhoanMuc';
import useLoggedInUser from 'hooks/useLoggedInUser';
import { transformXlsxRowToBangKeItem } from 'utils/common';

// eslint-disable-next-line max-lines-per-function
const TaoMoiBangKe = (): JSX.Element => {
  const userLogin = useLoggedInUser();
  const [data, setData] = useState<API.ITEM[]>([]);
  const { t } = useTranslation();

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mẫu hoá đơn'),
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
        accessor: 'ITEM_NO',
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
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
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

  const handleChangeFile = (workbook: WorkBook): void => {
    const firstSheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { range: 2 });
    setData(map(sheetData, transformXlsxRowToBangKeItem));
  };

  const renderFirstControllers = (): JSX.Element => (
    <>
      <ButtonLuuBangKe className="ml-2" date={monthYear} disabled={isEmpty(data)} items={data} />
      <Button color="primary" disabled={isEmpty(data)} className="ml-2">
        <i className="fa fa-send mr-2" />
        {t('Nộp')}
      </Button>
    </>
  );

  const [monthYear, setMonthYear] = React.useState<Date>(new Date());
  function handleChangeMonthYear(date: Date): void {
    setMonthYear(date);
  }

  const renderFilters = (): JSX.Element => (
    <div className="bg-white p-3 shadow-sm">
      <Row>
        <Col xs={12} md={3} xl={2}>
          <ReactDatePicker
            className="form-control"
            dateFormat="MM/yyyy"
            onChange={handleChangeMonthYear}
            selected={monthYear}
            showMonthYearPicker
          />
        </Col>
      </Row>
    </div>
  );

  const renderThongTinBangKe = (): JSX.Element => (
    <div className="bg-white p-3 shadow-sm">
      <Row>
        <Col>
          <div>{t('Mã bảng kê')}:</div>
          <div>
            {t('Trạng thái')}: {t('Tạo mới')}
          </div>
          <div>
            {t('Kỳ')}: {moment(monthYear).format('MM/YYYY')}
          </div>
        </Col>
        <Col>
          <div>
            {t('Người tạo')}: {get(userLogin, 'user.profile.preferred_username', '')}
          </div>
          <div>
            {t('Đơn vị')}: {get(userLogin, 'user.profile.bp_org_unit', '')}
          </div>
        </Col>
        <Col>
          <div>{t('Tổng giá trị')}:</div>
          <div>{t('Ngày tạo')}:</div>
        </Col>
      </Row>
    </div>
  );

  const renderSecondControllers = (): JSX.Element => (
    <>
      <ButtonInputXlsxFile extension="xlsx" onChange={handleChangeFile} />
      <ThemMoiKhoanMuc />
    </>
  );

  const renderGroupedRow = (rows: TableRow<API.RowMTZTMI047OUT>[], index: string): JSX.Element => {
    return (
      <Row>
        <Col>{index}</Col>
        <Col>
          <div className="d-flex justify-content-end">
            <Button color="primary" className=" ml-2" outline>
              <i className="fa fa-plus mr-2" />
              {t('Thêm mới')}
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          <div className="d-flex sipTitle">
            <ButtonGoBack />
            <h4>{t('Tạo mới bảng kê')}</h4>
          </div>
        </Col>
        <Col className="d-flex justify-content-end">{renderFirstControllers()}</Col>
      </Row>

      <Row className="mb-3">
        <Col>{renderFilters()}</Col>
      </Row>

      <Row className="mb-4">
        <Col>{renderThongTinBangKe()}</Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <h1 className="sipTitle">{t('Danh sách khoản mục chi phí')}</h1>
        </Col>
        <Col className="d-flex justify-content-end">{renderSecondControllers()}</Col>
      </Row>

      <Row>
        <Col>
          <div className="sipTableContainer">
            <DataTable
              columns={columns}
              data={data}
              groupKey={'Khoản mục chi phí'}
              renderGroupedRow={renderGroupedRow}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TaoMoiBangKe;
