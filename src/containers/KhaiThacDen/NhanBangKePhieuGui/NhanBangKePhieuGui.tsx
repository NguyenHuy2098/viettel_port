import * as React from 'react';
import { Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import classNames from 'classnames';
import BangKeDaNhan from './BangKeDaNhan';
import BangKeChuaNhan from './BangKeChuaNhan';

// eslint-disable-next-line max-lines-per-function
const NhanBangKePhieuGui: React.FC = (): JSX.Element => {
  const [modalCreateNew, setmodalCreateNew] = React.useState<boolean>(false);
  const { t } = useTranslation();
  function toggle(): void {
    setmodalCreateNew(!modalCreateNew);
  }

  const [tab, setTab] = useState<number>(1);

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button>
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Thông tin tải')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
        </div>
      </Row>
      <Row className="sipSummaryContent">
        <Col lg="5" xs="12">
          <Row>
            <Col xs="5">{t('Mã tải')}: </Col>
            <Col xs="7">BK_1209_BNH</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày tạo')}: </Col>
            <Col xs="7">24/04/2019</Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Bưu cục đi')}: </Col>
            <Col xs="7">TQN</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ngày gửi')}: </Col>
            <Col xs="7">24/04/2019</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: 5
        </Col>
      </Row>
      <div className="row mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Thông tin bảng kê / phiếu gửi')}</h1>
      </Row>
      <div className="row mt-3" />

      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={React.useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Bảng kê / Phiếu gửi chưa nhận')}
              <Badge color="primary">25</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={React.useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Bảng kê / Phiếu gửi đã nhận')}
              <Badge color="primary">05</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <BangKeDaNhan />
          </TabPane>
          <TabPane tabId={2}>
            <BangKeChuaNhan />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default NhanBangKePhieuGui;
