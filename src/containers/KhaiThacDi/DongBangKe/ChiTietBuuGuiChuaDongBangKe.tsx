/* eslint-disable max-lines */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Badge, Button, Col, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { goBack } from 'connected-react-router';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { forEach, get, size, toString } from 'lodash';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_ZTMI241 } from 'redux/ZTMI241/actions';
import DataTable from 'components/DataTable';
import { Cell } from 'react-table';
import { select_ZTMI241 } from 'redux/ZTMI241/selectors';
import { Location } from 'history';
import SelectForwardingItemModal from 'components/Modal/ModalChuyenVao';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { AppStateType } from 'redux/store';
import {
  actionDongBangKeVaoTaiMoiTao,
  actionDongBanKeVaoTaiCoSan,
  actionDongTaiVaoChuyenThuCoSan,
  actionDongTaiVaoChuyenThuTaoMoi,
} from 'redux/common/actions';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import ModalTwoTab from 'components/DanhSachPhieuGuiTrongBangKe/ModalTwoTab';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import { today } from 'utils/timeHelper';

interface Props {
  location: Location;
}

interface ChildType {
  NO_ITEM: string;
  USER: string;
}

const forwardingItemList: ForwardingItem[] = [];

// eslint-disable-next-line max-lines-per-function
function ChiTietBuuGuiChuaDongBangKe(props: Props): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const childs = get(props, 'location.state.child', []);
  const [selectForwardingItemModal, setSelectForwardingItemModal] = useState<boolean>(false);
  const [forwardingItemListState, setForwardingItemListState] = useState<ForwardingItem[]>([]);
  const [uncheckAllForwardingItemCheckbox, setUncheckAllForwardingItemCheckbox] = useState<boolean | undefined>(
    undefined,
  );
  const [showPopUpDongBangKe, setShowPopUpDongBangKe] = useState<boolean>(false);
  const [showPopUpDongTai, setShowPopupDongTai] = useState<boolean>(false);
  const [selectedTai, setSelectedTai] = useState<API.RowMTZTMI047OUT | undefined>(undefined);
  const [selectedChuyenThu, setSelectedChuyenThu] = useState<API.RowMTZTMI047OUT | undefined>(undefined);
  const userMaBp = useSelector(makeSelectorMaBP);
  const des = get(props, 'location.state.des', '');
  const commLocGroup = get(props, 'location.state.COMM_LOC_GROUP', '');

  const listTaiCoSan = useSelector(
    (state: AppStateType) => get(state, 'MIOA_ZTMI047.ZC2.101.MT_ZTMI047_OUT.Row', []),
    shallowEqual,
  );
  const listChuyenThuCoSan = useSelector(makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.TAO_MOI));

  const reset = (): void => {
    setForwardingItemListState([]);
    setUncheckAllForwardingItemCheckbox(false);
    setSelectedChuyenThu(undefined);
    setSelectedTai(undefined);
    dispatchZTMI241();
  };

  const getListTaiCoSan = (): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.TAI,
          IV_CUST_STATUS: SipDataState.TAO_MOI,
          IV_NO_PER_PAGE: '5000',
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DI },
      ),
    );
  };

  const getListChuyenThuCoSan = (): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_CUST_STATUS: SipDataState.TAO_MOI,
          IV_NO_PER_PAGE: '5000',
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DI },
      ),
    );
  };

  useEffect((): void => {
    getListTaiCoSan();
    getListChuyenThuCoSan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatchZTMI241 = useCallback((): void => {
    const payload = {
      IV_PACKAGE_ID: '',
      IV_FREIGHT_UNIT_STATUS: [toString(SipDataState.NHAN_TAI_BUU_CUC_GOC)],
      IV_LOC_ID: userMaBp,
      IV_COMMODITY_GROUP: commLocGroup,
      IV_DATE: today,
      IV_USER: get(childs, '[0].USER', ''),
      IV_PAGE_NO: '1',
      IV_NO_PER_PAGE: '10',
    };
    dispatch(action_ZTMI241(payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commLocGroup, childs]);

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
        Header: t('Mã bưu gửi'),
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
      // {
      //   Header: t('Quản trị'),
      //   Cell: ({ row }: Cell<API.RowMTZTMI241OUT>): JSX.Element => {
      //     return (
      //       <>
      //         <Button className="SipTableFunctionIcon">
      //           <img src={'../../assets/img/icon/iconPencil.svg'} alt="VTPostek" />
      //         </Button>
      //         <Button className="SipTableFunctionIcon">
      //           <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
      //         </Button>
      //       </>
      //     );
      //   },
      // },
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

  const [search, setSearch] = useState<string>('');

  function handleChangeSearch(e: { target: { value: string } }): void {
    setSearch(e.target.value);
  }

  function handleSearch(): void {
    const payload = {
      IV_PACKAGE_ID: search,
      IV_FREIGHT_UNIT_STATUS: [toString(SipDataState.NHAN_TAI_BUU_CUC_GOC)],
      IV_LOC_ID: userMaBp,
      IV_COMMODITY_GROUP: commLocGroup,
      IV_DATE: today,
      IV_USER: get(childs, '[0].USER', ''),
      IV_PAGE_NO: '1',
      IV_NO_PER_PAGE: '10',
    };
    dispatch(action_ZTMI241(payload));
  }

  function renderSearch(): JSX.Element {
    return (
      <Row className="sipContentContainer">
        <Col lg={6} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('Tìm kiếm phiếu gửi')} value={search} onChange={handleChangeSearch} />
            </div>
            <Button color="primary" className="ml-2" onClick={handleSearch}>
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Đã chọn')}:{' '}
            <span className="color-primary">
              {size(forwardingItemListState)}/{size(dataRow)}
            </span>
          </p>
        </Col>
      </Row>
    );
  }

  // const [createForwardingItemModal, setCreateForwardingItemModal] = useState<boolean>(false);

  // function toggleCreateForwardingItemModal(): void {
  //   setCreateForwardingItemModal(!createForwardingItemModal);
  // }

  // const getListBangKe = useCallback(
  //   function(): void {
  //     // console.log(1);
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [],
  // );

  const getListDiemDen = (): void => {
    dispatch(
      action_MIOA_ZTMI045({
        row: [
          {
            IV_LOCTYPE: 'V001',
          },
          { IV_LOCTYPE: 'V004' },
        ],
        IV_BP: '',
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '200',
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

  const handleHidePopupDongBangKe = (): void => {
    setShowPopUpDongBangKe(false);
  };

  const saveSelectedTai = (tai: API.RowMTZTMI047OUT | undefined): void => {
    setSelectedTai(tai);
  };
  const handleShowPopupDongBangKe = (): void => {
    setShowPopUpDongBangKe(true);
  };
  const dongBangKeVaoTaiCoSan = (): void => {
    dispatch(
      actionDongBanKeVaoTaiCoSan(
        { selectedTai, des, forwardingItemListState },
        {
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            toast(
              <>
                <i className="fa check mr-2" />
                {get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE')}
              </>,
              {
                type: 'success',
              },
            );
            reset();
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
              </>,
              {
                type: 'error',
              },
            );
          },
          onFinish: (): void => {
            handleHidePopupDongBangKe();
          },
        },
      ),
    );
  };
  const dongBangKeVaoTaiMoiTao = (locNo: string, description: string): void => {
    dispatch(
      actionDongBangKeVaoTaiMoiTao(
        { locNo, description, forwardingItemListState, des },
        {
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            toast(
              <>
                <i className="fa check mr-2" />
                {get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE')}
              </>,
              {
                type: 'success',
              },
            );
            reset();
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
              </>,
              {
                type: 'error',
              },
            );
          },
          onFinish: (): void => {
            handleHidePopupDongBangKe();
          },
        },
      ),
    );
  };

  const handleHidePopupDongTai = (): void => {
    setShowPopupDongTai(false);
  };

  const handleShowPopupDongTai = (): void => {
    setShowPopupDongTai(true);
  };

  const saveSelectedChuyenThu = (chuyenThu: API.RowMTZTMI047OUT | undefined): void => {
    setSelectedChuyenThu(chuyenThu);
  };

  const dongTaiVaoChuyenThuCoSan = (): void => {
    dispatch(
      actionDongTaiVaoChuyenThuCoSan(
        { selectedChuyenThu, forwardingItemListState, des },
        {
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            toast(
              <>
                <i className="fa check mr-2" />
                {get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE')}
              </>,
              {
                type: 'success',
              },
            );
            reset();
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
              </>,
              {
                type: 'error',
              },
            );
          },
        },
      ),
    );
    handleHidePopupDongTai();
  };

  const dongTaiVaoChuyenThuTaoMoi = (locNo: string, description: string): void => {
    dispatch(
      actionDongTaiVaoChuyenThuTaoMoi(
        { locNo, description, forwardingItemListState, des },
        {
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            toast(
              <>
                <i className="fa check mr-2" />
                {get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE')}
              </>,
              {
                type: 'success',
              },
            );
            reset();
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', 'Đã có lỗi xảy ra')}
              </>,
              {
                type: 'error',
              },
            );
          },
        },
      ),
    );
    handleHidePopupDongTai();
  };

  function handleChangeTab(index: number): void {
    setTab(index);
  }

  React.useEffect(() => {
    try {
      const user = childs[tab].USER;
      const payload = {
        IV_PACKAGE_ID: search,
        IV_FREIGHT_UNIT_STATUS: [toString(SipDataState.NHAN_TAI_BUU_CUC_GOC)],
        IV_LOC_ID: userMaBp,
        IV_COMMODITY_GROUP: commLocGroup,
        IV_DATE: today,
        IV_USER: user,
        IV_PAGE_NO: '1',
        IV_NO_PER_PAGE: '10',
      };
      dispatch(action_ZTMI241(payload));
    } catch (error) {}
  }, [tab, childs, search, userMaBp, commLocGroup, dispatch]);

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <button className="sipTitleBtnBack btn btn-secondary" onClick={handleBack}>
            <img className="backIcon" src={'../../assets/img/icon/iconArrowLeft.svg'} alt="VTPostek" />
          </button>
          {commLocGroup}
        </h1>
        <div className="sipTitleRightBlock">
          <Button onClick={handleChuyenVaoBangKe} color="primary" className="ml-2">
            <img src={'../../assets/img/icon/iconChuyenVaoTai.svg'} alt="VTPostek" />
            {t('Chuyển bảng kê')}
          </Button>
          {/* <Button onClick={toggleCreateForwardingItemModal} color="primary" className="ml-2">
            <i className="fa fa-file-archive-o mr-2" />
            {t('Tạo bảng kê')}
            <CreateForwardingItemModal
              onSuccessCreated={getListBangKe}
              visible={createForwardingItemModal}
              onHide={toggleCreateForwardingItemModal}
              modalTitle={t('Tạo bảng kê')}
              IV_TOR_TYPE="ZC1"
            />
          </Button> */}
          {/*<DongBangKe forwardingItemListState={forwardingItemListState} des={des} />*/}
          <Button
            onClick={handleShowPopupDongBangKe}
            color="primary"
            className="ml-2"
            disabled={size(forwardingItemListState) <= 0}
          >
            <i className="fa fa-download mr-2" />
            {t('Đóng bảng kê')}
          </Button>
          <Button
            onClick={handleShowPopupDongTai}
            color="primary"
            className="ml-2"
            disabled={size(forwardingItemListState) <= 0}
          >
            <i className="fa fa-download mr-2" />
            {t('Đóng tải')}
          </Button>
        </div>
      </Row>
      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          {childs.length > 0 &&
            childs.map((child: API.RowMTZTMI241OUT, index: number) => (
              <Item
                key={index}
                child={child}
                tab={tab}
                index={index}
                handleChangeTab={handleChangeTab}
                userMaBp={userMaBp}
                commLocGroup={commLocGroup}
              />
            ))}
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
        <ModalTwoTab
          onHide={handleHidePopupDongBangKe}
          visible={showPopUpDongBangKe}
          modalTitle={'Gán bảng kê vào tải'}
          firstTabTitle={'CHỌN TẢI'}
          secondTabTitle={'TẠO TẢI MỚI'}
          onSubmitButton1={dongBangKeVaoTaiCoSan}
          onSubmitButton2={dongBangKeVaoTaiMoiTao}
          tab1Contents={listTaiCoSan}
          onChooseItemInFirstTab={saveSelectedTai}
          selectedChildInTab1={selectedTai}
        />
        <ModalTwoTab
          onHide={handleHidePopupDongTai}
          visible={showPopUpDongTai}
          modalTitle={'Gán tải vào chuyến thư'}
          firstTabTitle={'CHỌN CHUYẾN THƯ'}
          secondTabTitle={'TẠO CHUYẾN THƯ MỚI'}
          onSubmitButton1={dongTaiVaoChuyenThuCoSan}
          onSubmitButton2={dongTaiVaoChuyenThuTaoMoi}
          tab1Contents={listChuyenThuCoSan}
          onChooseItemInFirstTab={saveSelectedChuyenThu}
          selectedChildInTab1={selectedChuyenThu}
        />
      </div>
    </>
  );
}

interface ItemProps {
  child: API.RowMTZTMI241OUT;
  tab: number;
  handleChangeTab: Function;
  index: number;
  userMaBp: string;
  commLocGroup: string;
}

function Item(props: ItemProps): JSX.Element {
  const child = props.child;
  const tab = props.tab;
  const handleChangeTab = props.handleChangeTab;
  const index = props.index;
  const userMaBp = props.userMaBp;
  const commLocGroup = props.commLocGroup;
  const dispatch = useDispatch();

  const [count, setCount] = React.useState<number>(0);
  React.useEffect(() => {
    try {
      const payload = {
        IV_PACKAGE_ID: '',
        IV_FREIGHT_UNIT_STATUS: [toString(SipDataState.NHAN_TAI_BUU_CUC_GOC)],
        IV_LOC_ID: userMaBp,
        IV_COMMODITY_GROUP: commLocGroup,
        IV_DATE: today,
        IV_USER: child.USER,
        IV_PAGE_NO: '1',
        IV_NO_PER_PAGE: '10',
      };
      dispatch(
        action_ZTMI241(
          payload,
          {
            onSuccess: (res: API.MTZTMI241OUT): void => {
              setCount(size(res.Row));
            },
          },
          { stateless: true },
        ),
      );
    } catch (error) {}
  }, [tab, userMaBp, commLocGroup, dispatch]);

  return (
    <NavItem key={child.USER}>
      <NavLink
        className={classNames({ active: tab === index })}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={(): void => handleChangeTab(index)}
      >
        {child.USER}
        <Badge color="primary">{count}</Badge>
      </NavLink>
    </NavItem>
  );
}

export default ChiTietBuuGuiChuaDongBangKe;
