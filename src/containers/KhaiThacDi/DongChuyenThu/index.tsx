import * as React from 'react';
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
import { useState } from 'react';
import classNames from 'classnames';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeSelectorCountChuyenThuChuaHoanThanh } from 'redux/MIOA_ZTMI047/selectors';
import ChuyenThuChuaHoanThanh from './ChuyenThuChuaHoanThanh';
import TaiKienChuaDongChuyenThu from './TaiKienChuaDongChuyenThu';

// eslint-disable-next-line max-lines-per-function
const DongChuyenThu: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const [tab, setTab] = useState<number>(1);
  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  const [modalCreateNew, setModalCreateNew] = React.useState<boolean>(false);
  const countChuyenThuChuaHoanThanh = useSelector(makeSelectorCountChuyenThuChuaHoanThanh);
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

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Đóng chuyến thư')}</h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-trash-o" />
          </Button>
          <div className="sipTitleRightBlockInput">
            <i className="fa fa-search" />
            <Input type="text" placeholder={t('Tra cứu chuyến thư')} />
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
              {t('CT chưa hoàn thành')}
              <Badge color="primary">{countChuyenThuChuaHoanThanh}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Tải/kiện chưa đóng chuyến thư')}
              <Badge color="primary">03</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <ChuyenThuChuaHoanThanh />
          </TabPane>
          <TabPane tabId={2}>
            <TaiKienChuaDongChuyenThu />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default DongChuyenThu;
