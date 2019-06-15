import * as React from 'react';
import { useState } from 'react';
import { Button, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import HistoryImpactTable from '../../components/OrderInfomationTabType/HistoryImpactTable';
import TripInfoTable from '../../components/OrderInfomationTabType/TripInfoTable';

// eslint-disable-next-line max-lines-per-function
const OrderInformationTabType: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(1);

  function handleClickToTripInfoTab() {
    setTab(1);
  }

  function handleClickToHistoryImpactTab() {
    setTab(2);
  }

  function renderOrderInformation(): JSX.Element {
    return (
      <Col md="4" xs="12">
        <div className="sipInputContainer">
          <div className="sipInputBlock">
            <h3>Thông tin đơn hàng</h3>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Trạng thái')}:
              </Col>
              <Col xs="12" lg="9">
                {t('Giao bưu tá phát')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Trọng lượng')}:
              </Col>
              <Col xs="12" lg="9">
                900 g
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Tổng cước')}:
              </Col>
              <Col xs="12" lg="9">
                15.000 đ
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Tiền thu hộ')}:
              </Col>
              <Col xs="12" lg="9">
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
      <Col md="4" xs="12">
        <div className="sipInputContainer">
          <div className="sipInputBlock">
            <h3> {t('Người gửi')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Họ & tên')}:
              </Col>
              <Col xs="12" lg="9">
                {t('Nguyễn Văn An')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Điện thoại')}:
              </Col>
              <Col xs="12" lg="9">
                {t('0987654314')}:
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Email')}:
              </Col>
              <Col xs="12" lg="8">
                {t('hiepsiden@gmail.com')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Địa chỉ')}:
              </Col>
              <Col xs="12" lg="9">
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
      <Col md="4" xs="12">
        <div className="sipInputContainer">
          <div className="sipInputBlock">
            <h3> {t('Người gửi')}</h3>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Họ & tên')}:
              </Col>
              <Col xs="12" lg="9">
                {t('Trần Văn Thao')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Điện thoại')}:
              </Col>
              <Col xs="12" lg="9">
                {t('0987654314')}:
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Email')}:
              </Col>
              <Col xs="12" lg="8">
                {t('hiepsimu@gmail.com')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Địa chỉ')}:
              </Col>
              <Col xs="12" lg="9">
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
      <Col xs="12">
        <div className="sipInputContainer">
          <div className="sipInputBlock">
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Bưu cục phát')}:
              </Col>
              <Col xs="12" lg="9">
                {t('TN2')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Bưu tá phát')}:
              </Col>
              <Col xs="12" lg="9">
                {t('Huy NT・098843700')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Bưu cục gốc')}:
              </Col>
              <Col xs="12" lg="8">
                {t('DTHNI')}
              </Col>
            </Row>
            <Row className="sipInputItem">
              <Col xs="12" lg="3">
                {t('Giám đốc gốc')}:
              </Col>
              <Col xs="12" lg="9">
                {t('Nga PT・098800982')}
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }

  return (
    <div>
      <Row className="sipInputItem">
        <Col xs="12" lg="8" className="color-bluegreen">
          {t('Mã vận đơn')}: 157 194 840720
        </Col>
      </Row>
      <div className="mt-3" />
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
      <div className="row mt-3" />
      <div className="mt-3" />
      <Row className="sipInputContainer">
        <Row>
          <Nav tabs>
            <NavItem>
              <NavLink onClick={handleClickToTripInfoTab}>{t('Thông tin hành trình')}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handleClickToHistoryImpactTab}>{t('Lịch sử tác động')}</NavLink>
            </NavItem>
          </Nav>
        </Row>
        <Row>
          {renderOrderInformation()}
          {renderSenderCustomer()}
          {renderReceiveCustomer()}
        </Row>
      </Row>
      <div className="row mt-3" />
      <div className="mt-3" />
      {tab === 2 && (
        <>
          <h1 className="sipTitle">{t('Thông tin liên hệ')}</h1>
          <Row>{renderInformationContact()}</Row>
          <div className="row mt-3" />
          <div className="mt-3" />
          <h1 className="sipTitle">{t('Lịch sử tác động')}</h1>
          <HistoryImpactTable />
        </>
      )}
      {tab === 1 && (
        <>
          <div className="row mt-3" />
          <div className="mt-3" />
          <h1 className="sipTitle">{t('Thông tin hành trình')}</h1>
          <TripInfoTable />
        </>
      )}
    </div>
  );
};

export default OrderInformationTabType;
