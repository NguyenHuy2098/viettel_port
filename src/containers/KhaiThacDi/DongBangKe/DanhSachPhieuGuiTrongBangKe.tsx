/* eslint-disable max-lines */
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { match } from 'react-router-dom';
import { Cell } from 'react-table';
import { Button, Col, Row } from 'reactstrap';
import { forEach, get, includes, map, noop, size } from 'lodash';
import moment from 'moment';
import { default as NumberFormat } from 'react-number-format';

import Pagination from 'components/Pagination';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import ButtonDongBangKe from 'components/Button/DanhSachPhieuGuiTrongBangKe/ButtonDongBangKe';
import ButtonDongTai from 'components/Button/DanhSachPhieuGuiTrongBangKe/ButtonDongTai';
import DataTable from 'components/DataTable';
import SelectForwardingItemModal from 'components/Modal/ModalChuyenVao';
import FadedNoData from 'components/NoData/FadedNodata';
import DeleteConfirmModal from 'components/Modal/ModalConfirmDelete';
import Scan from 'components/Input/Scan';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI045 } from 'redux/MIOA_ZTMI045/actions';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import {
  makeSelector046EVTotalItem,
  makeSelector046ListChildren,
  makeSelector046RowFirstChild,
  makeSelector046TotalPage,
} from 'redux/MIOA_ZTMI046/selectors';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import { IV_FLAG, SipDataState, SipDataType, SipFlowType, SipDataTypeName } from 'utils/enums';
import { goBack } from 'connected-react-router';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongBangKe: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const idBangKe = get(props, 'match.params.idBangKe', '');
  const dataBangKe = useSelector(makeSelector046RowFirstChild);
  const dataBangKeChild = useSelector(makeSelector046ListChildren);
  const totalPage046 = useSelector(makeSelector046TotalPage);
  const totalItem046 = useSelector(makeSelector046EVTotalItem);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');
  const [checkedBuuGui, setCheckedBuuGui] = useState<API.TITEM[]>([]);
  const [uncheckedBuuGui, setUncheckedBuuGui] = useState<API.TITEM[]>([]);
  const [selectForwardingItemModal, setSelectForwardingItemModal] = useState<boolean>(false);

  const resetState = (): void => {
    setCheckedBuuGui([]);
    setUncheckedBuuGui([]);
    getListPhieuGui();
  };

  const getListPhieuGui = (payload = {}): void => {
    const payload046 = {
      IV_TOR_ID: idBangKe,
      ...payload,
    };
    dispatch(action_MIOA_ZTMI046(payload046));
  };

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    const payload = {
      IV_TOR_ID: idBangKe,
      IV_PAGENO: selectedItem.selected + 1,
    };
    getListPhieuGui(payload);
  };

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

  const getListChuyenThu = (): void => {
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
    getListDiemDen();
    getListChuyenThu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    getListPhieuGui();
    setCheckedBuuGui([]);
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

  const handleDeleteForwardingOrder = (torId: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.XOA,
          IV_TOR_ID_CU: torId,
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        },
        {
          onSuccess: (): void => {
            alert(t('Xóa thành công!'));
          },
          onFailure: (error: HttpRequestErrorType): void => {
            alert(error.messages);
          },
          onFinish: (): void => getListPhieuGui(),
        },
      ),
    );
  };

  useEffect((): void => {
    getListPhieuGui();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idBangKe]);

  const handleCheckedBuuGuiChange = (values: string[]): void => {
    const newCheckedBuuGui: API.TITEM[] = [];
    const newUncheckedBuuGui: API.TITEM[] = [];
    forEach(dataBangKeChild, (child: API.Child): void => {
      const childId = get(child, 'TOR_ID');
      const tItem: API.TITEM = { ITEM_ID: childId, ITEM_TYPE: '' };
      if (includes(values, childId)) {
        newCheckedBuuGui.push(tItem);
      } else {
        newUncheckedBuuGui.push(tItem);
      }
    });
    setCheckedBuuGui(newCheckedBuuGui);
    setUncheckedBuuGui(newUncheckedBuuGui);
  };

  const callbackAfterDongSuccess = (): void => {
    resetState();
    dispatch(goBack());
  };

  // eslint-disable-next-line max-lines-per-function
  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
          {t('Danh sách phiếu gửi trong bảng kê')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon" title={t('In')}>
            <i className="fa fa-print" />
          </Button>
          <Button
            color="primary"
            className="hide ml-2"
            onClick={handleChuyenVaoBangKe}
            disabled={size(checkedBuuGui) === 0}
          >
            <img src={'../../assets/img/icon/iconChuyenVaoTai.svg'} alt="VTPostek" />
            {t('Chuyển bảng kê')}
          </Button>
          <ButtonDongBangKe
            disabled={size(checkedBuuGui) === 0}
            listUncheckForwardingItem={uncheckedBuuGui}
            idBangKe={idBangKe}
            callBackAfterDongBangKe={callbackAfterDongSuccess}
          />
          <ButtonDongTai
            disabled={size(checkedBuuGui) === 0}
            listUncheckForwardingItem={uncheckedBuuGui}
            idBangKe={idBangKe}
            callBackAfterRemovePhieuGui={getListPhieuGui}
            callBackAfterDongTai={callbackAfterDongSuccess}
          />
        </div>
      </Row>
    );
  }

  function renderDescriptionServiceShipping(): JSX.Element {
    return (
      <Row className="sipSummaryContent">
        <Col lg="5" xs="12">
          <Row>
            <Col xs="5">{t('Mã bảng kê')}: </Col>
            <Col xs="7">{get(dataBangKe, 'TOR_ID', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Trọng lượng')}: </Col>
            <Col xs="7">
              {parseFloat(get(dataBangKe, 'NET_WEI_VAL', '')).toFixed(2)} {get(dataBangKe, 'NET_WEI_UNI', '')}
            </Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Điểm đến')}: </Col>
            <Col xs="7">{get(dataBangKe, 'LOG_LOCID_DES', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{get(dataBangKe, 'EXEC_CONT', '')}</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}:{' '}
          <NumberFormat value={totalItem046} displayType={'text'} thousandSeparator="." decimalSeparator="," />
        </Col>
      </Row>
    );
  }

  const renderShippingInformationAndScanCode = (): JSX.Element => (
    <Row className="sipBgWhiteContainer">
      <Col md={6}>
        <Scan
          flow={SipFlowType.KHAI_THAC_DI}
          dataTypeName={SipDataTypeName.BUU_GUI}
          onSuccess={getListPhieuGui}
          placeholder={t('Quét mã bưu gửi')}
          targetItemId={idBangKe}
        />
      </Col>
    </Row>
  );

  const dataTable = map(
    dataBangKeChild,
    (item: API.Child): API.Child => {
      return {
        TOR_ID: item.TOR_ID ? item.TOR_ID : '',
        PACKAGE_ID: item.PACKAGE_ID,
        DES_LOC_IDTRQ: item.DES_LOC_IDTRQ ? item.DES_LOC_IDTRQ : '',
        GRO_WEI_VAL: `${parseFloat(get(item, 'GRO_WEI_VAL', '')).toFixed(2)} ${item.GRO_WEI_UNI}`,
        GRO_WEI_UNI: item.GRO_WEI_UNI ? item.GRO_WEI_UNI : '',
        DATETIME_CHLC: moment(get(item, 'DATETIME_CHLC', ''), 'YYYYMMDDhhmmss').format('DD/MM/YYYY'),
        child_count: item.child_count,
      };
    },
  );

  function printTable(tai: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (event: React.MouseEvent): void => {
      event.stopPropagation();
      noop('print', tai.TOR_ID);
    };
  }

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã bưu gửi'),
        accessor: 'PACKAGE_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('Số lượng'),
        accessor: 'child_count',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <NumberFormat
              value={get(row, 'original.child_count', '')}
              displayType={'text'}
              thousandSeparator="."
              decimalSeparator=","
            />
          );
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
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon" onClick={printTable(get(row, 'original'))} title={t('In')}>
                <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />
              </Button>
              <Button
                className="SipTableFunctionIcon"
                onClick={handleDeleteItem(get(row, 'original.TOR_ID', ''))}
                title={t('Xoá')}
              >
                <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataBangKeChild],
  );

  return dataBangKe ? (
    <>
      {renderTitle()}
      {renderDescriptionServiceShipping()}
      {renderShippingInformationAndScanCode()}
      <Row className="sipTableContainer">
        <DataTable
          columns={columns}
          data={dataTable}
          onCheckedValuesChange={handleCheckedBuuGuiChange}
          renderCheckboxValues="TOR_ID"
          showCheckboxes
        />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage046}
          onThisPaginationChange={onPaginationChange}
        />
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
        modalTitle={t('Chọn bảng kê')}
        forwardingItemList={checkedBuuGui}
        IV_TOR_TYPE={SipDataType.BANG_KE}
        IV_TO_LOC_ID=""
        IV_CUST_STATUS={SipDataState.TAO_MOI}
      />
    </>
  ) : (
    <FadedNoData />
  );
};
export default DanhSachPhieuGuiTrongBangKe;
