import React, { useState } from 'react';
import {
  Badge,
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { makeSelectorCountBangKeChuaHoanThanh } from 'redux/MIOA_ZTMI047/selectors';
import BangKeChuaHoanThanh from './BangKeChuaHoanThanh';
import BuuGuiChuaDongBangKe from './BuuGuiChuaDongBangKe';
import BangKeDaDong from './BangKeDaDong';

// eslint-disable-next-line max-lines-per-function
const TaoBangKe: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const [modalCreateNew, setModalCreateNew] = useState<boolean>(false);

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
          <Button color="primary" onClick={toggle}>
            {t('Ghi lại')}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <>
      <Button onClick={toggle}>
        <i className="fa fa-plus" />
        {t('Tạo bảng kê')}
      </Button>
      {renderModal()}
    </>
  );
};

// eslint-disable-next-line max-lines-per-function
const DongBangKe: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const [tab, setTab] = useState<number>(1);
  const countBangKeChuaHoanThanh = useSelector(makeSelectorCountBangKeChuaHoanThanh);

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Đóng bảng kê')}</h1>
        <div className="sipTitleRightBlock">
          <div className="sipTitleRightBlockInput">
            <i className="fa fa-search" />
            <Input type="text" placeholder={t('Tra cứu bảng kê')} />
          </div>
          <TaoBangKe />
        </div>
      </Row>
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
              onClick={React.useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Bảng kê chưa hoàn thành')}
              <Badge color="primary">{countBangKeChuaHoanThanh}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={React.useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Bưu gửi chưa đóng BK')}
              <Badge color="primary">03</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
              onClick={React.useCallback((): void => handleChangeTab(3), [])}
            >
              {t('Bảng Kê đã đóng')}
              <Badge color="primary">03</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <BangKeChuaHoanThanh />
          </TabPane>
          <TabPane tabId={2}>
            <BuuGuiChuaDongBangKe />
          </TabPane>
          <TabPane tabId={3}>
            <BangKeDaDong />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default DongBangKe;
