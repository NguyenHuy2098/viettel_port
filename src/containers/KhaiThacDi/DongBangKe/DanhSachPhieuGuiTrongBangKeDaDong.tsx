import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
import { find, get, map, size, trim } from 'lodash';
import { useTranslation } from 'react-i18next';
import { match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Cell } from 'react-table';
import moment from 'moment';
import { default as NumberFormat } from 'react-number-format';

import Pagination from 'components/Pagination';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import DataTable from 'components/DataTable';
import FadedNoData from 'components/NoData/FadedNodata';
// import DeleteConfirmModal from 'components/Modal/ModalConfirmDelete';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import PrintBangKeChiTiet from 'components/Printable/PrintBangKeChiTiet';
import { useSipDataType } from 'hooks/useTranslations';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
// import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import {
  makeSelector046RowFirstChild,
  makeSelector046ListChildren,
  makeSelector046TotalPage,
} from 'redux/MIOA_ZTMI046/selectors';
// import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import { SipDataType } from 'utils/enums';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongBangKeDaDong: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const idBangKe = get(props, 'match.params.idBangKe', '');
  const dataBangKe = useSelector(makeSelector046RowFirstChild);
  const dataBangKeChild = useSelector(makeSelector046ListChildren);
  const totalPage046 = useSelector(makeSelector046TotalPage);

  const dataTableOrigin = map(
    dataBangKeChild,
    (item: API.Child): API.Child => {
      return {
        TOR_ID: item.TOR_ID ? item.TOR_ID : '',
        PACKAGE_ID: item.PACKAGE_ID,
        SRC_LOC_IDTRQ: item.SRC_LOC_IDTRQ ? item.SRC_LOC_IDTRQ : '',
        DES_LOC_IDTRQ: item.DES_LOC_IDTRQ ? item.DES_LOC_IDTRQ : '',
        GRO_WEI_VAL: `${parseFloat(get(item, 'GRO_WEI_VAL', '')).toFixed(2)} ${item.GRO_WEI_UNI}`,
        GRO_WEI_UNI: item.GRO_WEI_UNI ? item.GRO_WEI_UNI : '',
        TOR_TYPE: item.TOR_TYPE ? item.TOR_TYPE : '',
        DATETIME_CHLC: moment(get(item, 'DATETIME_CHLC', ''), 'YYYYMMDDhhmmss').format('DD/MM/YYYY'),
        child_count: item.child_count,
      };
    },
  );

  // const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  // const [deleteTorId, setDeleteTorId] = useState<string>('');
  const [torIdSearch, setTorIdSearch] = useState<string>('');
  const [dataTable, setDataTable] = useState<API.Child[]>([]);
  const [dataTableCount, setDataTableCount] = useState<number>(0);

  useEffect((): void => {
    setDataTable(dataTableOrigin);
    setDataTableCount(size(dataTableOrigin));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBangKeChild]);

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  }

  function handleSearchPhieuGui(): void {
    if (size(torIdSearch) > 0) {
      const result = find(dataTableOrigin, (item: API.Child) => {
        if (item.TOR_TYPE === SipDataType.BUU_GUI) {
          return item.PACKAGE_ID === trim(torIdSearch);
        }
        return item.TOR_ID === trim(torIdSearch);
      });
      if (result) {
        setDataTable([result]);
        setDataTableCount(1);
      } else {
        setDataTable([]);
        setDataTableCount(0);
      }
    } else {
      setDataTable(dataTableOrigin);
      setDataTableCount(size(dataTableOrigin));
    }
  }

  // function toggleDeleteConfirmModal(): void {
  //   setDeleteConfirmModal(!deleteConfirmModal);
  // }

  // function handleDeleteItem(torId: string): (event: React.FormEvent<HTMLInputElement>) => void {
  //   return (event: React.FormEvent<HTMLInputElement>): void => {
  //     event.stopPropagation();
  //     setDeleteTorId(torId);
  //     toggleDeleteConfirmModal();
  //   };
  // }

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

  // const handleDeleteForwardingOrder = (torId: string): void => {
  //   const payload = {
  //     IV_FLAG: '3',
  //     IV_TOR_ID_CU: torId,
  //     IV_SLOCATION: '',
  //     IV_DLOCATION: '',
  //     IV_DESCRIPTION: '',
  //     T_ITEM: [
  //       {
  //         ITEM_ID: '',
  //         ITEM_TYPE: '',
  //       },
  //     ],
  //   };
  //   dispatch(
  //     action_MIOA_ZTMI016(payload, {
  //       onSuccess: (): void => {
  //         alert(t('X??a th??nh c??ng!'));
  //       },
  //       onFailure: (error: HttpRequestErrorType): void => {
  //         alert(error.messages);
  //       },
  //       onFinish: (): void => getListPhieuGui(),
  //     }),
  //   );
  // };

  useEffect((): void => {
    getListPhieuGui();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idBangKe]);

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
          {t('Danh s??ch phi???u g???i trong b???ng k??')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
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
            <Col xs="5">{t('M?? b???ng k??')}: </Col>
            <Col xs="7">{get(dataBangKe, 'TOR_ID', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Tr???ng l?????ng')}: </Col>
            <Col xs="7">
              {parseFloat(get(dataBangKe, 'NET_WEI_VAL', '')).toFixed(2)} {get(dataBangKe, 'NET_WEI_UNI', '')}
            </Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('??i???m ?????n')}: </Col>
            <Col xs="7">{get(dataBangKe, 'LOG_LOCID_DES', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi ch??')}: </Col>
            <Col xs="7">{get(dataBangKe, 'EXEC_CONT', '')}</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('T???ng s???')}:{' '}
          <NumberFormat value={dataTableCount} displayType={'text'} thousandSeparator="." decimalSeparator="," />
        </Col>
      </Row>
    );
  }

  function renderShippingInformationAndScanCode(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <div className="d-flex">
          <div className="sipTitleRightBlockInput m-0">
            <i className="fa fa-search" />
            <Input
              value={torIdSearch}
              type="text"
              placeholder={t('T??m ki???m b???ng k??/phi???u g???i')}
              onChange={handleChangeTextboxValue(setTorIdSearch)}
            />
          </div>
          <Button color="primary" className="ml-2" onClick={handleSearchPhieuGui}>
            {t('T??m ki???m')}
          </Button>
        </div>
      </div>
    );
  }

  const columns = useMemo(
    //eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('M?? b??u g???i'),
        accessor: 'PACKAGE_ID',
      },
      {
        Header: t('??i???m ??i'),
        accessor: 'SRC_LOC_IDTRQ',
      },
      {
        Header: t('??i???m ?????n'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('S??? l?????ng'),
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
        Header: t('Tr???ng l?????ng'),
        accessor: 'GRO_WEI_VAL',
      },
      {
        Header: t('Ng??y t???o'),
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
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return renderPrintButton(get(row, 'original.TOR_ID', ''));
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return dataBangKe ? (
    <>
      {renderTitle()}
      {renderDescriptionServiceShipping()}
      {renderShippingInformationAndScanCode()}
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={dataTable} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage046}
          onThisPaginationChange={onPaginationChange}
        />
      </Row>
      {/* <DeleteConfirmModal
        visible={deleteConfirmModal}
        onDelete={handleDeleteForwardingOrder}
        onHide={toggleDeleteConfirmModal}
        torId={deleteTorId}
      /> */}
    </>
  ) : (
    <FadedNoData />
  );
};
export default DanhSachPhieuGuiTrongBangKeDaDong;
