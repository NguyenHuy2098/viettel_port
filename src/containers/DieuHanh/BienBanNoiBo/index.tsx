import React from 'react';
import { useState } from 'react';
import { Button, Col, Input, Nav, NavLink, NavItem, Row, Table, TabContent, TabPane, Label } from 'reactstrap';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const InternalRecord: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const renderTopController = (): React.ReactElement => (
    <>
      <Button>
        <i className="fa fa-plus" />
        {t('Thêm mới')}
      </Button>
      <Button>
        <i className="fa fa-search" />
        {t('Tra cứu biên bản')}
      </Button>
    </>
  );

  function renderInternalRecordTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Biên bản sai sót nghiệp vụ')}</h1>
        <div className="sipTitleRightBlock">{renderTopController()}</div>
      </Row>
    );
  }

  function renderFindRecordButton(): JSX.Element {
    return (
      <div className="findRecordButton">
        <Button>{t('Nghiêm trọng')}</Button>
        <Button className="active">{t('Kết luận sai')}</Button>
        <Button>{t('Đã hoàn thành')}</Button>
        <Button>{t('Mới lập')}</Button>
      </div>
    );
  }

  // eslint-disable-next-line max-lines-per-function
  function renderFindRecordContent(): JSX.Element {
    return (
      <>
        <Row>
          <Col xl={4} md={5} xs={12} className="mb-3">
            <Row>
              <Label xs="12" md="5">
                Từ ngày
              </Label>
              <Col md="7">
                <Input type="text" placeholder="" />
              </Col>
            </Row>
          </Col>
          <Col xl={4} md={5} xs={12} className="mb-3">
            <Row>
              <Label xs="12" md="5">
                Đến ngày
              </Label>
              <Col md="7">
                <Input type="text" placeholder="" />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xl={4} md={5} xs={12} className="mb-3">
            <Row>
              <Label xs="12" md="5">
                Bưu cục lập
              </Label>
              <Col md="7">
                <Input type="text" placeholder="" />
              </Col>
            </Row>
          </Col>
          <Col xl={4} md={5} xs={12} className="mb-3">
            <Row>
              <Label xs="12" md="5">
                Bưu cục bị lập
              </Label>
              <Col md="7">
                <Input type="text" placeholder="" />
              </Col>
            </Row>
          </Col>
          <Col md={2} xs={12} className="mb-3">
            <Button color="primary">Tìm kiếm</Button>
          </Col>
        </Row>
        <Row className="sipLine mt-2 mb-3" />
        <Row>
          <Col>
            Tổng số: <span>1</span>
          </Col>
        </Row>
      </>
    );
  }

  function renderAction(): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-eye fa-lg color-orange" />
        </Button>
        <Button>
          <i className="fa fa-check fa-lg color-green" />
        </Button>
        <Button>
          <i className="fa fa-pencil fa-lg color-blue" />
        </Button>
      </>
    );
  }

  function renderTable(): JSX.Element {
    return (
      <div className="sipTableContainer">
        <Table bordered hover>
          <thead>
            <tr>
              <th>{t('Số BB')}</th>
              <th>{t('Ngày lập')}</th>
              <th>{t('BC lập')}</th>
              <th>{t('BC bị lập')}</th>
              <th>{t('Lỗi')}</th>
              <th>{t('TT')}</th>
              <th>{t('Điểm CN')}</th>
              <th>{t('Điểm GĐ')}</th>
              <th>{t('Nội dung')}</th>
              <th>{t('Quản trị')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0041800013</td>
              <td>19/6/2019 12:03:00</td>
              <td>TTKT3</td>
              <td>A98</td>
              <td>Phát hiện nhiều ghạch</td>
              <td>Lập biên bản</td>
              <td>10</td>
              <td>5</td>
              <td>Yêu cầu duyệt hoàn trong hôm nay</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  const [tab, setTab] = useState<number>(1);
  function handleChangeTab(event: React.MouseEvent): void {
    setTab(Number(event.currentTarget.getAttribute('value')));
  }

  function renderFindRecord(): JSX.Element {
    return (
      <div className="sipTabContainer">
        <Nav tabs>
          <NavItem>
            <NavLink className={classnames({ active: tab === 1 })} onClick={handleChangeTab} value={1}>
              {t('Biên bản bị lập')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: tab === 2 })} onClick={handleChangeTab} value={2}>
              {t('Biên bản đã lập')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: tab === 3 })} onClick={handleChangeTab} value={3}>
              {t('Kết luận biên bản')}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab}>
          <TabPane tabId={1} className="sipTabContent">
            {renderFindRecordButton()}
            {renderFindRecordContent()}
          </TabPane>
          <TabPane tabId={2} className="sipTabContent">
            {2}
          </TabPane>
          <TabPane tabId={3} className="sipTabContent">
            {renderFindRecordContent()}
          </TabPane>
        </TabContent>
      </div>
    );
  }

  return (
    <div>
      {renderInternalRecordTitle()}
      {renderFindRecord()}
      {renderTable()}
    </div>
  );
};

export default InternalRecord;
