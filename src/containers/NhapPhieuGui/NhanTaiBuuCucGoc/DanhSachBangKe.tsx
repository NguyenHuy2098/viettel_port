import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Input, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane } from 'reactstrap';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import classNames from 'classnames';
import { map } from 'lodash';
import { useGet_MT_ZTMI047_OUT_Row } from 'redux/MIOA_ZTMI047/selectors';
import { push } from 'connected-react-router';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
function DanhSachBangKe(): JSX.Element {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const listManifest = useGet_MT_ZTMI047_OUT_Row();

  useEffect((): void => {
    const payload = {
      IV_TOR_ID: '',
      IV_TOR_TYPE: 'ZC1',
      IV_FR_LOC_ID: 'BDH',
      IV_CUST_STATUS: '101',
      IV_TO_LOC_ID: '',
    };
    dispatch(
      action_MIOA_ZTMI047(payload, {
        onFailure: (error: HttpRequestErrorType): void => {
          console.log(error.messages);
        },
      }),
    );
  }, [dispatch]);

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Nhận tại bưu cục gốc</h1>
      </Row>
    );
  }

  const [tab, setTab] = useState<number>(2);
  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  function handleRedirectDetail(): void {
    dispatch(push(routesMap.danhSachPhieuGuiTrongBangKe));
  }

  const handleDeleteManifet = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      const payload = {
        IV_FLAG: '3',
        IV_TOR_TYPE: 'ZC1',
        IV_TOR_ID_CU: item.TOR_ID,
        IV_SLOCATION: '',
        IV_DLOCATION: '',
        IV_DESCRIPTION: '',
        T_ITEM: {
          ITEM_ID: '',
          ITEM_TYPE: '',
        },
      };
      if (!window.confirm('Bạn có chắc chắn?')) return;
      dispatch(
        action_MIOA_ZTMI016(payload, {
          onFinish: (): void => {
            const payload = {
              IV_TOR_ID: '',
              IV_TOR_TYPE: 'ZC1',
              IV_FR_LOC_ID: 'BDH',
              IV_CUST_STATUS: '101',
              IV_TO_LOC_ID: '',
            };
            dispatch(action_MIOA_ZTMI047(payload));
          },
        }),
      );
    };
  };

  function renderManifestTableAction(item: API.RowMTZTMI047OUT): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-print fa-lg color-green" />
        </Button>
        <Button onClick={handleRedirectDetail}>
          <i className="fa fa-pencil fa-lg color-blue" />
        </Button>
        <Button onClick={handleDeleteManifet(item)}>
          <i className="fa fa-trash-o fa-lg color-red" />
        </Button>
      </>
    );
  }

  function renderManifestTable(): JSX.Element {
    return (
      <Row className="sipTableContainer sipBoxShadow">
        <Table striped hover>
          <thead>
            <tr>
              <th>{t('Mã bảng kê')}</th>
              <th>{t('Điểm đến')}</th>
              <th>{t('Số lượng')}</th>
              <th>{t('Người nhập')}</th>
              <th>{t('Ngày nhập')}</th>
              <th>{t('Ghi chú')}</th>
              <th>{t('Quản trị')}</th>
            </tr>
          </thead>
          <tbody>
            {map(
              listManifest,
              (item: API.RowMTZTMI047OUT, index): JSX.Element => {
                return (
                  <tr key={index}>
                    <td>{item.TOR_ID}</td>
                    <td>{item.LOG_LOCID_DES}</td>
                    <td>{item.ITEM_NO}</td>
                    <td></td>
                    <td>{item.DATETIME_CHLC}</td>
                    <td>{item.EXEC_CONT}</td>
                    <td className="SipTableFunctionIcon">{renderManifestTableAction(item)}</td>
                  </tr>
                );
              },
            )}
          </tbody>
        </Table>
      </Row>
    );
  }

  function renderManifestIdSearch(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Mã bảng kê" />
          <Button color="primary">Tìm kiếm</Button>
        </div>
        <p className="pull-right m-0">Tổng số: {listManifest && listManifest.length}</p>
      </div>
    );
  }

  function renderForwardingOrderTableAction(): JSX.Element {
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

  function renderForwardingOrderTable(): JSX.Element {
    return (
      <Row className="sipTableContainer sipBoxShadow">
        <Table striped hover>
          <thead>
            <tr>
              <th>{t('Số vận đơn')}</th>
              <th>{t('Bưu cục đến')}</th>
              <th>{t('Số lượng')}</th>
              <th>{t('Trọng lượng')}</th>
              <th>{t('Ngày gửi')}</th>
              <th>{t('Quản trị')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>00843186002</td>
              <td>BNE</td>
              <td>5</td>
              <td>250g</td>
              <td>19/6/2019</td>
              <td className="SipTableFunctionIcon">{renderForwardingOrderTableAction()}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    );
  }

  function renderForwardingOrderCodeScan(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Quét mã phiếu gửi" />
          <Button color="primary">Quét mã</Button>
        </div>
        <p className="pull-right m-0">Tổng số: 50</p>
      </div>
    );
  }

  return (
    <>
      {renderTitle()}
      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={useCallback((): void => handleChangeTab(1), [])}
            >
              Quét mã
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              Danh sách bảng kê
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            {renderForwardingOrderCodeScan()}
            {renderForwardingOrderTable()}
          </TabPane>
          <TabPane tabId={2}>
            {renderManifestIdSearch()}
            {renderManifestTable()}
          </TabPane>
        </TabContent>
      </div>
    </>
  );
}

export default DanhSachBangKe;
