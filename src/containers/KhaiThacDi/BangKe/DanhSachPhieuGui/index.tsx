import React, { useMemo } from 'react';
import { useState, useCallback } from 'react';
import { Button, Col, Input, Nav, NavLink, NavItem, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { goBack } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGui: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleBack = (): void => {
    dispatch(goBack());
  };
  const [tab, setTab] = useState<number>(1);
  function handleChangeTab(tab: number): void {
    setTab(tab);
  }
  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack} className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          Danh sách phiếu gửi trong bảng kê
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-trash-o" />
          </Button>
          <Button>
            <i className="fa fa-download" />
            Ghi lại
          </Button>
        </div>
      </Row>
    );
  }

  function renderDescriptionServiceShipping(): JSX.Element {
    return (
      <Row className="sipSummaryContent">
        <Col lg="5" xs="12">
          <Row>
            <Col xs="5">{t('Mã bảng kê')}: </Col>
            <Col xs="7">BK_1209_BNH</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Trọng lượng')}: </Col>
            <Col xs="7">1400 g</Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Điểm đến')}: </Col>
            <Col xs="7">TQN</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{t('Thư - Hỏa tốc')}: </Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: 5
        </Col>
      </Row>
    );
  }
  function renderShippingInformationAndScanCode(): JSX.Element {
    return (
      <div className="sipContentContainer">
        {renderDescriptionServiceShipping()}
        <Row className="sipLine mt-3 mb-3" />
        <div className="sipScanCodeContainer">
          <Input type="text" placeholder="Quét mã phiếu gửi" />
          <Button color="primary">Quét mã</Button>
        </div>
      </div>
    );
  }
  const data = [
    {
      TOR_ID: 4545,
      TO_LOG_ID: 'bcd',
      countChuyenThu: 12,
      GRO_WEI_VAL: 1200,
      CREATED_ON: '12/12/2019',
    },
  ];
  const columns = useMemo(
    () => [
      {
        Header: t('Số vận đơn'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'TO_LOG_ID',
      },
      {
        Header: t('Số lượng'),
        accessor: 'countChuyenThu',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GRO_WEI_VAL',
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-pencil fa-lg color-blue" />
              </Button>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-trash-o fa-lg color-red" />
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
      {renderTitle()}
      {renderShippingInformationAndScanCode()}
      <div className="sipTabContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: tab === 1 })}
              onClick={useCallback((): void => handleChangeTab(1), [])}
            >
              TWQ (3)
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              THD (0)
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab}>
          <TabPane tabId={1}>
            <Row className="sipTableContainer">
              <DataTable columns={columns} data={data} />
            </Row>
          </TabPane>
          <TabPane tabId={2}>
            <Row className="sipTableContainer">
              <DataTable columns={columns} data={data} />
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};
export default DanhSachPhieuGui;
