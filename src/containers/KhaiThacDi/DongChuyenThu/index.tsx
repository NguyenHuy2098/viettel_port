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
import { get } from 'lodash';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { push } from 'connected-react-router';
import {
  makeSelectorCountChuyenThuChuaHoanThanh,
  makeSelectorCountBangKeChuaDongTai,
  makeSelectorCountChuyenThuDaDong,
} from 'redux/MIOA_ZTMI047/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import routesMap from 'utils/routesMap';
import ChuyenThuChuaHoanThanh from './ChuyenThuChuaHoanThanh';
import TaiChuaDongChuyenThu from './TaiChuaDongChuyenThu';
import KienChuaDongChuyenThu from './KienChuaDongChuyenThu';
import ChuyenThuDaDong from './ChuyenThuDaDong';

// eslint-disable-next-line max-lines-per-function
const DongChuyenThu: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState<number>(1);
  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  const [modalCreateNew, setModalCreateNew] = React.useState<boolean>(false);
  const countChuyenThuChuaHoanThanh = useSelector(makeSelectorCountChuyenThuChuaHoanThanh);
  const countTaiChuaDong = useSelector(makeSelectorCountBangKeChuaDongTai);
  const countChuyenThuDaDong = useSelector(makeSelectorCountChuyenThuDaDong);
  function toggle(): void {
    setModalCreateNew(!modalCreateNew);
  }
  const [textGhiChu, setTextGhiChu] = React.useState<string>('');
  const [valueBuuCuc, setValueBuuCuc] = React.useState<string>('1');
  function handleChangeText(e: any) {
    setTextGhiChu(e.target.value);
  }
  function handleChangeBuuCuc(e: any) {
    setValueBuuCuc(e.target.value);
  }
  const handleAddChuyenThu = (): ((event: React.MouseEvent) => void) => {
    return (): void => {
      const payload = {
        IV_FLAG: '1',
        IV_TOR_TYPE: 'ZC3',
        IV_TOR_ID_CU: '',
        IV_SLOCATION: 'BHD',
        IV_DLOCATION: valueBuuCuc,
        IV_DESCRIPTION: '',
        EXEC_CONT: textGhiChu,
        T_ITEM: [
          {
            ITEM_ID: '',
            ITEM_TYPE: '',
          },
        ],
      };

      dispatch(
        action_MIOA_ZTMI016(payload, {
          onFinish: (): void => {
            const payload = {
              IV_TOR_ID: '',
              IV_TOR_TYPE: 'ZC3',
              IV_FR_LOC_ID: 'BHD',
              IV_CUST_STATUS: '101',
              IV_TO_LOC_ID: '',
            };
            dispatch(action_MIOA_ZTMI047(payload));
          },
        }),
      );
      setModalCreateNew(!modalCreateNew);
    };
  };

  function renderModal(): JSX.Element {
    return (
      <Modal isOpen={modalCreateNew} toggle={toggle} className="sipTitleModalCreateNew">
        <ModalHeader toggle={toggle}>{t('Tạo chuyến thư')}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>{t('Bưu cục đến')}</Label>
            <Input type="select" value={valueBuuCuc} onChange={handleChangeBuuCuc}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>{t('Ghi chú')}</Label>
            <Input type="textarea" placeholder={t('Nhập ghi chú')} value={textGhiChu} onChange={handleChangeText} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddChuyenThu()}>
            {t('Ghi lại')}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
  const getListChuyenThu = useCallback(
    function(payload = {}): void {
      dispatch(
        action_MIOA_ZTMI047({
          IV_TOR_ID: '',
          IV_TOR_TYPE: 'ZC3',
          IV_FR_LOC_ID: 'BHD',
          IV_CUST_STATUS: '101',
          IV_TO_LOC_ID: '',
          LanguageId: '',
          LanguageDefaultId: '',
          ...payload,
        }),
      );
    },
    [dispatch],
  );

  useEffect((): void => {
    getListChuyenThu();
  }, [getListChuyenThu]);

  function handleSearchChuyenThu(e: any): void {
    const payload = {
      IV_TOR_ID: e.target.value,
      IV_TOR_TYPE: 'ZC3',
      IV_FR_LOC_ID: 'BHD',
      IV_CUST_STATUS: '101',
    };
    const torId = e.target.value;
    if (e.key === 'Enter') {
      dispatch(
        action_MIOA_ZTMI047(payload, {
          onSuccess: (data: any): void => {
            const check = get(data, 'data.MT_ZTMI047_OUT.Row', null);
            if (check) {
              dispatch(push(`${routesMap.DANH_SACH_TAI_KIEN}/${torId}`));
            } else {
              alert(t('Không tìm thấy'));
              getListChuyenThu();
            }
          },
          onFailure: (error: any): void => {
            alert(t('Lỗi!'));
            getListChuyenThu();
          },
        }),
      );
    }
  }

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Đóng chuyến thư')}</h1>
        <div className="sipTitleRightBlock">
          <div className="sipTitleRightBlockInput">
            <i className="fa fa-search" />
            <Input type="text" placeholder={t('Tra cứu chuyến thư')} onKeyDown={handleSearchChuyenThu} />
          </div>
          <Button onClick={toggle}>
            <i className="fa fa-plus" />
            {t('Tạo chuyến thư')}
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
              {t('Tải chưa đóng chuyến thư')}
              <Badge color="primary">{countTaiChuaDong}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 3 })}
              onClick={useCallback((): void => handleChangeTab(3), [])}
            >
              {t('Kiện chưa đóng chuyến thư')}
              <Badge color="primary">03</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 4 })}
              onClick={useCallback((): void => handleChangeTab(4), [])}
            >
              {t('Chuyến Thư đã đóng')}
              <Badge color="primary">{countChuyenThuDaDong}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <ChuyenThuChuaHoanThanh />
          </TabPane>
          <TabPane tabId={2}>
            <TaiChuaDongChuyenThu />
          </TabPane>
          <TabPane tabId={3}>
            <KienChuaDongChuyenThu />
          </TabPane>
          <TabPane tabId={4}>
            <ChuyenThuDaDong />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default DongChuyenThu;
