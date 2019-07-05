import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { match } from 'react-router-dom';
import { Button, Input, Label, Col, Row, Table } from 'reactstrap';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { get, map, size } from 'lodash';
import { useGet_MT_ZTMI046_OUT } from 'redux/MIOA_ZTMI046/selectors';
import { push } from 'connected-react-router';
import routesMap from 'utils/routesMap';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
function DanhSachPhieuGuiTrongBangKe(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const manifestId = get(props, 'match.params.manifestId', '');

  const manifestForwardingOrderList = useGet_MT_ZTMI046_OUT();

  React.useEffect((): void => {
    const payload = {
      IV_TOR_ID: manifestId,
    };
    dispatch(action_MIOA_ZTMI046(payload));
  }, [dispatch, manifestId]);

  function redirectToPreviousLocation(): void {
    dispatch(push(routesMap.phieuGuiTrongNuoc));
  }

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
        <Button onClick={redirectToPreviousLocation}>
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
          <th>{t('Mã phiếu gửi')}</th>
          <th>{t('Điểm đến')}</th>
          <th>{t('Số lượng')}</th>
          <th>{t('Trọng lượng')}</th>
          <th>{t('Ngày gửi')}</th>
          <th>{t('Quản trị')}</th>
        </tr>
      </thead>
      <tbody>
        {map(
          get(manifestForwardingOrderList, 'Row.CHILDS'),
          (item: API.Child, index): JSX.Element => {
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
          },
        )}
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
            <Col xs="7">{get(manifestForwardingOrderList, 'Row.TOR_ID')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Trọng lượng')}: </Col>
            <Col xs="7">
              {parseFloat(get(manifestForwardingOrderList, 'Row.NET_WEI_VAL', 0)).toFixed(1)}
              &nbsp;
              {get(manifestForwardingOrderList, 'Row.NET_WEI_UNI')}
            </Col>
          </Row>
        </Col>
        <Col md="5" xs="12">
          <Row>
            <Col xs="5">{t('Điểm đến')}: </Col>
            <Col xs="7">{get(manifestForwardingOrderList, 'Row.LOG_LOCID_DES')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{get(manifestForwardingOrderList, 'Row.EXEC_CONT')}</Col>
          </Row>
        </Col>
        <Col md="3" xs="12" className="text-right">
          {t('Tổng số')}: {size(get(manifestForwardingOrderList, 'Row.childs', []))}
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
