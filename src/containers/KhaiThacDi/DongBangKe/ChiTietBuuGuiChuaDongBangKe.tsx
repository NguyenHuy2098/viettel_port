/* eslint-disable max-lines */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from 'react-table';
import { Button, Col, Input, Nav, Row, TabContent, TabPane } from 'reactstrap';
import { map, get, size, toString, trim } from 'lodash';
import { Location } from 'history';
import moment from 'moment';

import ButtonGoBack from 'components/Button/ButtonGoBack';
import ButtonDongBangKe from 'components/Button/ChiTietBuuGuiChuaDongBangKe/ButtonDongBangKe';
import ButtonDongTai from 'components/Button/ChiTietBuuGuiChuaDongBangKe/ButtonDongTai';
import DataTable from 'components/DataTable';
import SelectForwardingItemModal from 'components/Modal/ModalChuyenVao';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { action_ZTMI241 } from 'redux/ZTMI241/actions';
import { select_ZTMI241 } from 'redux/ZTMI241/selectors';
import { SipDataState, SipDataType, SipFlowType } from 'utils/enums';
import { today } from 'utils/timeHelper';
import Item from './Item';

interface Props {
  location: Location;
}

// eslint-disable-next-line max-lines-per-function
function ChiTietBuuGuiChuaDongBangKe(props: Props): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const childs = get(props, 'location.state.child', []);
  const [selectForwardingItemModal, setSelectForwardingItemModal] = useState<boolean>(false);
  const [checkedBuuGui, setCheckedBuuGui] = useState<string[]>([]);

  const [uncheckAllForwardingItemCheckbox, setUncheckAllForwardingItemCheckbox] = useState<boolean | undefined>(
    undefined,
  );

  const userMaBp = useSelector(makeSelectorMaBP);
  const des = get(props, 'location.state.des', '');
  const commLocGroup = get(props, 'location.state.COMM_LOC_GROUP', '');

  const reset = (): void => {
    setTimeout(() => {
      setCheckedBuuGui([]);
      setUncheckAllForwardingItemCheckbox(false);
      dispatchZTMI241();
    }, 1000);
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

  function handleSelectBangKeItem(values: string[]): void {
    setCheckedBuuGui(values);
  }

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
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
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          const date = get(row, 'values.CREATED_ON', '');
          return <>{moment(date, 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY')}</>;
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
    if (size(checkedBuuGui) > 0) {
      toggleSelectForwardingItemModal();
    } else {
      alert(t('Vui lòng chọn phiếu gửi!'));
    }
  }

  function onSuccessSelectedForwardingItem(): void {
    dispatchZTMI241();
    setUncheckAllForwardingItemCheckbox(false);
    setCheckedBuuGui([]);
  }

  const [search, setSearch] = useState<string>('');

  function handleChangeSearch(e: { target: { value: string } }): void {
    setSearch(e.target.value);
  }

  function handleSearch(): void {
    const payload = {
      IV_PACKAGE_ID: trim(search),
      IV_FREIGHT_UNIT_STATUS: [toString(SipDataState.NHAN_TAI_BUU_CUC_GOC)],
      IV_LOC_ID: userMaBp,
      IV_COMMODITY_GROUP: commLocGroup,
      IV_DATE: today,
      IV_USER: get(childs[tab], 'USER', ''),
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
              {size(checkedBuuGui)}/{size(dataRow)}
            </span>
          </p>
        </Col>
      </Row>
    );
  }

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

  function handleChangeTab(index: number): void {
    setTab(index);
  }

  React.useEffect(() => {
    try {
      const user = childs[tab].USER;
      const payload = {
        IV_PACKAGE_ID: trim(search),
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

  const transformCheckedBuuGuiToForwardingItemList = useMemo((): ForwardingItem[] => {
    return map(checkedBuuGui, bg => {
      return { ITEM_ID: bg, ITEM_TYPE: '' };
    });
  }, [checkedBuuGui]);
  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
          {commLocGroup}
        </h1>
        <div className="sipTitleRightBlock">
          <Button onClick={handleChuyenVaoBangKe} color="primary" className="ml-2 hide">
            <img src={'../../assets/img/icon/iconChuyenVaoTai.svg'} alt="VTPostek" />
            {t('Chuyển bảng kê')}
          </Button>
          <ButtonDongBangKe
            disabled={size(checkedBuuGui) <= 0}
            des={des}
            forwardingItemListState={transformCheckedBuuGuiToForwardingItemList}
            callbackWhenDone={reset}
          />

          <ButtonDongTai
            disabled={size(checkedBuuGui) <= 0}
            des={des}
            forwardingItemListState={transformCheckedBuuGuiToForwardingItemList}
            callbackWhenDone={reset}
          />
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
              <DataTable
                columns={columns}
                data={dataRow ? dataRow : []}
                onCheckedValuesChange={handleSelectBangKeItem}
                showCheckAll={true}
                showCheckboxes
                renderCheckboxValues="FREIGHT_UNIT"
              />
            </Row>
          </TabPane>
        </TabContent>
        <SelectForwardingItemModal
          onSuccessSelected={onSuccessSelectedForwardingItem}
          visible={selectForwardingItemModal}
          onHide={toggleSelectForwardingItemModal}
          modalTitle={t('Chọn bảng kê')}
          forwardingItemList={transformCheckedBuuGuiToForwardingItemList}
          IV_TOR_TYPE={SipDataType.BANG_KE}
          IV_TO_LOC_ID=""
          IV_CUST_STATUS={SipDataState.TAO_MOI}
          isFrom2
        />
      </div>
    </>
  );
}

export default ChiTietBuuGuiChuaDongBangKe;
