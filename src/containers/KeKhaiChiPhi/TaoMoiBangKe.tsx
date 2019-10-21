import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { match } from 'react-router-dom';
import { Cell, Row as TableRow } from 'react-table';
import { goBack } from 'connected-react-router';
import { get } from 'lodash';
import XLSX from 'xlsx';

import DataTable from 'components/DataTable/Grouped';
import { toastError } from 'components/Toast';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const TaoMoiBangKe = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listBangKeChuaDongTai = useSelector(makeSelectorRow(SipDataType.BANG_KE, SipDataState.CHUA_HOAN_THANH));

  const getListTai = (payload = {}): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.BANG_KE,
          IV_CUST_STATUS: SipDataState.CHUA_HOAN_THANH,
          IV_NO_PER_PAGE: 5000,
          ...payload,
        },
        {
          onFailure: (error: Error) => {
            toastError(error, get(payload, 'IV_TOR_ID'));
          },
        },
        {
          flow: SipFlowType.KHAI_THAC_DI,
        },
      ),
    );
  };

  useEffect(() => {
    getListTai();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã chuyến thư'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Bưu cục đi'),
        accessor: 'LOG_LOCID_FR',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('Số lượng'),
        accessor: 'ITEM_NO',
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
    [listBangKeChuaDongTai],
  );

  const handleBack = (): void => {
    dispatch(goBack());
  };

  const handleChangeFilePath = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      const data = new Uint8Array(get(event, 'target.result'));
      const workbook = XLSX.read(data, { type: 'array' });

      // eslint-disable-next-line no-console
      console.log(workbook);
      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsArrayBuffer(get(event, 'target.files[0]'));
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
      <Input className="hide" id="xlsx-input" onChange={handleChangeFilePath} type="file" />
      <Label className="btn btn-primary ml-2 mb-0" htmlFor="xlsx-input">
        <i className="fa fa-upload mr-2" />
        {t('Tải lên')}
      </Label>
      <Button color="primary" className="ml-2">
        <i className="fa fa-plus mr-2" />
        {t('Thêm khoản mục')}
      </Button>
    </>
  );

  function renderGroupedRow(rows: TableRow<API.RowMTZTMI047OUT>[], index: string): JSX.Element {
    return (
      <Row>
        <Col>
          {t('Nhóm số lượng')} {index}
        </Col>
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
  }

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
            <DataTable
              columns={columns}
              data={listBangKeChuaDongTai}
              groupKey={'ITEM_NO'}
              renderGroupedRow={renderGroupedRow}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TaoMoiBangKe;
