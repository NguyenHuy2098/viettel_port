import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { match } from 'react-router-dom';
import { Cell } from 'react-table';
import { Button, Col, Fade, Input, Row } from 'reactstrap';
import { find, get, map, size, toNumber, slice, findIndex, join } from 'lodash';
import moment from 'moment';

import Pagination from 'components/Pagination';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import DataTable from 'components/DataTable';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import PrintBangKeChiTiet from 'components/Printable/PrintBangKeChiTiet';
import { useSipDataType } from 'hooks/useTranslations';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import {
  makeSelector046RowFirstChild,
  makeSelector046ListChildren,
  makeSelector046TotalPage,
} from 'redux/MIOA_ZTMI046/selectors';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongTaiDaDong: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const idTai = get(props, 'match.params.idTai', '');
  const dataTai = useSelector(makeSelector046RowFirstChild);
  const dataTaiChild = useSelector(makeSelector046ListChildren);
  const totalPage046 = useSelector(makeSelector046TotalPage);

  const dataTableOrigin = map(
    dataTaiChild,
    (item: API.Child): API.Child => {
      return {
        TOR_ID: item.TOR_ID ? item.TOR_ID : '',
        DES_LOC_IDTRQ: item.DES_LOC_IDTRQ ? item.DES_LOC_IDTRQ : '',
        SRC_LOC_IDTRQ: item.SRC_LOC_IDTRQ ? item.SRC_LOC_IDTRQ : '',
        GRO_WEI_VAL: toNumber(get(item, 'GRO_WEI_VAL', ''))
          ? `${parseFloat(get(item, 'GRO_WEI_VAL', '')).toFixed(2)} ${item.GRO_WEI_UNI}`
          : '',
        GRO_WEI_UNI: item.GRO_WEI_UNI ? item.GRO_WEI_UNI : '',
        DATETIME_CHLC: moment(get(item, 'DATETIME_CHLC', ''), 'YYYYMMDDhhmmss').format('DD/MM/YYYY'),
        TOR_TYPE: item.TOR_TYPE,
        child_count: item.child_count,
      };
    },
  );

  const [torIdSearch, setTorIdSearch] = useState<string>('');
  const [dataTable, setDataTable] = useState<API.Child[]>([]);
  const [dataTableCount, setDataTableCount] = useState<number>(0);

  useEffect((): void => {
    setDataTable(dataTableOrigin);
    setDataTableCount(size(dataTableOrigin));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTaiChild]);

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  }

  function handleSearchPhieuGui(): void {
    if (size(torIdSearch) > 0) {
      const result = find(dataTableOrigin, (item: API.Child) => {
        const thisTorId = join(
          slice(
            item.TOR_ID,
            findIndex(item.TOR_ID, (item: string): boolean => {
              return item !== '0';
            }),
            size(item.TOR_ID),
          ),
          '',
        );
        const thisTorIdSearch = join(
          slice(
            torIdSearch,
            findIndex(torIdSearch, (item: string): boolean => {
              return item !== '0';
            }),
            size(torIdSearch),
          ),
          '',
        );
        return thisTorId === thisTorIdSearch;
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

  const getListPhieuGui = (payload = {}): void => {
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
    getListPhieuGui(payload);
  };

  useEffect((): void => {
    getListPhieuGui();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTai]);

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
          {t('Danh s??ch b???ng k?? trong t???i')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon" title={t('In')}>
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
          {t('T???ng s???')}: {dataTableCount}
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
    () => [
      {
        Header: t('M?? BK/PG'),
        accessor: 'TOR_ID',
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
        // Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
        //   return <>Ch??a c?? API</>;
        // },
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
          return renderPrintButton(get(row, 'values.TOR_ID', ''));
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return dataTai ? (
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
export default DanhSachPhieuGuiTrongTaiDaDong;
