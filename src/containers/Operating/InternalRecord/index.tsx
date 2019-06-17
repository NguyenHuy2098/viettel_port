import * as React from 'react';
import { useState } from 'react';
import {
  Button,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Nav,
  NavLink,
  NavItem,
  Row,
  Table,
  TabContent,
  TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const InternalRecord: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [isOpenDropdown, setOpenDropdown] = useState<boolean>(false);
  const [isTab, setTab] = useState<string>('1');
  const handleClickDropdown = (preIsOpenDropdown: boolean) => {
    setOpenDropdown(!preIsOpenDropdown);
  };
  const handleClickTab = (value: string) => (event: React.MouseEvent<HTMLButtonElement>): void => {
    setTab(value);
  };

  function openDropdown() {
    handleClickDropdown(isOpenDropdown);
  }

  function renderDropdown(): JSX.Element {
    return (
      <>
        <Dropdown isOpen={isOpenDropdown} toggle={openDropdown}>
          <DropdownToggle caret />
          <DropdownMenu>
            <DropdownItem>Foo Action</DropdownItem>
            <DropdownItem>Bar Action</DropdownItem>
            <DropdownItem>Quo Action</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </>
    );
  }

  function renderInput(): JSX.Element {
    return (
      <Col xs="6" sm="4" className="inputStyle">
        <Input type="text" />
      </Col>
    );
  }

  function renderFindRecordContent(): JSX.Element {
    return (
      <>
        <div className="findRecordTitle">
          <Button>{t('Nghiêm trọng')}</Button>
          <Button>{t('Kết luận sai')}</Button>
          <Button>{t('Đã hoàn thành')}</Button>
          <Button>{t('Mới lập')}</Button>
        </div>
        <Row className="findRecordContent">
          <Col xs="6" sm="4">
            <Row className="findRecordContentDetail">
              <Col xs="4">{t('Từ ngày')}: </Col>
              <Col xs="8" className="dropdownStyle">
                {renderDropdown()}
              </Col>
            </Row>
            <Row className="findRecordContentDetail">
              <Col xs="4">{t('Bưu cục lập')}: </Col>
              <Col xs="8">{renderInput()}</Col>
            </Row>
          </Col>
          <Col xs="6" sm="4">
            <Row className="findRecordContentDetail">
              <Col xs="5">{t('Đến ngày')}: </Col>
              <Col xs="7" className="dropdownStyle">
                {renderDropdown()}
              </Col>
            </Row>
            <Row className="findRecordContentDetail">
              <Col xs="5">{t('Bưu cục bị lập')}: </Col>
              <Col xs="7">{renderInput()}</Col>
            </Row>
          </Col>
          <Col sm="4" className="searchButton">
            <div className="findRecordTitle">
              <Button>{t('Tìm kiếm')}</Button>
            </div>
          </Col>
        </Row>
        <Row className="totalRecord">{t('Tổng số')}: 1</Row>
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

  function renderInternalRecordTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Biên bản sai sót nghiệp vụ')}</h1>
      </Row>
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

  function renderFindRecord(): JSX.Element {
    return (
      <div className="sipShippingInformationAndScanCode">
        <div className="sipTabContainer">
          <Nav tabs>
            <NavItem>
              <NavLink className={classnames({ active: isTab === '1' })} onClick={handleClickTab('1')}>
                {t('Biên bản bị lập')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: isTab === '2' })} onClick={handleClickTab('2')}>
                {t('Biên bản đã lập')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: isTab === '3' })} onClick={handleClickTab('3')}>
                {t('Kết luận biên bản')}
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={isTab}>
            <TabPane tabId="1">{renderFindRecordContent()}</TabPane>
            <TabPane tabId="2">{renderFindRecordContent()}</TabPane>
            <TabPane tabId="3">{renderFindRecordContent()}</TabPane>
          </TabContent>
        </div>
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
