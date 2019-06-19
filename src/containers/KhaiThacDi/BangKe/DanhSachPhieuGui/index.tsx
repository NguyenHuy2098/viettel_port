import * as React from 'react';
import { useState, useCallback } from 'react';
import { Button, Col, Input, Nav, NavLink, NavItem, Row, Table, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGui: React.FC = (): JSX.Element => {
  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button>
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
      <Row>
        <Col lg="5">Line: 02 - Nội vùng - Thái Bình - Nam Định</Col>
        <Col lg="5">Dịch vụ: Thư - Hoả tốc</Col>
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

  function renderAction(): JSX.Element {
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

  function renderTable(): JSX.Element {
    return (
      <Row className="sipTableContainer">
        <Table striped hover>
          <thead>
            <tr>
              <th>Số vận đơn</th>
              <th>Bưu cục đến</th>
              <th>Số lượng</th>
              <th>Trọng lượng</th>
              <th>Ngày gửi</th>
              <th>Quản trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>41100035876</td>
              <td>BNE</td>
              <td>2</td>
              <td>250 g</td>
              <td>19/6/2019</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
            <tr>
              <td>41100035876</td>
              <td>BNE</td>
              <td>2</td>
              <td>250 g</td>
              <td>19/6/2019</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
            <tr>
              <td>41100035876</td>
              <td>BNE</td>
              <td>2</td>
              <td>250 g</td>
              <td>19/6/2019</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    );
  }

  const [tab, setTab] = useState<number>(1);
  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

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
          <TabPane tabId={1}>{renderTable()}</TabPane>
          <TabPane tabId={2}>
            {renderTable()}
            {renderTable()}
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};
export default DanhSachPhieuGui;
