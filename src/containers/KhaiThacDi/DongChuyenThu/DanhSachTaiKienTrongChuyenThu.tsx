import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Fade, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, match } from 'react-router-dom';
import { Cell } from 'react-table';
import { toast } from 'react-toastify';
import { goBack, push } from 'connected-react-router';
import produce from 'immer';
import moment from 'moment';
import { ceil, concat, get, includes, noop, pull, size } from 'lodash';

import DataTable from 'components/DataTable';
import DeleteConfirmModal from 'components/DeleteConfirmModal';
import Scan from 'components/Input/Scan';
import SelectForwardingItemModal from 'components/SelectForwardingItemModal';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { makeSelector046RowFirstChild, makeSelector046ListChildren } from 'redux/MIOA_ZTMI046/selectors';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import routesMap from 'utils/routesMap';

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
  const dataChuyenThuChildren = useSelector(makeSelector046ListChildren);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');
  const [selectedTaiKienIds, setSelectedTaiKienIds] = useState<string[]>([]);
  const [forwardingItemListState, setForwardingItemListState] = useState<ForwardingItem[]>([]);
  const [selectForwardingItemModal, setSelectForwardingItemModal] = useState<boolean>(false);

  function toggleSelectForwardingItemModal(): void {
    setSelectForwardingItemModal(!selectForwardingItemModal);
  }

  // function handleChuyenVaoChuyenThu(): void {
  //   if (size(forwardingItemListState) > 0) {
  //     toggleSelectForwardingItemModal();
  //   } else {
  //     toast(t('Vui lòng chọn tải!'));
  //   }
  // }

  const getListPhieuGui = (): void => {
    dispatch(action_MIOA_ZTMI046({ IV_TOR_ID: idChuyenThu }));
  };

  function onSuccessSelectedForwardingItem(): void {
    getListPhieuGui();
    setForwardingItemListState([]);
  }

  function handleSelectTaiKien(event: React.MouseEvent<HTMLInputElement>): void {
    event.stopPropagation();
    const selectedTaiKienId = event.currentTarget.value;
    if (includes(selectedTaiKienIds, selectedTaiKienId)) {
      setSelectedTaiKienIds(produce(selectedTaiKienIds, draftState => pull(draftState, selectedTaiKienId)));
    } else {
      setSelectedTaiKienIds(produce(selectedTaiKienIds, draftState => concat(draftState, selectedTaiKienId)));
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

  const handleDeleteForwardingOrder = (torId: string): void => {
    const payload = {
      IV_FLAG: '3',
      IV_TOR_ID_CU: torId,
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
          toast(t('Xóa thành công!'), {
            type: 'info',
          });
        },
        onFailure: (error: HttpRequestErrorType): void => {
          toast(error.messages, {
            type: 'error',
          });
        },
        onFinish: (): void => getListPhieuGui(),
      }),
    );
  };

  useEffect((): void => {
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
          <Button color="dark" outline>
            <i className="fa fa-print" />
          </Button>
          {/*<Button color="primary" className="hide" onClick={handleChuyenVaoChuyenThu}>*/}
          {/*  <i className="fa fa-download mr-2 rotate-90" />*/}
          {/*  {t('Chuyển vào CT')}*/}
          {/*</Button>*/}
          <Button color="primary" className="ml-2">
            <i className="fa fa-truck mr-2" />
            {t('Đóng CT')}
          </Button>
        </div>
      </Row>
    );
  }

  const renderDescriptionServiceShipping = (): JSX.Element => (
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
        {t('Tổng số')}: {size(dataChuyenThuChildren)}
      </Col>
    </Row>
  );

  const renderShippingInformationAndScanCode = (): JSX.Element => (
    <Row className="sipBgWhiteContainer d-flex justify-content-between">
      <Col md={4}>
        <Scan
          buttonProps={{
            onClick: noop,
          }}
          onChange={noop}
          placeholder={t('Quét mã chuyến thư')}
        />
      </Col>
      <Col>
        <Button color="gray" className="sipTitleRightBlockBtnIcon sipBoxShadow">
          <i className="fa fa-trash-o" />
        </Button>
      </Col>
    </Row>
  );

  const handleRedirectDetail = useCallback(
    (item: API.Child): void => {
      dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI, { idTai: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataChuyenThuChildren],
  );

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          const torId = get(row, 'original.TOR_ID');
          return (
            <Label check>
              <Input
                defaultChecked={includes(selectedTaiKienIds, torId)}
                onClick={handleSelectTaiKien}
                type="checkbox"
                value={torId}
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
        accessor: 'ITEM_NO',
      },
      {
        Header: t('Trọng lượng'),
        Cell: ({ row }: Cell<API.Child>): string => {
          return `${ceil(get(row, 'original.GRO_WEI_VAL'), 2)} ${get(row, 'original.GRO_WEI_UNI')}`;
        },
      },
      {
        Header: t('Ngày gửi'),
        Cell: ({ row }: Cell<API.Child>): string => {
          return moment(get(row, 'original.DATETIME_CHLC', ''), 'YYYYMMDDhhmmss').format('HH:mm - DD/MM/YYYY ');
        },
      },
      {
        Header: t('Loại'),
        accessor: 'TOR_TYPE',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.Child>): JSX.Element => (
          <>
            <Button className="SipTableFunctionIcon">
              <i className="fa fa-print fa-lg color-green" />
            </Button>
            <Button className="SipTableFunctionIcon" onClick={handleDeleteItem(get(row, 'values.TOR_ID', ''))}>
              <i className="fa fa-trash-o fa-lg color-red" />
            </Button>
          </>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTaiKienIds],
  );

  return dataChuyenThu ? (
    <>
      {renderTitle()}
      {renderDescriptionServiceShipping()}
      {renderShippingInformationAndScanCode()}
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={dataChuyenThuChildren} onRowClick={handleRedirectDetail} />
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
