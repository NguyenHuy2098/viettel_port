/* eslint-disable max-lines */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Badge, Button, Nav, NavItem, NavLink, Row, TabContent, TabPane, Col, Input, Label } from 'reactstrap';
import moment from 'moment';
import { goBack } from 'connected-react-router';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { get, size, forEach } from 'lodash';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { toast } from 'react-toastify';

import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_ZTMI241 } from 'redux/ZTMI241/actions';
import DataTable from 'components/DataTable';
import { Cell } from 'react-table';
import { select_ZTMI241 } from 'redux/ZTMI241/selectors';
import { Location } from 'history';
import SelectForwardingItemModal from 'components/Modal/ModalChuyenVao';
import { makeSelectorMaBP } from 'redux/auth/selectors';
// import CreateForwardingItemModal from 'components/Modal/ModalTaoMoi';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { AppStateType } from 'redux/store';
import {
  actionDongBangKeVaoTaiMoiTao,
  actionDongBanKeVaoTaiCoSan,
  actionDongTaiVaoChuyenThuCoSan,
  actionDongTaiVaoChuyenThuTaoMoi,
} from 'redux/common/actions';
import { SipDataState, SipDataType } from 'utils/enums';
import ModalTwoTab from 'components/DanhSachPhieuGuiTrongBangKe/ModalTwoTab';
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';

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

  const getListTaiCoSan = (): void => {
    const params = {
      IV_TOR_ID: '',
      IV_FR_DATE: moment()
        .subtract(7, 'day')
        .format('YYYYMMDD'),
      IV_TO_DATE: moment().format('YYYYMMDD'),
      IV_TOR_TYPE: SipDataType.TAI,
      IV_FR_LOC_ID: userMaBp,
      IV_TO_LOC_ID: '',
      IV_CUST_STATUS: SipDataState.TAO_MOI,
      IV_PAGENO: '1',
      IV_NO_PER_PAGE: '5000',
    };
    dispatch(action_MIOA_ZTMI047(params));
  };

  const getListChuyenThuCoSan = (): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_ID: '',
        IV_FR_DATE: moment()
          .subtract(7, 'day')
          .format('YYYYMMDD'),
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_TOR_TYPE: SipDataType.CHUYEN_THU,
        IV_FR_LOC_ID: userMaBp,
        IV_TO_LOC_ID: '',
        IV_CUST_STATUS: SipDataState.TAO_MOI,
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '5000',
      }),
    );
  };

  React.useEffect((): void => {
    getListTaiCoSan();
    getListChuyenThuCoSan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatchZTMI241 = useCallback((): void => {
    const payload = {
      IV_PACKAGE_ID: '',
      IV_FREIGHT_UNIT_STATUS: [306],
      IV_LOC_ID: 'BDH',
      IV_COMMODITY_GROUP: commLocGroup,
      // IV_DATE: moment().format('YYYYMMDD'),
      IV_DATE: '20191004',
      IV_USER: get(childs, '[0].USER', ''),
      IV_PAGE_NO: '1',
      IV_NO_PER_PAGE: '10',
    };
    // const payload = {
    //   IV_PACKAGE_ID: '',
    //   IV_FREIGHT_UNIT_STATUS: [306],
    //   IV_LOC_ID: 'BDH',
    //   IV_COMMODITY_GROUP: 'Thư-Chậm-Liên vùng.HUB1',
    //   IV_DATE: '20191002',
    //   IV_USER: 'HOADT',
    //   IV_PAGE_NO: '1',
    //   IV_NO_PER_PAGE: '10',
    // };
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
      // {
      //   Header: t('Quản trị'),
      //   Cell: ({ row }: Cell<API.RowMTZTMI241OUT>): JSX.Element => {
      //     return (
      //       <>
      //         <Button className="SipTableFunctionIcon">
      //           <i className="fa fa-pencil fa-lg color-blue" />
      //         </Button>
      //         <Button className="SipTableFunctionIcon">
      //           <i className="fa fa-trash-o fa-lg color-red" />
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
      IV_FREIGHT_UNIT_STATUS: [306],
      IV_LOC_ID: 'BDH',
      IV_COMMODITY_GROUP: commLocGroup,
      // IV_DATE: moment().format('YYYYMMDD'),
      IV_DATE: '20191004',
      IV_USER: get(childs, '[0].USER', ''),
      IV_PAGE_NO: '1',
      IV_NO_PER_PAGE: '10',
    };
    dispatch(action_ZTMI241(payload));
  }

  function renderSearch(): JSX.Element {
    return (
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
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
          <Button onClick={handleChuyenVaoBangKe} color="primary" className="ml-2">
            <i className="fa fa-file-excel-o mr-2" />
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

export default ChiTietBuuGuiChuaDongBangKe;
