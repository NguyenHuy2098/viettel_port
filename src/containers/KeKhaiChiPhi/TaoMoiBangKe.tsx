import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { match } from 'react-router-dom';
import { Cell } from 'react-table';
import { goBack } from 'connected-react-router';

import DataTable from 'components/DataTable';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const TaoMoiBangKe = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
        accessor: 'TOR_ID',
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
        accessor: 'GRO_WEI_VAL',
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'DATETIME_CHLC',
      },
      {
        Header: t('Loại'),
        accessor: 'TYPE',
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
    [],
  );

  const handleBack = (): void => {
    dispatch(goBack());
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

  const renderFilters = (): JSX.Element => (
    <div className="bg-white p-3 shadow-sm">
      <Row>
        <Col xs={12} md={3} xl={2}>
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
        </Col>
        <Col xs={12} md={3} xl={2}>
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
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
          <div>{t('Trạng thái')}:</div>
          <div>{t('Kỳ')}:</div>
        </Col>
        <Col>
          <div>{t('Người tạo')}:</div>
          <div>{t('Đơn vị')}:</div>
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
      <Button color="primary" className="ml-2">
        <i className="fa fa-upload mr-2" />
        {t('Tải lên')}
      </Button>
      <Button color="primary" className="ml-2">
        <i className="fa fa-plus mr-2" />
        {t('Thêm khoản mục')}
      </Button>
    </>
  );

  return (
    <>
      <Row className="mb-3">
        <Col>
          <h1 className="sipTitle">
            <Button className="sipTitleBtnBack" onClick={handleBack}>
              <img className="backIcon" src={'../../assets/img/icon/iconArrowLeft.svg'} alt="VTPostek" />
            </Button>
            {t('Tạo mới bảng kê')}
          </h1>
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
            <DataTable columns={columns} data={[]} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TaoMoiBangKe;
