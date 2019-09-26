/* eslint-disable max-lines */
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Fade, Input, Label, Row } from 'reactstrap';
import { forEach, get, map, size } from 'lodash';
import { useTranslation } from 'react-i18next';
import { goBack } from 'connected-react-router';
import { generatePath, match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { makeSelector046RowFirstChild, makeSelector046ListChildren } from 'redux/MIOA_ZTMI046/selectors';
import moment from 'moment';
import { push } from 'connected-react-router';
import DeleteConfirmModal from 'components/DeleteConfirmModal/Index';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import routesMap from 'utils/routesMap';
import SelectForwardingItemModal from 'components/SelectForwardingItemModal/Index';
import { makeSelectorMaBP } from 'redux/auth/selectors';

let forwardingItemList: ForwardingItem[] = [];

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongChuyenThu: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userMaBp = useSelector(makeSelectorMaBP);

  const idChuyenThu = get(props, 'match.params.idChuyenThu', '');
  const dataChuyenThu = useSelector(makeSelector046RowFirstChild);
  const dataChuyenThuChild = useSelector(makeSelector046ListChildren);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');

  const [forwardingItemListState, setForwardingItemListState] = useState<ForwardingItem[]>([]);
  const [selectForwardingItemModal, setSelectForwardingItemModal] = useState<boolean>(false);
  const [uncheckAllForwardingItemCheckbox, setUncheckAllForwardingItemCheckbox] = useState<boolean | undefined>(
    undefined,
  );
  const [disableFunctionalButton, setDisableFunctionalButton] = useState<boolean>(true);

  useEffect((): void => {
    if (forwardingItemListState.length > 0) {
      setDisableFunctionalButton(false);
    } else {
      setDisableFunctionalButton(true);
    }
  }, [forwardingItemListState]);

  function toggleSelectForwardingItemModal(): void {
    setSelectForwardingItemModal(!selectForwardingItemModal);
  }

  function handleChuyenVaoChuyenThu(): void {
    if (size(forwardingItemListState) > 0) {
      toggleSelectForwardingItemModal();
    } else {
      alert(t('Vui lòng chọn tải!'));
    }
  }

  function onSuccessSelectedForwardingItem(): void {
    getListPhieuGui();
    setUncheckAllForwardingItemCheckbox(false);
    setForwardingItemListState([]);
    forwardingItemList = [];
  }

  function handleSelectTaiItem(event: React.FormEvent<HTMLInputElement>): void {
    event.stopPropagation();
    const value = event.currentTarget.value;
    setUncheckAllForwardingItemCheckbox(undefined);
    if (event.currentTarget.checked) {
      forwardingItemList.push({ ITEM_ID: value, ITEM_TYPE: 'ZC2' });
    } else {
      forEach(forwardingItemList, (item: ForwardingItem, index: number): void => {
        if (item.ITEM_ID === value) {
          forwardingItemList.splice(index, 1);
        }
      });
    }
    setForwardingItemListState(forwardingItemList);
  }

  function toggleDeleteConfirmModal(): void {
    setDeleteConfirmModal(!deleteConfirmModal);
  }

  function handleDeleteItem(torId: string): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      event.stopPropagation();
      setDeleteTorId(torId);
      toggleDeleteConfirmModal();
    };
  }

  const payload046 = {
    IV_TOR_ID: idChuyenThu,
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '10',
  };

  const getListPhieuGui = (): void => {
    dispatch(action_MIOA_ZTMI046(payload046));
  };

  const handleDeleteForwardingOrder = (torId: string): void => {
    const payload = {
      IV_FLAG: '3',
      IV_TOR_ID_CU: torId,
      IV_SLOCATION: '',
      IV_DLOCATION: '',
      IV_DESCRIPTION: '',
      T_ITEM: [
        {
          ITEM_ID: '',
          ITEM_TYPE: '',
        },
      ],
    };
    dispatch(
      action_MIOA_ZTMI016(payload, {
        onSuccess: (): void => {
          alert(t('Xóa thành công!'));
        },
        onFailure: (error: HttpRequestErrorType): void => {
          alert(error.messages);
        },
        onFinish: (): void => getListPhieuGui(),
      }),
    );
  };

  React.useEffect((): void => {
    getListPhieuGui();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idChuyenThu]);

  const handleBack = (): void => {
    dispatch(goBack());
  };

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack} className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Danh sách tải/kiện trong chuyến thư')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
          <Button onClick={handleChuyenVaoChuyenThu} disabled={disableFunctionalButton}>
            <i className="fa fa-download rotate-90" />
            {t('Chuyển vào CT')}
          </Button>
          <Button disabled={disableFunctionalButton}>
            <i className="fa fa-truck" />
            {t('Đóng CT')}
          </Button>
        </div>
      </Row>
    );
  }

  function renderDescriptionServiceShipping(): JSX.Element {
    return (
      <Row className="sipSummaryContent">
        <Col lg="5" xs="12">
          <Row>
            <Col xs="5">{t('Mã tải/kiện')}: </Col>
            <Col xs="7">{get(dataChuyenThu, 'TOR_ID', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Trọng lượng')}: </Col>
            <Col xs="7">
              {parseFloat(get(dataChuyenThu, 'NET_WEI_VAL', '')).toFixed(2)} {get(dataChuyenThu, 'NET_WEI_UNI', '')}
            </Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Điểm đến')}: </Col>
            <Col xs="7">{get(dataChuyenThu, 'LOG_LOCID_DES', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{get(dataChuyenThu, 'EXEC_CONT', '')}</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: {size(dataChuyenThuChild)}
        </Col>
      </Row>
    );
  }

  function renderShippingInformationAndScanCode(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <div className="d-flex">
          <div className="sipTitleRightBlockInput m-0">
            <i className="fa fa-barcode" />
            <Input type="text" placeholder={t('Quét mã tải/kiện')} />
          </div>
          <Button color="primary" className="ml-2">
            {t('Quét mã')}
          </Button>
          <Button color="gray" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow">
            <i className="fa fa-trash-o" />
          </Button>
        </div>
      </div>
    );
  }
  const dataTable = map(
    dataChuyenThuChild,
    (item: API.Child): API.Child => {
      return {
        TOR_ID: item.TOR_ID ? item.TOR_ID : '',
        DES_LOC_IDTRQ: item.DES_LOC_IDTRQ ? item.DES_LOC_IDTRQ : '',
        GRO_WEI_VAL: `${parseFloat(get(item, 'GRO_WEI_VAL', '')).toFixed(2)} ${item.GRO_WEI_UNI}`,
        GRO_WEI_UNI: item.GRO_WEI_UNI ? item.GRO_WEI_UNI : '',
        DATETIME_CHLC: moment(get(item, 'DATETIME_CHLC', ''), 'YYYYMMDDhhmmss').format(' DD/MM/YYYY '),
      };
    },
  );

  const handleRedirectDetail = useCallback(
    (item: API.Child): void => {
      dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI, { idTai: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataChuyenThuChild],
  );

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <Label check>
              <Input
                defaultChecked={uncheckAllForwardingItemCheckbox}
                type="checkbox"
                value={get(row, 'values.TOR_ID', '')}
                onClick={handleSelectTaiItem}
              />
            </Label>
          );
        },
      },
      {
        Header: t('Mã tải/kiện'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('Số lượng'),
        accessor: '',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return <>Thiếu API</>;
        },
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GRO_WEI_VAL',
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'DATETIME_CHLC',
      },
      {
        Header: t('Loại'),
        Cell: (): JSX.Element => {
          return <>Thiếu API</>;
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-print fa-lg color-green" />
              </Button>
              <Button className="SipTableFunctionIcon" onClick={handleDeleteItem(get(row, 'values.TOR_ID', ''))}>
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

  return dataChuyenThu ? (
    <>
      {renderTitle()}
      {renderDescriptionServiceShipping()}
      {renderShippingInformationAndScanCode()}
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={dataTable} onRowClick={handleRedirectDetail} />
      </Row>
      <DeleteConfirmModal
        visible={deleteConfirmModal}
        onDelete={handleDeleteForwardingOrder}
        onHide={toggleDeleteConfirmModal}
        torId={deleteTorId}
      />
      <SelectForwardingItemModal
        onSuccessSelected={onSuccessSelectedForwardingItem}
        visible={selectForwardingItemModal}
        onHide={toggleSelectForwardingItemModal}
        modalTitle={t('Chọn chuyến thư')}
        forwardingItemList={forwardingItemListState}
        IV_TOR_TYPE="ZC3"
        IV_FR_LOC_ID={userMaBp}
        IV_TO_LOC_ID=""
        IV_CUST_STATUS={101}
      />
    </>
  ) : (
    <Fade in={true} timeout={1000}>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack} className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Quay lại')}
        </h1>
      </Row>
      <div className="row mb-5" />
      <h3 className="text-center">{t('Không tìm thấy dữ liệu!')}</h3>
    </Fade>
  );
};
export default DanhSachPhieuGuiTrongChuyenThu;
