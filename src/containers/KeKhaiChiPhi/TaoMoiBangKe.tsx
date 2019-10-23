import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, FormGroup, Input, Row } from 'reactstrap';
import { Cell, Row as TableRow } from 'react-table';
import XLSX, { WorkBook } from 'xlsx';
import { get } from 'lodash';

import ButtonGoBack from 'components/Button/ButtonGoBack';
import ButtonInputXlsxFile from 'components/Button/ButtonInputXlsxFile';
import DataTable from 'components/DataTable/Grouped';
import useLoggedInUser from 'hooks/useLoggedInUser';
import ThemMoiKhoanMuc from 'containers/KeKhaiChiPhi/ThemMoiKhoanMuc';

// eslint-disable-next-line max-lines-per-function
const TaoMoiBangKe = (): JSX.Element => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const userLogin = useLoggedInUser();

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mẫu hợp đồng'),
        accessor: 'Mẫu hóa đơn',
      },
      {
        Header: t('Ký hiệu'),
        accessor: 'Ký hiệu hóa đơn',
      },
      {
        Header: t('Số'),
        accessor: 'Số hóa đơn',
      },
      {
        Header: t('Ngày'),
        accessor: 'Ngày hóa đơn',
      },
      {
        Header: t('Trạng thái'),
        accessor: 'ITEM_NO',
      },
      {
        Header: t('Người bán'),
        accessor: 'Tên người bán',
      },
      {
        Header: t('MST'),
        accessor: 'Mã số thuế người bán',
      },
      {
        Header: t('Hàng hoá'),
        accessor: 'Hàng hóa, dịch vụ chưa thuế',
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
    const first_sheet_name = workbook.SheetNames[0];
    setData(XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name], { range: 2 }));
  };

  const renderFirstControllers = (): JSX.Element => (
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
  );

  const years = useMemo(() => Array.from(new Array(20), (val, index) => index + new Date().getFullYear()), []);

  const [month, setMonth] = React.useState<string>('1');
  function handleChangeMonth(e: React.FormEvent<HTMLInputElement>): void {
    setMonth(e.currentTarget.value);
  }

  const [year, setYear] = React.useState<string>('2019');
  function handleChangeYear(e: React.FormEvent<HTMLInputElement>): void {
    setYear(e.currentTarget.value);
  }

  const renderFilters = (): JSX.Element => (
    <div className="bg-white p-3 shadow-sm">
      <Row>
        <Col xs={12} md={3} xl={2}>
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect" onChange={handleChangeMonth}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </Input>
          </FormGroup>
        </Col>
        <Col xs={12} md={3} xl={2}>
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect" onChange={handleChangeYear}>
              {years.map(year => {
                return <option key={year}>{year}</option>;
              })}
            </Input>
          </FormGroup>
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
            {t('Kỳ')}: {`${month}/${year}`}
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
