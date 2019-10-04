import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Fade, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, match } from 'react-router-dom';
import { Cell } from 'react-table';
import { goBack, push } from 'connected-react-router';
import produce from 'immer';
import moment from 'moment';
import { ceil, concat, filter, get, includes, isEmpty, map, noop, pull, size } from 'lodash';

import ButtonChuyenVaoChuyenThu from 'components/Button/ButtonChuyenVaoChuyenThu';
import ButtonDongChuyenThu from 'components/Button/ButtonDongChuyenThu';
import DataTable from 'components/DataTable';
import DeleteConfirmModal from 'components/Modal/ModalConfirmDelete';
import Scan from 'components/Input/Scan';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { makeSelector046RowFirstChild, makeSelector046ListChildren } from 'redux/MIOA_ZTMI046/selectors';
import routesMap from 'utils/routesMap';
import PrintableModal from 'components/Button/ButtonPrintable';
import PrintablePhieuGiaoNhanChuyenThu from 'containers/KhaiThacDen/ThongTinChuyenThu/PrintablePhieuGiaoNhanChuyenThu';
import PrintablePhieuGiaoTuiThu from '../../../components/PrintablePhieuGiaoTuiThu';
import { SipDataType } from '../../../utils/enums';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongChuyenThu: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const idChuyenThu = get(props, 'match.params.idChuyenThu', '');
  const dataChuyenThu = useSelector(makeSelector046RowFirstChild);
  const dataChuyenThuChildren = useSelector(makeSelector046ListChildren);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');
  const [selectedTaiKienIds, setSelectedTaiKienIds] = useState<string[]>([]);

  useEffect((): void => {
    if (!isEmpty(dataChuyenThuChildren)) {
      setSelectedTaiKienIds(map(dataChuyenThuChildren, (child: API.Child) => get(child, 'TOR_ID', '')));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChuyenThuChildren]);

  const deselectedTaiKienItems = useMemo(() => {
    return map(
      filter(dataChuyenThuChildren, (child: API.Child) => !includes(selectedTaiKienIds, get(child, 'TOR_ID'))),
      (child: API.Child): API.TITEM => ({
        ITEM_ID: get(child, 'TOR_ID'),
        ITEM_TYPE: get(child, 'TOR_TYPE') === SipDataType.TAI ? SipDataType.TAI : '',
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChuyenThuChildren, selectedTaiKienIds]);

  useEffect((): void => {
    getListPhieuGui();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idChuyenThu]);

  const handleBack = (): void => {
    dispatch(goBack());
  };

  const getListPhieuGui = (): void => {
    dispatch(action_MIOA_ZTMI046({ IV_TOR_ID: idChuyenThu }));
  };

  const handleSelectTaiKien = (event: React.MouseEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    const selectedTaiKienId = event.currentTarget.value;
    if (includes(selectedTaiKienIds, selectedTaiKienId)) {
      setSelectedTaiKienIds(produce(selectedTaiKienIds, draftState => pull(draftState, selectedTaiKienId)));
    } else {
      setSelectedTaiKienIds(produce(selectedTaiKienIds, draftState => concat(draftState, selectedTaiKienId)));
    }
  };

  const toggleDeleteConfirmModal = (): void => {
    setDeleteConfirmModal(!deleteConfirmModal);
  };

  const handleDeleteItem = (torId: string) => {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      event.stopPropagation();
      setDeleteTorId(torId);
      toggleDeleteConfirmModal();
    };
  };

  const handleDeleteForwardingOrder = (): void => {};

  const renderPrintButtonPhieuGiaoNhanChuyenThu = (): JSX.Element => (
    <PrintableModal
      btnProps={{
        className: 'sipTitleRightBlockBtnIcon',
        children: <i className="fa fa-print" />,
      }}
      modalBodyProps={{
        children: <PrintablePhieuGiaoNhanChuyenThu idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In thông tin chuyến thư'),
      }}
    />
  );

  const renderTitle = (): JSX.Element => {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack} className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Danh sách tải/kiện trong chuyến thư')}
        </h1>
        <div className="sipTitleRightBlock">
          {renderPrintButtonPhieuGiaoNhanChuyenThu()}
          {/* <Button color="dark" outline>
            <i className="fa fa-print" />
          </Button> */}
          <ButtonChuyenVaoChuyenThu
            className="ml-2"
            diemDen={get(dataChuyenThu, 'LOG_LOCID_DES', '')}
            idChuyenThu={idChuyenThu}
          />
          <ButtonDongChuyenThu
            className="ml-2"
            diemDen={get(dataChuyenThu, 'LOG_LOCID_DES', '')}
            idChuyenThu={idChuyenThu}
            listTaiKienCanRemove={deselectedTaiKienItems}
            onSuccess={getListPhieuGui}
          />
        </div>
      </Row>
    );
  };

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

  const renderPrintButton = (idChuyenThu: string): JSX.Element => (
    <PrintableModal
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <i className="fa fa-print fa-lg color-green" />,
      }}
      modalBodyProps={{
        children: <PrintablePhieuGiaoTuiThu idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In danh sách bảng kê thuộc tải'),
      }}
    />
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
            {renderPrintButton(get(row, 'values.TOR_ID', ''))}
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