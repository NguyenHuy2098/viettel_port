import React, { useCallback } from 'react';
import { useState } from 'react';
import { Button, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import HistoryImpactTable from '../../components/OrderInfomationTabType/HistoryImpactTable';
import TripInfoTable from '../../components/OrderInfomationTabType/TripInfoTable';

// eslint-disable-next-line max-lines-per-function
const OrderInformationTabType: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  function renderOrderInformation(): JSX.Element {
    return (
      <Col xl="4" xs="12">
        <div className="sipInputContainer">
          <div className="sipInputBlock">
            <h3>Thông tin đơn hàng</h3>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Trạng thái')}:
              </Col>
              <Col xs="12" sm="7">
                {t('Giao bưu tá phát')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Trọng lượng')}:
              </Col>
              <Col xs="12" sm={7}>
                900 g
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Tổng cước')}:
              </Col>
              <Col xs="12" sm="7">
                15.000 đ
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Tiền thu hộ')}:
              </Col>
              <Col xs="12" sm="7">
                0 đ
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }

  function renderSenderCustomer(): JSX.Element {
    return (
      <Col xl="4" xs="12">
        <div className="sipInputContainer">
          <div className="sipInputBlock">
            <h3> {t('Người gửi')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Họ & tên')}:
              </Col>
              <Col xs="12" sm="7">
                {t('Nguyễn Văn An')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Điện thoại')}:
              </Col>
              <Col xs="12" sm="7">
                {t('0987654314')}:
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Email')}:
              </Col>
              <Col xs="12" sm="7">
                {t('hiepsiden@gmail.com')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Địa chỉ')}:
              </Col>
              <Col xs="12" sm="7">
                {t('Số 10, ngõ 2 phố Quần Ngựa, Văn Cao, Ba Đình, Hà Nội')}
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }

  function renderReceiveCustomer(): JSX.Element {
    return (
      <Col xl="4" xs="12">
        <div className="sipInputContainer">
          <div className="sipInputBlock">
            <h3> {t('Người gửi')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Họ & tên')}:
              </Col>
              <Col xs="12" sm="7">
                {t('Trần Văn Thao')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Điện thoại')}:
              </Col>
              <Col xs="12" sm="7">
                {t('0987654314')}:
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Email')}:
              </Col>
              <Col xs="12" sm="7">
                {t('hiepsimu@gmail.com')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" sm="5">
                {t('Địa chỉ')}:
              </Col>
              <Col xs="12" sm="7">
                {t('Số 10, ngõ 2 phố Quần Ngựa, Văn Cao, Ba Đình, Hà Nội')}
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }

  function renderInformationContact(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <div className="sipInputBlock">
          <Row className="sipInputItem">
            <Col xs="12" sm="5" xl={2}>
              {t('Bưu cục phát')}:
            </Col>
            <Col xs="12" sm="7">
              {t('TN2')}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="5" xl={2}>
              {t('Bưu tá phát')}:
            </Col>
            <Col xs="12" sm="7">
              {t('Huy NT・098843700')}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="5" xl={2}>
              {t('Bưu cục gốc')}:
            </Col>
            <Col xs="12" sm="7">
              {t('DTHNI')}
            </Col>
          </Row>
          <Row className="sipInputItem">
            <Col xs="12" sm="5" xl={2}>
              {t('Giám đốc gốc')}:
            </Col>
            <Col xs="12" sm="7">
              {t('Nga PT・098800982')}
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  const [tab, setTab] = useState<number>(1);
  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  return (
    <div>
      <Row className="sipInputItem">
        <Col xs="12" lg="8" className="color-bluegreen">
          {t('Mã vận đơn')}: 157 194 840720
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Thông tin đơn hàng')}</h1>
        <div className="sipTitleRightBlock">
          <Button>
            <i className="fa fa-eye" />
            {t('Xem phiếu gửi')}
          </Button>
          <Button>
            <i className="fa fa-pencil" />
            {t('Sửa phiếu gửi')}
          </Button>
          <Button>
            <i className="fa fa-barcode" />
            {t('In mã vạch')}
          </Button>
          <Button>
            <i className="fa fa-print" />
            {t('In mã phiếu')}
          </Button>
        </div>
      </Row>
      <div className="sipTabContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: tab === 1 })}
              onClick={useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Thông tin hành trình')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Lịch sử tác động')}
            </NavLink>
          </NavItem>
        </Nav>
        <Row className="sipContentContainer no-padding">
          {renderOrderInformation()}
          {renderSenderCustomer()}
          {renderReceiveCustomer()}
        </Row>
      </div>
      <div className="row mt-3" />
      <div className="mt-3" />
      {tab === 2 && (
        <>
          <h1 className="sipTitle">{t('Thông tin liên hệ')}</h1>
          {renderInformationContact()}
          <div className="row mt-3" />
          <div className="mt-3" />
          <h1 className="sipTitle">{t('Lịch sử tác động')}</h1>
          <HistoryImpactTable />
        </>
      )}
      {tab === 1 && (
        <>
          <h1 className="sipTitle">{t('Thông tin hành trình')}</h1>
          <TripInfoTable />
        </>
      )}
    </div>
  );
};

export default OrderInformationTabType;
