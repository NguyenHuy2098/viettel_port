import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Input, Label, Col, Row, Table } from 'reactstrap';
import { getListPhieuGuiTrongBangKe } from 'redux/MIOA_ZTMI046/actions';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import { map } from 'lodash';
import { useGetManifestForwardingOrderList } from 'redux/MIOA_ZTMI046/selectors';

// eslint-disable-next-line max-lines-per-function
function DanhSachPhieuGuiTrongBangKe(): JSX.Element {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [error, setError] = useState<string>('');

  const manifestForwardingOrderList = useGetManifestForwardingOrderList();

  useEffect((): void => {
    const payload = {
      IV_TOR_ID: '4600000501',
    };
    dispatch(
      getListPhieuGuiTrongBangKe(payload, {
        // onBeginning(): void {
        //   console.log('Start dispatch');
        // },
        // onSuccess: (data: any): void => {
        //   console.log(data);
        // },
        onFailure: (errorObj: HttpRequestErrorType): void => {
          console.log('Có lỗi xảy ra');
          console.log(error);
          setError(errorObj.message);
        },
      }),
    );
  }, [dispatch, error]);

  function renderTopController(): JSX.Element {
    return (
      <>
        <Button className="sipTitleRightBlockBtnIcon">
          <i className="fa fa-trash-o" />
        </Button>
        <Button className="sipTitleRightBlockBtnIcon">
          <i className="fa fa-print" />
        </Button>
        <Button>
          <i className="fa fa-download" />
          {t('Ghi lại')}
        </Button>
      </>
    );
  }

  function renderTableRowControllers(): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-pencil fa-lg color-blue" />
        </Button>
        <Button>
          <i className="fa fa-trash-o fa-lg color-red" />
        </Button>
      </>
    );
  }

  const renderDataTable = (): JSX.Element => (
    <Table striped hover>
      <thead>
        <tr>
          <th></th>
          <th>Mã phiếu gửi</th>
          <th>Điểm đến</th>
          <th>Số lượng</th>
          <th>Trọng lượng</th>
          <th>Ngày gửi</th>
          <th>Quản trị</th>
        </tr>
      </thead>
      <tbody>
        {map(manifestForwardingOrderList, (item: API.Child, index) => {
          return (
            <tr key={index}>
              <td>
                <Label check>
                  <Input type="checkbox" />
                </Label>
              </td>
              <td>{item.TOR_ID}</td>
              <td>BNE</td>
              <td>2</td>
              <td>250g</td>
              <td>19/6/2019</td>
              <td className="SipTableFunctionIcon">{renderTableRowControllers()}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button>
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Danh sách phiếu gửi trong bảng kê')}
        </h1>
        <div className="sipTitleRightBlock">{renderTopController()}</div>
      </Row>

      <Row className="sipSummaryContent">
        <Col md="4" xs="12">
          <Row>
            <Col xs="5">{t('Mã bảng kê')}: </Col>
            <Col xs="7">{'V00596290'}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Trọng lượng')}: </Col>
            <Col xs="7">{'1400g'}</Col>
          </Row>
        </Col>
        <Col md="5" xs="12">
          <Row>
            <Col xs="5">{t('Điểm đến')}: </Col>
            <Col xs="7">HUB1</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{'Thư hỏa tốc'}</Col>
          </Row>
        </Col>
        <Col md="3" xs="12" className="text-right">
          {t('Tổng số')}: 45
        </Col>
      </Row>

      <Row className="sipBgWhiteContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Quét mã phiếu gửi" />
          <Button color="primary">Quét mã</Button>
        </div>
      </Row>

      <Row className="sipTableContainer">{renderDataTable()}</Row>
    </>
  );
}

export default DanhSachPhieuGuiTrongBangKe;
