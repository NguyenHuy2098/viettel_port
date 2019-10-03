/* eslint-disable max-lines */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Badge,
  Button,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Col,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Cell } from 'react-table';
import classNames from 'classnames';
import { goBack } from 'connected-react-router';
import { Location } from 'history';
import { get, size, forEach, map } from 'lodash';

import CreateForwardingItemModal from 'components/CreateForwardingItemModal';
import DataTable from 'components/DataTable';
import SelectForwardingItemModal from 'components/SelectForwardingItemModal';
import { actionDongBangKe } from 'redux/common/actions';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { action_ZTMI241 } from 'redux/ZTMI241/actions';
import { select_ZTMI241 } from 'redux/ZTMI241/selectors';
import { AppStateType } from 'redux/store';
import { SipDataState, SipDataType } from 'utils/enums';

interface Props {
  location: Location;
}

const forwardingItemList: ForwardingItem[] = [];

// eslint-disable-next-line max-lines-per-function
function ChiTietBuuGuiChuaDongBangKe(props: Props): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tab] = useState(1);
  const childs = get(props, 'location.state.child', []);
  const [selectForwardingItemModal, setSelectForwardingItemModal] = useState<boolean>(false);
  const [forwardingItemListState, setForwardingItemListState] = useState<ForwardingItem[]>([]);
  const [uncheckAllForwardingItemCheckbox, setUncheckAllForwardingItemCheckbox] = useState<boolean | undefined>(
    undefined,
  );
  const des = get(props, 'location.state.des', '');
  const commLocGroup = get(props, 'location.state.COMM_LOC_GROUP', '');

  const dispatchZTMI241 = useCallback((): void => {
    const payload = {
      IV_PACKAGE_ID: '',
      IV_FREIGHT_UNIT_STATUS: [306],
      IV_LOC_ID: 'BDH',
      IV_COMMODITY_GROUP: commLocGroup,
      // IV_DATE: moment().format('YYYYMMDD'),
      IV_DATE: '20191002',
      IV_USER: get(childs, '[0].USER', ''),
      IV_PAGE_NO: '1',
      IV_NO_PER_PAGE: '10',
    };
    dispatch(action_ZTMI241(payload));
  }, [commLocGroup, childs, dispatch]);

  useEffect((): void => {
    dispatchZTMI241();
  }, [dispatchZTMI241]);

  const data = useSelector(select_ZTMI241);

  const dataRow = get(data, 'Row', []);

  function handleSelectBangKeItem(event: React.FormEvent<HTMLInputElement>): void {
    event.stopPropagation();
    const value = event.currentTarget.value;
    setUncheckAllForwardingItemCheckbox(undefined);
    if (event.currentTarget.checked) {
      forwardingItemList.push({ ITEM_ID: value, ITEM_TYPE: '' });
    } else {
      forEach(forwardingItemList, (item: ForwardingItem, index: number): void => {
        if (get(item, 'ITEM_ID') === value) {
          forwardingItemList.splice(index, 1);
        }
      });
    }
    setForwardingItemListState([...forwardingItemList]);
  }

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'FREIGHT_UNIT',
        accessor: 'FREIGHT_UNIT',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <Label check>
              <Input
                defaultChecked={uncheckAllForwardingItemCheckbox}
                type="checkbox"
                value={get(row, 'values.FREIGHT_UNIT', '')}
                onClick={handleSelectBangKeItem}
              />
            </Label>
          );
        },
      },
      {
        Header: t('Mã phiếu gửi'),
        accessor: 'PACKAGE_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'MANIFEST_LOC',
      },
      {
        Header: t('Số lượng'),
        accessor: 'QUANTITY',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GROSS_WEIGHT',
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI241OUT>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-pencil fa-lg color-blue" />
              </Button>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-trash-o fa-lg color-red" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uncheckAllForwardingItemCheckbox],
  );

  function toggleSelectForwardingItemModal(): void {
    setSelectForwardingItemModal(!selectForwardingItemModal);
  }

  function handleChuyenVaoBangKe(): void {
    if (size(forwardingItemListState) > 0) {
      toggleSelectForwardingItemModal();
    } else {
      alert(t('Vui lòng chọn phiếu gửi!'));
    }
  }

  function onSuccessSelectedForwardingItem(): void {
    dispatchZTMI241();
    setUncheckAllForwardingItemCheckbox(false);
    setForwardingItemListState([]);
  }

  function renderSearch(): JSX.Element {
    return (
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('Tìm kiếm phiếu gửi')} />
            </div>
            <Button color="primary" className="ml-2">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Đã chọn')}: <span className="color-primary">02/03</span>
          </p>
        </Col>
      </Row>
    );
  }

  const [createForwardingItemModal, setCreateForwardingItemModal] = useState<boolean>(false);
  function toggleCreateForwardingItemModal(): void {
    setCreateForwardingItemModal(!createForwardingItemModal);
  }

  const getListBangKe = useCallback(
    function(): void {
      // console.log(1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const getListDiemDen = (): void => {
    dispatch(
      action_MIOA_ZTMI045({
        row: [
          {
            IV_LOCTYPE: 'V001, V004',
          },
        ],
        IV_BP: '',
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '5000',
      }),
    );
  };
  useEffect((): void => {
    getListDiemDen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = (): void => {
    dispatch(goBack());
  };

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <button className="sipTitleBtnBack btn btn-secondary" onClick={handleBack}>
            <i className="fa fa-arrow-left backIcon" />
          </button>
          {t('Thư - Nhanh')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button onClick={handleChuyenVaoBangKe}>
            <i className="fa fa-file-excel-o" />
            {t('Chuyển bảng kê')}
          </Button>
          <Button onClick={toggleCreateForwardingItemModal}>
            <i className="fa fa-file-archive-o" />
            {t('Tạo bảng kê')}
            <CreateForwardingItemModal
              onSuccessCreated={getListBangKe}
              visible={createForwardingItemModal}
              onHide={toggleCreateForwardingItemModal}
              modalTitle={t('Tạo bảng kê')}
              IV_TOR_TYPE="ZC1"
            />
          </Button>
          <DongBangKe forwardingItemListState={forwardingItemListState} des={des} />
          <Button>
            <i className="fa fa-download" />
            {t('Đóng tải')}
          </Button>
        </div>
      </Row>
      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          {childs.length > 0 &&
            childs.map((child: API.RowMTZTMI241OUT) => {
              return (
                <NavItem key={child.USER}>
                  <NavLink className={classNames({ active: tab === 1 })}>
                    {child.USER}
                    <Badge color="primary">01</Badge>
                  </NavLink>
                </NavItem>
              );
            })}
        </Nav>
        <TabContent className="sipFlatContainer">
          <TabPane>
            {renderSearch()}
            <Row className="sipTableContainer">
              <DataTable columns={columns} data={dataRow ? dataRow : []} />
            </Row>
          </TabPane>
        </TabContent>
        <SelectForwardingItemModal
          onSuccessSelected={onSuccessSelectedForwardingItem}
          visible={selectForwardingItemModal}
          onHide={toggleSelectForwardingItemModal}
          modalTitle={t('Chọn bảng kê')}
          forwardingItemList={forwardingItemListState}
          IV_TOR_TYPE={SipDataType.BANG_KE}
          IV_TO_LOC_ID=""
          IV_CUST_STATUS={SipDataState.TAO_MOI}
          isFrom2
        />
      </div>
    </>
  );
}

interface ForwardingItem {
  ITEM_ID: string;
  ITEM_TYPE?: string;
}

interface DongBangKeProps {
  forwardingItemListState: ForwardingItem[];
  des: string;
}

// eslint-disable-next-line max-lines-per-function
function DongBangKe(props: DongBangKeProps): JSX.Element {
  const forwardingItemListState = props.forwardingItemListState;
  const [tab, setTab] = useState<number>(1);
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const des = props.des;

  function toggle(): void {
    setIsOpen(!isOpen);
  }

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  const [ganBangKeVaoTai, setGanBangKeVaoTai] = useState<boolean>(false);
  function handleGanBangKeVaoTai(): void {
    setGanBangKeVaoTai(true);
  }

  return (
    <>
      <Button onClick={toggle}>
        <i className="fa fa-download" />
        {t('Đóng bảng kê')}
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{t('Gán bảng kê vào tải')}</ModalHeader>
        <ModalBody>
          <div className="sipTabContainer sipFlatContainer ganBangKeVaoTaiPopUp">
            <Nav tabs>
              <NavItem>
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <NavLink
                  onClick={React.useCallback((): void => handleChangeTab(1), [])}
                  className={classNames({ active: tab === 1 })}
                >
                  {t('Chọn tải')}
                </NavLink>
              </NavItem>
              <NavItem>
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <NavLink
                  onClick={React.useCallback((): void => handleChangeTab(2), [])}
                  className={classNames({ active: tab === 2 })}
                >
                  {t('Tạo tải mới')}
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <TabContent activeTab={tab} className="sipFlatContainer sipSelectForwardingItemContainer pl-1 pr-3">
            <TabContent activeTab={tab} className="sipFlatContainer">
              <TabPane tabId={1}>
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <ChonTai
                  ganBangKeVaoTai={ganBangKeVaoTai}
                  setGanBangKeVaoTai={setGanBangKeVaoTai}
                  forwardingItemListState={forwardingItemListState}
                  des={des}
                />
              </TabPane>
              <TabPane tabId={2}>
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <TaoTai />
              </TabPane>
            </TabContent>
          </TabContent>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleGanBangKeVaoTai}>
            {t('Hoàn tất')}
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </>
  );
}

function TaoTai(): JSX.Element {
  return <>tao tai moi</>;
}

interface ChonTaiProps {
  ganBangKeVaoTai: boolean;
  setGanBangKeVaoTai: Function;
  forwardingItemListState: ForwardingItem[];
  des: string;
}

// eslint-disable-next-line max-lines-per-function
function ChonTai(props: ChonTaiProps): JSX.Element {
  const dispatch = useDispatch();
  const ganBangKeVaoTai = props.ganBangKeVaoTai;
  const setGanBangKeVaoTai = props.setGanBangKeVaoTai;
  const des = props.des;
  const forwardingItemListState = props.forwardingItemListState;

  React.useEffect((): void => {
    const payload = {
      IV_TOR_ID: '',
      IV_FR_DATE: '20190510',
      IV_TO_DATE: '20190917',
      IV_TOR_TYPE: SipDataType.TAI,
      IV_FR_LOC_ID: 'BDH',
      IV_TO_LOC_ID: '',
      IV_CUST_STATUS: '101',
      IV_PAGENO: '1',
      IV_NO_PER_PAGE: '5000',
    };
    dispatch(action_MIOA_ZTMI047(payload));
  }, [dispatch]);

  const data = useSelector(
    (state: AppStateType) => get(state, 'MIOA_ZTMI047.ZC2.101.MT_ZTMI047_OUT.Row', []),
    shallowEqual,
  );

  const [itemSelect, setItemSelect] = useState<API.RowMTZTMI047OUT | null>(null);

  function handleSelectItem(itemSelect: API.RowMTZTMI047OUT): void {
    setItemSelect(itemSelect);
  }

  const reset = useCallback(
    function reset(): void {
      setItemSelect(null);
      setGanBangKeVaoTai(false);
    },
    [setGanBangKeVaoTai, setItemSelect],
  );

  useEffect((): void => {
    if (!ganBangKeVaoTai || !itemSelect) return;
    const data = {
      forwardingItemListState: forwardingItemListState,
      itemSelect: itemSelect,
      des: des,
    };
    dispatch(
      actionDongBangKe(data, {
        onFinish: (): void => {
          reset();
        },
      }),
    );
  }, [ganBangKeVaoTai, itemSelect, dispatch, des, forwardingItemListState, reset]);

  return (
    <>
      {map(data, (item: API.RowMTZTMI047OUT) => {
        return (
          <Label key={item.TOR_ID} check className="selectForwardingItem row">
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Input type="radio" name="selectForwardingItem" onClick={(): void => handleSelectItem(item)} />
            <p>
              <span>{item.TOR_ID}</span>
              <span>{item.CREATED_BY}</span>
            </p>
            <span>
              <span>SL:{item.ITEM_NO}</span>
              <span style={{ background: 'darkgray', padding: '0px 4px 0px 4px', borderRadius: '4px' }}>
                {item.LOG_LOCID_TO}
              </span>
            </span>
          </Label>
        );
      })}
    </>
  );
}

export default ChiTietBuuGuiChuaDongBangKe;
