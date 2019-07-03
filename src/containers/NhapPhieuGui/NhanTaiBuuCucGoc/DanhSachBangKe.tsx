import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Input, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane } from 'reactstrap';
import { getListBangKe } from 'redux/danhSachBangKe/actions';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import classnames from 'classnames';
import { map } from 'lodash';
import { makeSelectRow } from 'redux/danhSachBangKe/selectors';

// eslint-disable-next-line max-lines-per-function
function DanhSachBangKe(): JSX.Element {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [error, setError] = useState<string>('');

  const listRow = useSelector(makeSelectRow);

  useEffect((): void => {
    const payload = {
      IV_TOR_ID: '',
      IV_TOR_TYPE: 'ZC1',
      IV_FR_LOC_ID: 'BDH',
      IV_CUST_STATUS: '101',
      IV_TO_LOC_ID: '',
    };
    dispatch(
      getListBangKe(payload, {
        onFailure: (error: HttpRequestErrorType): void => {
          setError(error.message);
        },
        onBeginning(): void {
          console.log('begin nhe');
        },
        onSuccess: (data: any): void => {
          console.log(data);
          debugger;
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

  function renderManifestTableAction(): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-print fa-lg color-green" />
        </Button>
        <Button>
          <i className="fa fa-pencil fa-lg color-blue" />
        </Button>
        <Button>
          <i className="fa fa-trash-o fa-lg color-red" />
        </Button>
      </>
    );
  }

  function renderManifestTable(): JSX.Element {
    return (
      <Row className="sipTableContainer sipBoxShadow">
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
              listRow,
              (item: API.RowMTZTMI047OUT, index): JSX.Element => {
                return (
                  <tr key={index}>
                    <td>{item.TOR_ID}</td>
                    <td>TTKT1</td>
                    <td>25</td>
                    <td>Nguyễn Văn An</td>
                    <td>19/6/2019</td>
                    <td>Hàng giá trị cao</td>
                    <td className="SipTableFunctionIcon">{renderManifestTableAction()}</td>
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
        <p className="pull-right m-0">Tổng số: 45</p>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <p className="pull-right m-0">Tổng số: 45</p>
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
              className={classnames({ active: tab === 1 })}
              onClick={useCallback((): void => handleChangeTab(1), [])}
            >
              Quét mã
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: tab === 2 })}
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
