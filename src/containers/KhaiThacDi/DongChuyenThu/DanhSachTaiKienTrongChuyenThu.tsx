/* eslint-disable max-lines */
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Fade, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { match } from 'react-router-dom';
import { Cell } from 'react-table';
import { ceil, filter, get, includes, map, size } from 'lodash';
import moment from 'moment';

import Pagination from 'components/Pagination';
import ButtonChuyenVaoChuyenThu from 'components/Button/ButtonChuyenVaoChuyenThu';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import ButtonDongChuyenThu from 'components/Button/ButtonDongChuyenThu';
import DataTable from 'components/DataTable';
import DeleteConfirmModal from 'components/Modal/ModalConfirmDelete';
import Scan from 'components/Input/Scan';
import { useSipDataType } from 'hooks/useTranslations';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import {
  makeSelector046EVTotalItem,
  makeSelector046ListChildren,
  makeSelector046RowFirstChild,
  makeSelector046TotalPage,
} from 'redux/MIOA_ZTMI046/selectors';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import PrintablePhieuGiaoNhanChuyenThu from 'components/Printable/PrintablePhieuGiaoNhanChuyenThu';
import PrintablePhieuGiaoTuiThu from 'components/Printable/PrintablePhieuGiaoTuiThu';
import { SipDataType, SipFlowType, IV_FLAG } from 'utils/enums';
import PrintableMaCoTai from 'components/Printable/PrintableMaCoTai';
import { toast } from 'react-toastify';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import { goBack } from 'connected-react-router';

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
  const totalPage046 = useSelector(makeSelector046TotalPage);
  const totalItem046 = useSelector(makeSelector046EVTotalItem);

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [deleteTorId, setDeleteTorId] = useState<string>('');
  const [selectedTaiKienIds, setSelectedTaiKienIds] = useState<string[]>([]);

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

  const getListTaiKien = (payload = {}): void => {
    const payload046 = {
      IV_TOR_ID: idChuyenThu,
      ...payload,
    };
    dispatch(action_MIOA_ZTMI046(payload046));
  };

  const onPaginationChange = (selectedItem: { selected: number }): void => {
    const payload = {
      IV_TOR_ID: idChuyenThu,
      IV_PAGENO: selectedItem.selected + 1,
    };
    getListTaiKien(payload);
  };

  const handleSelectTaiKien = (selectedIds: string[]): void => {
    setSelectedTaiKienIds(selectedIds);
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

  const handleDeleteForwardingOrder = (torId: string): void => {
    const payload = {
      IV_FLAG: IV_FLAG.XOA,
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
          toast(get(error, 'messages[0]'), {
            type: 'error',
          });
        },
        onFinish: (): void => getListTaiKien(),
      }),
    );
  };

  const handleSuccessDongChuyenThu = (): void => {
    getListTaiKien();
    setSelectedTaiKienIds([]);
    dispatch(goBack());
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
            disableButton={size(deselectedTaiKienItems) === size(dataChuyenThuChildren)}
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
        {t('Tổng số')}: {totalItem046}
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
        Header: t('Mã tải/kiện'),
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
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return <>{useSipDataType(get(row, 'original.TOR_TYPE'))}</>;
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
        <DataTable
          columns={columns}
          data={dataChuyenThuChildren}
          onCheckedValuesChange={handleSelectTaiKien}
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
