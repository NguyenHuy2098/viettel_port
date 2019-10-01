import React from 'react';
import { useState } from 'react';
import { Button, Col, Input, Nav, NavLink, NavItem, Row, Table, TabContent, TabPane } from 'reactstrap';
import ExportExcel from 'utils/exportExcel';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import ModalAddNew from './ModalAddNew';

// eslint-disable-next-line max-lines-per-function
const ComplainCustomer: React.FC = (): JSX.Element => {
  const [modalCreateNew, setModalCreateNew] = React.useState<boolean>(false);
  const { t } = useTranslation();

  function toggle(): void {
    setModalCreateNew(!modalCreateNew);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleData(workbook: any): void {
    workbook
      .sheet('Sheet1')
      .cell('A1')
      .value('This is neat!');
  }

  const renderTopController = (): React.ReactElement => (
    <>
      <Button className="ml-2" color="primary" onClick={toggle}>
        <i className="fa fa-plus mr-2" />
        {t('Thêm mới')}
      </Button>
      <Button className="ml-2" color="primary">
        <ExportExcel handleData={handleData}>
          <i className="fa fa-share-square mr-2" />
          {t('Xuất báo cáo')}
        </ExportExcel>
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

  function renderFindRecordContent(): JSX.Element {
    return (
      <>
        <Row className="pt-3 pr-3 pl-3 pb-1">
          <Col xl={3} md={5} xs={12} className="mb-2">
            <Input type="select">
              <option>Chọn mức độ</option>
              <option>1</option>
              <option>2</option>
            </Input>
          </Col>
          <Col xl={3} md={5} xs={12} className="mb-2">
            <Input type="select">
              <option>Chọn trạng thái</option>
              <option>1</option>
              <option>2</option>
            </Input>
          </Col>
          <Col md={2} xs={12} className="mb-2">
            <Button color="primary">Quét mã</Button>
          </Col>
        </Row>
      </>
    );
  }

  function renderInformationTable(): JSX.Element {
    return (
      <>
        <div className="mb-3 sipInformationTable">
          <h6>Ngày tạo</h6>
          11:12 ∙ 19/05/2019
        </div>
        <div className="mb-3 sipInformationTable">
          <h6>Mã khiếu nại </h6>
          TN2_PCNT_11356
        </div>
      </>
    );
  }

  function renderContentTable(): JSX.Element {
    return (
      <div className="sipInformationTable">
        <div>{t('Mã phiếu gửi')}: 123658698</div>
        <div>{t('Loại khiếu nại')}: Yêu cầu khác</div>
        <div>{t('Mức độ')}: Hot</div>
        <div>{t('Nội dung')}: Khách hàng có 3 đơn gạch thành công nhưng chư có đối soát.</div>
        <div>{t('Tài khoản')}: 0834924555</div>
        <div>{t('Pass')}: dunghip</div>
      </div>
    );
  }

  function renderTransactionLocationTable(): JSX.Element {
    return (
      <div className="sipInformationTable">
        <div>{t('Đơn vị')}: PCC</div>
        <div>{t('Trạng thái')}: Hoàn thành</div>
        <div>{t('Kết quả')}: Khách hàng thao tác lại</div>
      </div>
    );
  }

  function renderAction(): JSX.Element {
    return (
      <Button>
        <i className="fa fa-check-square fa-lg color-green" />
      </Button>
    );
  }

  function renderTable(): JSX.Element {
    return (
      <div className="sipTableContainer">
        <Table bordered hover>
          <thead className="text-center">
            <tr>
              <th>{t('Thông tin')}</th>
              <th>{t('Nội dung')}</th>
              <th>{t('Điểm GĐ')}</th>
              <th>{t('Quản trị')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{renderInformationTable()}</td>
              <td>{renderContentTable()}</td>
              <td>{renderTransactionLocationTable()}</td>
              <td className="text-center SipTableFunctionIcon">{renderAction()}</td>
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
              {t('Khiếu nại CSKH')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: tab === 2 })} onClick={handleChangeTab} value={2}>
              {t('Khiếu nại bưu cục')}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab}>
          <TabPane tabId={1}>
            {renderFindRecordContent()}
            {renderTable()}
          </TabPane>
          <TabPane tabId={2}>{2}</TabPane>
        </TabContent>
      </div>
    );
  }

  return (
    <div>
      {renderInternalRecordTitle()}
      {renderFindRecord()}
      <ModalAddNew modalCreateNew={modalCreateNew} toggle={toggle} />
    </div>
  );
};

export default ComplainCustomer;
