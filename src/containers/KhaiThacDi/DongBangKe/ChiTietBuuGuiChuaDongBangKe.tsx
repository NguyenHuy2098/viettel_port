import React, { useState, useEffect, useMemo } from 'react';
import { Badge, Button, Nav, NavItem, NavLink, Row, TabContent, TabPane, Col, Input, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { get, size, forEach } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { action_ZTMI241 } from 'redux/ZTMI241/actions';
import DataTable from 'components/DataTable';
import { Cell } from 'react-table';
import { select_ZTMI241 } from 'redux/ZTMI241/selectors';
import { Location } from 'history';
import SelectForwardingItemModal from 'components/SelectForwardingItemModal/Index';
import { makeSelectorMaBP } from 'redux/auth/selectors';

interface Props {
  location: Location;
}
const forwardingItemList: ForwardingItem[] = [];
// eslint-disable-next-line max-lines-per-function
function ChiTietBuuGuiChuaDongBangKe(props: Props): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tab] = useState(1);
  const childs = get(props, 'location.state', []);
  const [selectForwardingItemModal, setSelectForwardingItemModal] = useState<boolean>(false);
  const [forwardingItemListState, setForwardingItemListState] = useState<ForwardingItem[]>([]);
  const [uncheckAllForwardingItemCheckbox, setUncheckAllForwardingItemCheckbox] = useState<boolean | undefined>(
    undefined,
  );
  const userMaBp = useSelector(makeSelectorMaBP);

  const dispatchZTMI241 = (): void => {
    const payload = {
      IV_PACKAGE_ID: '',
      IV_FREIGHT_UNIT_STATUS: [301, 304, 311, 600],
      IV_LOC_ID: 'BDH',
      IV_COMMODITY_GROUP: 'Thư-Nhanh-Nội vùng.TTHNI',
      IV_DATE: moment().format('YYYYMMDD'),
      IV_USER: get(childs, '[0].USER', ''),
      IV_PAGE_NO: '1',
      IV_NO_PER_PAGE: '10',
    };

    // const payload = {
    //   IV_PACKAGE_ID: '',
    //   IV_FREIGHT_UNIT_STATUS: [600],
    //   IV_LOC_ID: 'BDH',
    //   IV_COMMODITY_GROUP: 'HTHU-Chậm-Nội vùng.TTHCM',
    //   IV_DATE: '20190923',
    //   IV_USER: 'chidnl',
    //   IV_PAGE_NO: '1',
    //   IV_NO_PER_PAGE: '10',
    // };
    dispatch(action_ZTMI241(payload));
  };

  useEffect((): void => {
    dispatchZTMI241();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, childs]);

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

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <button className="sipTitleBtnBack btn btn-secondary">
            <i className="fa fa-arrow-left backIcon"></i>
          </button>
          {t('Thư - Nhanh')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button onClick={handleChuyenVaoBangKe}>
            <i className="fa fa-file-excel-o" />
            {t('Chuyển bảng kê')}
          </Button>
          <Button>
            <i className="fa fa-file-archive-o" />
            {t('Tạo bảng kê')}
          </Button>
          <Button>
            <i className="fa fa-download" />
            {t('Đóng bảng kê')}
          </Button>
          <Button>
            <i className="fa fa-download" />
            {t('Đóng tải')}
          </Button>
        </div>
      </Row>
      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          {childs.map((child: API.RowMTZTMI241OUT) => {
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
          IV_TOR_TYPE="ZC1"
          IV_FR_LOC_ID={userMaBp}
          IV_TO_LOC_ID=""
          IV_CUST_STATUS={101}
          isFrom2
        />
      </div>
    </>
  );
}

export default ChiTietBuuGuiChuaDongBangKe;
