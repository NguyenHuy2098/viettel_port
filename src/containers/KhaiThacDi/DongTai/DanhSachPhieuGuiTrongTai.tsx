/* eslint-disable max-lines */
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Fade, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { match } from 'react-router-dom';
import { Cell } from 'react-table';
import { toast } from 'react-toastify';
import { forEach, get, includes, map, size, isEmpty } from 'lodash';
import moment from 'moment';

import Pagination from 'components/Pagination';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import ModalTwoTab from 'components/DanhSachPhieuGuiTrongBangKe/ModalTwoTab';
import DataTable from 'components/DataTable';
import Scan from 'components/Input/Scan';
import SelectForwardingItemModal from 'components/Modal/ModalChuyenVao';
import DeleteConfirmModal from 'components/Modal/ModalConfirmDelete';
import PrintBangKeChiTiet from 'components/Printable/PrintBangKeChiTiet';
import { useSipDataType } from 'hooks/useTranslations';
import { makeSelectorBPOrg } from 'redux/GetProfileByUsername/selectors';
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
import { makeSelectorRow } from 'redux/MIOA_ZTMI047/selectors';
import { IV_FLAG, SipDataState, SipDataType, SipDataTypeName, SipFlowType } from 'utils/enums';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import { goBack } from 'connected-react-router';

interface Props {
  match: match;
}

let forwardingItemList: ForwardingItem[] = [];

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongTai: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userMaBp = useSelector(makeSelectorBPOrg);

  const idTai = get(props, 'match.params.idTai', '');
  const dataTai = useSelector(makeSelector046RowFirstChild);
  const dataTaiChild = useSelector(makeSelector046ListChildren);
  const totalPage046 = useSelector(makeSelector046TotalPage);
  const totalItem046 = useSelector(makeSelector046EVTotalItem);

  const listChuyenThu = useSelector(makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.TAO_MOI));
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');

  const [forwardingItemListState, setForwardingItemListState] = useState<ForwardingItem[]>([]);
  const [listUncheckForwardingItem, setListUncheckForwardingItem] = useState<ForwardingItem[]>([]);
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
  const [showPopupDongTai, setShowPopupDongTai] = useState<boolean>(false);
  const [selectedChuyenThu, setSelectedChuyenThu] = useState<API.RowMTZTMI047OUT | undefined>(undefined);

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

  const reset = (): void => {
    setForwardingItemListState([]);
    setListUncheckForwardingItem([]);
    setUncheckAllForwardingItemCheckbox(false);
    getListBangKePhieuGui();
  };
  const getListChuyenThu = (): void => {
    dispatch(
      action_MIOA_ZTMI047(
        {
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_CUST_STATUS: SipDataState.CHUA_HOAN_THANH,
          IV_NO_PER_PAGE: '5000',
        },
        {},
        { flow: SipFlowType.KHAI_THAC_DI },
      ),
    );
  };

  useEffect((): void => {
    getListChuyenThu();
    getListDiemDen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateSelectedChuyenThu = (chuyenThu: API.RowMTZTMI047OUT): void => {
    setSelectedChuyenThu(chuyenThu);
  };

  const handleShowPopupDongTai = (): void => {
    setShowPopupDongTai(true);
  };

  const handleHidePopupDongTai = (): void => {
    setShowPopupDongTai(false);
  };

  function toggleSelectForwardingItemModal(): void {
    setSelectForwardingItemModal(!selectForwardingItemModal);
  }

  function handleChuyenVaoTai(): void {
    if (size(forwardingItemListState) > 0) {
      toggleSelectForwardingItemModal();
    } else {
      alert(t('Vui l??ng ch???n b???ng k??!'));
    }
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

  const getListBangKePhieuGui = (payload = {}): void => {
    const payload046 = {
      IV_TOR_ID: idTai,
      ...payload,
    };
    dispatch(action_MIOA_ZTMI046(payload046));
  };

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    const payload = {
      IV_TOR_ID: idTai,
      IV_PAGENO: selectedItem.selected + 1,
    };
    getListBangKePhieuGui(payload);
  };

  function onSuccessSelectedForwardingItem(): void {
    getListBangKePhieuGui();
    setUncheckAllForwardingItemCheckbox(false);
    setForwardingItemListState([]);
    forwardingItemList = [];
  }

  const handleSelectBangKeItem = (event: React.FormEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    const value = event.currentTarget.value;
    setUncheckAllForwardingItemCheckbox(undefined);
    if (event.currentTarget.checked) {
      forwardingItemList.push({ ITEM_ID: value, ITEM_TYPE: 'ZC1' });
    } else {
      forEach(forwardingItemList, (item: ForwardingItem, index: number): void => {
        if (get(item, 'ITEM_ID', '') === value) {
          forwardingItemList.splice(index, 1);
        }
      });
    }
    setForwardingItemListState([...forwardingItemList]);
  };

  function isForwardingItemSelected(item: API.Child, listForwardingItemId: string[]): boolean {
    return includes(listForwardingItemId, item.TOR_ID);
  }

  useEffect((): void => {
    const listForwardingItemId = map(forwardingItemListState, item => item.ITEM_ID);
    const unSelectListForwardingItem: API.Child[] = [];
    forEach(dataTaiChild, item => {
      if (!isForwardingItemSelected(item, listForwardingItemId)) {
        unSelectListForwardingItem.push(item);
      }
    });

    // listUncheckForwardingItem
    const tempListUncheckForwardingItem: ForwardingItem[] = map(
      unSelectListForwardingItem,
      (item: API.Child): ForwardingItem => ({
        ITEM_ID: item.TOR_ID || '',
        ITEM_TYPE: '',
      }),
    );

    setListUncheckForwardingItem(tempListUncheckForwardingItem);
  }, [forwardingItemListState, dataTaiChild]);

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
          alert(t('X??a th??nh c??ng!'));
        },
        onFailure: (error: HttpRequestErrorType): void => {
          alert(error.messages);
        },
        onFinish: (): void => getListBangKePhieuGui(),
      }),
    );
  };

  useEffect((): void => {
    getListBangKePhieuGui();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTai]);

  // const handleRedirectDetail = useCallback(
  //   (item: API.Child): void => {
  //     dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE, { idBangKe: item.TOR_ID })));
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [dataTaiChild],
  // );

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
          {t('Danh s??ch b???ng k?? trong t???i')}
        </h1>
        <div className="sipTitleRightBlock" title={t('In')}>
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
          {/*________________temporary hide btn Chuy???n because of lack of requirement____________*/}
          <Button color="primary" className="hide" onClick={handleChuyenVaoTai} disabled={disableFunctionalButton}>
            <img src={'../../assets/img/icon/iconChuyenVaoTai.svg'} alt="VTPostek" />
            {t('Chuy???n t???i')}
          </Button>
          <Button color="primary" className="ml-2" onClick={handleShowPopupDongTai} disabled={disableFunctionalButton}>
            <img src={'../../assets/img/icon/iconDongTai.svg'} alt="VTPostek" />
            {t('????ng t???i')}
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
            <Col xs="5">{t('M?? t???i')}: </Col>
            <Col xs="7">{get(dataTai, 'TOR_ID', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Tr???ng l?????ng')}: </Col>
            <Col xs="7">
              {parseFloat(get(dataTai, 'NET_WEI_VAL', '')).toFixed(2)} {get(dataTai, 'NET_WEI_UNI', '')}
            </Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('??i???m ?????n')}: </Col>
            <Col xs="7">{get(dataTai, 'LOG_LOCID_DES', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi ch??')}: </Col>
            <Col xs="7">{get(dataTai, 'EXEC_CONT', '')}</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('T???ng s???')}: {totalItem046}
        </Col>
      </Row>
    );
  }

  const renderShippingInformationAndScanCode = (): JSX.Element => (
    <Row className="sipBgWhiteContainer">
      <Col md={6}>
        <Scan
          dataTypeName={SipDataTypeName.BANG_KE}
          flow={SipFlowType.KHAI_THAC_DI}
          onSuccess={getListBangKePhieuGui}
          placeholder={t('Qu??t m?? b???ng k??')}
          targetItemId={idTai}
        />
      </Col>
      <Col>
        {/*_______________temporary hide because of no requirement______________*/}
        <Button color="gray" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow hide">
          <img src={'../../assets/img/icon/iconRemove2.svg'} alt="VTPostek" />
        </Button>
      </Col>
    </Row>
  );

  const addTaiHienTaiVaoChuyenThuDuocChon = (): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.SUA,
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_TOR_ID_CU: get(selectedChuyenThu, 'TOR_ID', ''),
          IV_SLOCATION: get(selectedChuyenThu, 'LOG_LOCID_FR', ''),
          IV_DLOCATION: get(selectedChuyenThu, 'LOG_LOCID_TO', ''),
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: idTai,
              ITEM_TYPE: SipDataType.TAI,
            },
          ],
        },
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
            dispatch(goBack());
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', '???? c?? l???i x???y ra')}
              </>,
              {
                type: 'error',
              },
            );
          },
        },
      ),
    );
  };

  // eslint-disable-next-line max-lines-per-function
  const dongTaiVaoChuyenThuCoSan = (): void => {
    if (!isEmpty(selectedChuyenThu)) {
      //Remove c??c b???ng k?? kh??ng ???????c t??ch ch???n ra kh???i t???i hi???n t???i
      if (size(listUncheckForwardingItem) > 0) {
        const a = {
          IV_FLAG: IV_FLAG.REMOVE,
          IV_TOR_TYPE: SipDataType.TAI,
          IV_TOR_ID_CU: idTai,
          IV_SLOCATION: get(dataTai, 'LOG_LOCID_SRC', ''),
          IV_DLOCATION: get(dataTai, 'LOG_LOCID_DES', ''),
          IV_DESCRIPTION: '',
          T_ITEM: forwardingItemListState,
        };
        dispatch(
          action_MIOA_ZTMI016(a, {
            onSuccess: (data: API.MIOAZTMI016Response): void => {
              toast(
                <>
                  <i className="fa check mr-2" />
                  {get(
                    data,
                    'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE',
                    'Remove c??c b???ng k?? kh??ng ???????c t??ch th??nh c??ng',
                  )}
                </>,
                {
                  type: 'success',
                },
              );
              // Add tai hien tai vao chuyen thu duoc chon
              addTaiHienTaiVaoChuyenThuDuocChon();
              getListBangKePhieuGui();
            },
            onFailure: (error: Error): void => {
              toast(
                <>
                  <i className="fa fa-window-close-o mr-2" />
                  {get(error, 'messages[0]', '???? c?? l???i x???y ra')}
                </>,
                {
                  type: 'error',
                },
              );
            },
          }),
        );
      } else {
        addTaiHienTaiVaoChuyenThuDuocChon();
      }
    }
    handleHidePopupDongTai();
  };

  const addTaiVuaTaoVaoChuyenThuVuaTao = (maChuyenThuVuaTao: string, locNo: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.SUA,
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_TOR_ID_CU: maChuyenThuVuaTao,
          IV_SLOCATION: userMaBp,
          IV_DLOCATION: locNo,
          IV_DESCRIPTION: '',
          T_ITEM: [
            {
              ITEM_ID: idTai,
              ITEM_TYPE: SipDataType.TAI,
            },
          ],
        },
        {
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            toast(
              <>
                <i className="fa check mr-2" />
                {get(data, 'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE', 'Remove c??c b???ng k?? kh??ng ???????c t??ch th??nh c??ng')}
              </>,
              {
                type: 'success',
              },
            );
            reset();
            dispatch(goBack());
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', '???? c?? l???i x???y ra')}
              </>,
              {
                type: 'error',
              },
            );
          },
        },
      ),
    );
  };

  const taoChuyenThuTheoThongTinVuaChon = (locNo: string, ghiChu: string): void => {
    dispatch(
      action_MIOA_ZTMI016(
        {
          IV_FLAG: IV_FLAG.TAO,
          IV_TOR_TYPE: SipDataType.CHUYEN_THU,
          IV_TOR_ID_CU: '',
          IV_SLOCATION: userMaBp,
          IV_DLOCATION: locNo,
          IV_DESCRIPTION: ghiChu,
          T_ITEM: [
            {
              ITEM_ID: '',
              ITEM_TYPE: '',
            },
          ],
        },
        {
          onSuccess: (data: API.MIOAZTMI016Response): void => {
            const maChuyenThuVuaTao = get(data, 'MT_ZTMI016_OUT.IV_TOR_ID_CU', '');
            addTaiVuaTaoVaoChuyenThuVuaTao(maChuyenThuVuaTao, locNo);
          },
          onFailure: (error: Error): void => {
            toast(
              <>
                <i className="fa fa-window-close-o mr-2" />
                {get(error, 'messages[0]', '???? c?? l???i x???y ra')}
              </>,
              {
                type: 'error',
              },
            );
          },
        },
      ),
    );
  };

  // eslint-disable-next-line max-lines-per-function
  const dongTaiVaoChuyenThuTaoMoi = (locNo: string, ghiChu: string): void => {
    if (size(listUncheckForwardingItem) > 0) {
      //remove cac bang ke khong duoc tich chon
      dispatch(
        action_MIOA_ZTMI016(
          {
            IV_FLAG: IV_FLAG.REMOVE,
            IV_TOR_TYPE: SipDataType.TAI,
            IV_TOR_ID_CU: idTai,
            IV_SLOCATION: get(dataTai, 'LOG_LOCID_SRC', ''),
            IV_DLOCATION: get(dataTai, 'LOG_LOCID_DES', ''),
            IV_DESCRIPTION: '',
            T_ITEM: listUncheckForwardingItem,
          },
          {
            onSuccess: (data: API.MIOAZTMI016Response): void => {
              toast(
                <>
                  <i className="fa check mr-2" />
                  {get(
                    data,
                    'MT_ZTMI016_OUT.RETURN_MESSAGE[0].MESSAGE',
                    'Remove c??c b???ng k?? kh??ng ???????c t??ch th??nh c??ng',
                  )}
                </>,
                {
                  type: 'success',
                },
              );
              // tao chuyen thu theo thong tin vua duoc chon thu popup
              taoChuyenThuTheoThongTinVuaChon(locNo, ghiChu);
            },
            onFailure: (error: Error): void => {
              toast(
                <>
                  <i className="fa fa-window-close-o mr-2" />
                  {get(error, 'messages[0]', '???? c?? l???i x???y ra')}
                </>,
                {
                  type: 'error',
                },
              );
            },
          },
        ),
      );
    } else {
      taoChuyenThuTheoThongTinVuaChon(locNo, ghiChu);
    }

    handleHidePopupDongTai();
  };

  const dataTable = map(
    dataTaiChild,
    (item: API.Child): API.Child => {
      return {
        TOR_ID: item.TOR_ID ? item.TOR_ID : '',
        DES_LOC_IDTRQ: item.DES_LOC_IDTRQ ? item.DES_LOC_IDTRQ : '',
        GRO_WEI_VAL: `${parseFloat(get(item, 'GRO_WEI_VAL', '')).toFixed(2)} ${item.GRO_WEI_UNI}`,
        GRO_WEI_UNI: item.GRO_WEI_UNI ? item.GRO_WEI_UNI : '',
        DATETIME_CHLC: moment(get(item, 'DATETIME_CHLC', ''), 'YYYYMMDDhhmmss').format('DD/MM/YYYY'),
        child_count: item.child_count,
        TOR_TYPE: item.TOR_TYPE,
      };
    },
  );

  const renderPrintButton = (idChuyenThu: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        title: t('In'),
        className: 'SipTableFunctionIcon',
        children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
      }}
      modalBodyProps={{
        children: <PrintBangKeChiTiet idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In danh s??ch b??u g???i c???a b???ng k??'),
      }}
    />
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
                onClick={handleSelectBangKeItem}
              />
            </Label>
          );
        },
      },
      {
        Header: t('M?? b???ng k??'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('??i???m ?????n'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('S??? l?????ng'),
        accessor: 'child_count',
      },
      {
        Header: t('Tr???ng l?????ng'),
        accessor: 'GRO_WEI_VAL',
      },
      {
        Header: t('Ng??y g???i'),
        accessor: 'DATETIME_CHLC',
      },
      {
        Header: t('Lo???i'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return <>{useSipDataType(get(row, 'original.TOR_TYPE'))}</>;
        },
      },
      {
        Header: t('Qu???n tr???'),
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <>
              {renderPrintButton(get(row, 'values.TOR_ID', ''))}
              <Button
                className="SipTableFunctionIcon"
                onClick={handleDeleteItem(get(row, 'values.TOR_ID', ''))}
                title={t('X??a')}
              >
                <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataTaiChild, uncheckAllForwardingItemCheckbox],
  );

  return dataTai ? (
    <>
      {renderTitle()}
      {renderDescriptionServiceShipping()}
      {renderShippingInformationAndScanCode()}
      <Row className="sipTableContainer">
        <DataTable
          columns={columns}
          data={dataTable}
          // onRowClick={handleRedirectDetail}
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
        modalTitle={t('Ch???n t???i')}
        forwardingItemList={forwardingItemListState}
        IV_TOR_TYPE={SipDataType.TAI}
        IV_TO_LOC_ID=""
        IV_CUST_STATUS={SipDataState.TAO_MOI}
      />
      <ModalTwoTab
        onHide={handleHidePopupDongTai}
        visible={showPopupDongTai}
        modalTitle={t('G??n t???i v??o chuy???n th??')}
        firstTabTitle={t('CH???N CHUY???N TH??')}
        secondTabTitle={t('T???O CHUY???N TH?? M???I')}
        onSubmitButton1={dongTaiVaoChuyenThuCoSan}
        onSubmitButton2={dongTaiVaoChuyenThuTaoMoi}
        tab1Contents={listChuyenThu}
        onChooseItemInFirstTab={handleUpdateSelectedChuyenThu}
        selectedChildInTab1={selectedChuyenThu}
      />
    </>
  ) : (
    <Fade in={true} timeout={1000}>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
          {t('Quay l???i')}
        </h1>
      </Row>
      <div className="row mb-5" />
      <h3 className="text-center">{t('Kh??ng t??m th???y d??? li???u!')}</h3>
    </Fade>
  );
};

export default DanhSachPhieuGuiTrongTai;
