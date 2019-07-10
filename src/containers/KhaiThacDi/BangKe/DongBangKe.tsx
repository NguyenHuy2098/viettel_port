import * as React from 'react';
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  TabContent,
  TabPane,
  Table,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import classNames from 'classnames';
import { useCallback } from 'react';

// eslint-disable-next-line max-lines-per-function
const DongBangKe: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const [tab, setTab] = useState<number>(1);
  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  const [modalCreateNew, setModalCreateNew] = React.useState<boolean>(false);

  function toggle(): void {
    setModalCreateNew(!modalCreateNew);
  }

  function renderModal(): JSX.Element {
    return (
      <Modal isOpen={modalCreateNew} toggle={toggle} className="sipTitleModalCreateNew">
        <ModalHeader toggle={toggle}>{t('Tạo bảng kê')}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>{t('Bưu cục đến')}</Label>
            <Input type="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>{t('Ghi chú')}</Label>
            <Input type="textarea" placeholder={t('Nhập ghi chú')} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>{t('Ghi lại')}</Button>
        </ModalFooter>
      </Modal>
    );
  }

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Đóng bảng kê')}</h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-trash-o" />
          </Button>
          <div className="sipTitleRightBlockInput">
            <i className="fa fa-search" />
            <Input type="text" placeholder={t('Tra cứu bảng kê')} />
          </div>
          <Button onClick={toggle}>
            <i className="fa fa-plus" />
            {t('Tạo bảng kê')}
          </Button>
          {renderModal()}
        </div>
      </Row>
    );
  }

  function renderPagination(): JSX.Element {
    return (
      <Pagination className="sipPagination">
        <PaginationItem className="sipPaginationPrev pull-left">
          <PaginationLink previous href="#">
            <i className="fa fa-arrow-left" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem className="sipPaginationNext pull-right">
          <PaginationLink next href="#">
            <i className="fa fa-arrow-right" />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }

  function renderAction(): JSX.Element {
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

  function renderTable1(): JSX.Element {
    return (
      <>
        <Table striped hover>
          <thead>
            <tr>
              <th />
              <th>{t('Mã bảng kê')}</th>
              <th>{t('Điểm đến')}</th>
              <th>{t('SL')}</th>
              <th>{t('Người nhập')}</th>
              <th>{t('Ngày nhập')}</th>
              <th>{t('Ghi chú')}</th>
              <th>{t('Quản trị')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">
                <Label check>
                  {/* eslint-disable-next-line react/jsx-max-depth */}
                  <Input type="checkbox" />
                </Label>
              </td>
              <td>BK-2683077-TTKT1</td>
              <td>TTKT1</td>
              <td>25</td>
              <td>Nguyễn Văn An</td>
              <td>19/6/2019</td>
              <td>Hàng giá trị cao</td>
              <td className="SipTableFunctionIcon">{renderAction()}</td>
            </tr>
          </tbody>
        </Table>
        {renderPagination()}
      </>
    );
  }

  function renderTab1(): JSX.Element {
    return (
      <>
        <Row className="sipContentContainer">
          <Col lg={4} xs={12} className="p-0">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('Tìm kiếm bảng kê')} />
            </div>
          </Col>
          <Col>
            <p className="text-right mt-2 mb-0">
              {t('Tổng số')}: <span>56</span>
            </p>
          </Col>
        </Row>
        <div className="mt-3" />
        <Row className="sipTableContainer">{renderTable1()}</Row>
      </>
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
              {t('Bảng kê chưa hoàn thành')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Bưu gửi chưa đóng BK')}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>{renderTab1()}</TabPane>
          <TabPane tabId={2}>
            <h1>Tab 2</h1>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default DongBangKe;
