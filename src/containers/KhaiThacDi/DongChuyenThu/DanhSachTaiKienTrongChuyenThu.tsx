/* eslint-disable max-lines */
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Fade, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { match } from 'react-router-dom';
import { Cell } from 'react-table';
import produce from 'immer';
import { ceil, concat, filter, get, includes, isEmpty, map, pull, size } from 'lodash';
import moment from 'moment';

import ButtonChuyenVaoChuyenThu from 'components/Button/ButtonChuyenVaoChuyenThu';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import ButtonDongChuyenThu from 'components/Button/ButtonDongChuyenThu';
import DataTable from 'components/DataTable';
import DeleteConfirmModal from 'components/Modal/ModalConfirmDelete';
import Scan from 'components/Input/Scan';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { makeSelector046ListChildren, makeSelector046RowFirstChild } from 'redux/MIOA_ZTMI046/selectors';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import PrintablePhieuGiaoNhanChuyenThu from 'components/Printable/PrintablePhieuGiaoNhanChuyenThu';
import PrintablePhieuGiaoTuiThu from 'components/Printable/PrintablePhieuGiaoTuiThu';
import { SipDataType, SipFlowType, SipDataTorType } from 'utils/enums';
import PrintableMaCoTai from 'components/Printable/PrintableMaCoTai';

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
    getListTaiKien();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idChuyenThu]);

  const getListTaiKien = (): void => {
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

  const handleSuccessDongChuyenThu = (): void => {
    getListTaiKien();
    setSelectedTaiKienIds([]);
  };

  const renderPrintButtonPhieuGiaoNhanChuyenThu = (): JSX.Element => (
    <ButtonPrintable
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
          <ButtonGoBack />
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
            onSuccess={handleSuccessDongChuyenThu}
          />
        </div>
      </Row>
    );
  };

  const renderDescriptionServiceShipping = (): JSX.Element => (
    <Row className="sipSummaryContent">
      <Col lg="5" xs="12">
        <Row>
          <Col xs="5">{t('Mã chuyến thư')}: </Col>
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
    <Row className="sipBgWhiteContainer justify-content-between">
      <Col md={6}>
        <Scan
          flow={SipFlowType.KHAI_THAC_DI}
          onSuccess={getListTaiKien}
          placeholder={t('Quét mã tải/kiện')}
          targetItemId={idChuyenThu}
        />
      </Col>
      <Col>
        {/*_______________temporary hide because of no requirement______________*/}
        <Button color="gray" className="sipTitleRightBlockBtnIcon sipBoxShadow hide">
          <img src={'../../assets/img/icon/iconRemove2.svg'} alt="VTPostek" />
        </Button>
      </Col>
    </Row>
  );

  // const handleRedirectDetail = useCallback(
  //   (item: API.Child): void => {
  //     dispatch(
  //       action_MIOA_ZTMI046(
  //         {
  //           IV_TOR_ID: item.TOR_ID,
  //           IV_PAGENO: '1',
  //           IV_NO_PER_PAGE: '10',
  //         },
  //         {
  //           onSuccess: (): void => {
  //             dispatch(push(generatePath(routesMap.DANH_SACH_PHIEU_GUI_TRONG_TAI, { idTai: item.TOR_ID })));
  //           },
  //         },
  //       ),
  //     );
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [dataChuyenThuChildren],
  // );

  const renderPrintButton = (item: API.Child): JSX.Element => {
    let children = <PrintablePhieuGiaoTuiThu idChuyenThu={get(item, 'TOR_ID', '')} />;
    if (SipDataType.KIEN === item.TOR_TYPE) {
      children = <PrintablePhieuGiaoNhanChuyenThu idChuyenThu={get(item, 'TOR_ID', '')} />;
    }

    let title = t('In danh sách tải kiện thuộc chuyến thư');
    if (get(item, 'TOR_TYPE', '') === SipDataType.TAI) {
      title = t('In danh sách bảng kê thuộc chuyến tải');
    }

    return (
      <ButtonPrintable
        btnProps={{
          className: 'SipTableFunctionIcon',
          children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
        }}
        modalBodyProps={{
          children: children,
        }}
        modalHeaderProps={{
          children: title,
        }}
      />
    );
  };

  const inMaCoTaiButton = (idTai: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <i className="fa fa-barcode fa-lg color-blue" />,
      }}
      modalBodyProps={{
        children: <PrintableMaCoTai idTai={idTai} />,
      }}
      modalHeaderProps={{
        children: t('In mã cổ tải'),
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
        Cell: ({ row }: Cell<API.Child>): string => {
          const torType = get(row, 'original.TOR_TYPE', '');
          if (torType === SipDataType.BUU_GUI || torType === SipDataType.KIEN) {
            return get(row, 'original.PACKAGE_ID', '');
          }
          return get(row, 'original.TOR_ID', '');
        },
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('Số lượng'),
        accessor: 'child_count',
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
        // accessor: 'TOR_TYPE',
        Cell: ({ row }: Cell<API.Child>): string => {
          const value = get(SipDataTorType, get(row, 'original.TOR_TYPE', ''), '');
          if (value) return value;
          return '';
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.Child>): JSX.Element => (
          <>
            {inMaCoTaiButton(get(row, 'values.TOR_ID', ''))}
            {renderPrintButton(row.original)}
            <Button className="SipTableFunctionIcon" onClick={handleDeleteItem(get(row, 'values.TOR_ID', ''))}>
              <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
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
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={dataChuyenThuChildren} />
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
          <ButtonGoBack />
          {t('Quay lại')}
        </h1>
      </Row>
      <div className="row mb-5" />
      <h3 className="text-center">{t('Không tìm thấy dữ liệu!')}</h3>
    </Fade>
  );
};

export default DanhSachPhieuGuiTrongChuyenThu;
