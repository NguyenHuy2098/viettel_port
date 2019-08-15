import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
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
import classNames from 'classnames';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import {
  makeSelectorCountTaiChuaHoanThanh,
  makeSelectorCountBangKeChuaDongTai,
  makeSelectorCountTaiDaDong,
} from 'redux/MIOA_ZTMI047/selectors';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import BuuGuiChuaDongTai from './BuuGuiChuaDongTai';
import TaiChuaHoanThanh from './TaiChuaHoanThanh';
import BangKeChuaDongTai from './BangKeChuaDongTai';
import TaiDaDong from './TaiDaDong';

// eslint-disable-next-line max-lines-per-function
const DongTai: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [modalCreateNew, setModalCreateNew] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(1);
  const countTaiChuaHoanThanh = useSelector(makeSelectorCountTaiChuaHoanThanh);
  const countBangKeBuuGuiChuaDongTai = useSelector(makeSelectorCountBangKeChuaDongTai);
  const countTaiDaDong = useSelector(makeSelectorCountTaiDaDong);

  useEffect((): void => {
    const payload = {
      IV_TOR_ID: '',
      IV_TOR_TYPE: 'ZC2',
      IV_FR_LOC_ID: 'BDH',
      IV_CUST_STATUS: '101',
    };
    dispatch(
      action_MIOA_ZTMI047(payload, {
        onFailure: (error: HttpRequestErrorType): void => {
          console.log(error.messages);
        },
      }),
    );
  }, [dispatch]);

  useEffect((): void => {
    const payload = {
      IV_TOR_ID: '',
      IV_TOR_TYPE: 'ZC1',
      IV_FR_LOC_ID: 'BDH',
      IV_CUST_STATUS: '101',
    };
    dispatch(
      action_MIOA_ZTMI047(payload, {
        onFailure: (error: HttpRequestErrorType): void => {
          console.log(error.messages);
        },
      }),
    );
  }, [dispatch]);

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  function toggleModal(): void {
    setModalCreateNew(!modalCreateNew);
  }

  function renderModal(): JSX.Element {
    return (
      <Modal isOpen={modalCreateNew} toggle={toggleModal} className="sipTitleModalCreateNew">
        <ModalHeader toggle={toggleModal}>{t('Tạo tải')}</ModalHeader>
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
          <Button color="primary" onClick={toggleModal}>
            {t('Ghi lại')}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Đóng tải')}</h1>
        <div className="sipTitleRightBlock">
          <div className="sipTitleRightBlockInput">
            <i className="fa fa-search" />
            <Input type="text" placeholder={t('Tra cứu tải')} />
          </div>
          <Button onClick={toggleModal}>
            <i className="fa fa-plus" />
            {t('Tạo tải')}
          </Button>
          {renderModal()}
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
              {t('Tải chưa hoàn thành')}
              <Badge color="primary">{countTaiChuaHoanThanh}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={React.useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Bưu gửi chưa đóng tải')}
              <Badge color="primary">{countBangKeBuuGuiChuaDongTai}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
              onClick={React.useCallback((): void => handleChangeTab(3), [])}
            >
              {t('Bảng kê chưa đóng tải')}
              <Badge color="primary">{countBangKeBuuGuiChuaDongTai}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 4 })}
              onClick={React.useCallback((): void => handleChangeTab(4), [])}
            >
              {t('Tải đã đóng')}
              <Badge color="primary">{countTaiDaDong}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <TaiChuaHoanThanh />
          </TabPane>
          <TabPane tabId={2}>
            <BuuGuiChuaDongTai />
          </TabPane>
          <TabPane tabId={3}>
            <BangKeChuaDongTai />
          </TabPane>
          <TabPane tabId={4}>
            <TaiDaDong />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default DongTai;
