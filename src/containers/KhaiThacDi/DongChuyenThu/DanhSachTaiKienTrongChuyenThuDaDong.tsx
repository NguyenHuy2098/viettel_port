import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { match } from 'react-router-dom';
import { Cell } from 'react-table';
import { Button, Col, Fade, Input, Row } from 'reactstrap';
import { find, get, map, size, slice, findIndex, join, trim } from 'lodash';
import moment from 'moment';

import Pagination from 'components/Pagination';
import DataTable from 'components/DataTable';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import PrintablePhieuGiaoTuiThu from 'components/Printable/PrintablePhieuGiaoTuiThu';
import PrintablePhieuGiaoNhanChuyenThu from 'components/Printable/PrintablePhieuGiaoNhanChuyenThu';
import { useSipDataType } from 'hooks/useTranslations';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import {
  makeSelector046RowFirstChild,
  makeSelector046ListChildren,
  makeSelector046TotalPage,
  makeSelector046EVTotalItem,
} from 'redux/MIOA_ZTMI046/selectors';
import { SipDataType } from 'utils/enums';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongChuyenThuDaDong: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const idChuyenThu = get(props, 'match.params.idChuyenThu', '');
  const dataChuyenThu = useSelector(makeSelector046RowFirstChild);
  const dataChuyenThuChild = useSelector(makeSelector046ListChildren);
  const totalPage046 = useSelector(makeSelector046TotalPage);
  const totalItem046 = useSelector(makeSelector046EVTotalItem);

  const dataTableOrigin = map(
    dataChuyenThuChild,
    (item: API.Child): API.Child => {
      return {
        TOR_ID: item.TOR_ID ? item.TOR_ID : '',
        DES_LOC_IDTRQ: item.DES_LOC_IDTRQ ? item.DES_LOC_IDTRQ : '',
        SRC_LOC_IDTRQ: item.SRC_LOC_IDTRQ ? item.SRC_LOC_IDTRQ : '',
        GRO_WEI_VAL: `${parseFloat(get(item, 'GRO_WEI_VAL', '')).toFixed(2)} ${item.GRO_WEI_UNI}`,
        GRO_WEI_UNI: item.GRO_WEI_UNI ? item.GRO_WEI_UNI : '',
        DATETIME_CHLC: moment(get(item, 'DATETIME_CHLC', ''), 'YYYYMMDDhhmmss').format('DD/MM/YYYY'),
        child_count: item.child_count,
        TOR_TYPE: item.TOR_TYPE ? item.TOR_TYPE : '',
        PACKAGE_ID: item.PACKAGE_ID,
      };
    },
  );

  const [torIdSearch, setTorIdSearch] = useState<string>('');
  const [dataTable, setDataTable] = useState<API.Child[]>([]);

  useEffect((): void => {
    setDataTable(dataTableOrigin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChuyenThuChild]);

  function handleChangeTextboxValue(setValueFunction: Function): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      setValueFunction(event.currentTarget.value);
    };
  }

  function handleSearchPhieuGui(): void {
    if (size(trim(torIdSearch)) > 0) {
      const result = find(dataTableOrigin, (item: API.Child) => {
        const thisTorId =
          item.TOR_TYPE === SipDataType.BUU_GUI || item.TOR_TYPE === SipDataType.KIEN
            ? item.PACKAGE_ID
            : join(
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
            trim(torIdSearch),
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
      } else {
        setDataTable([]);
      }
    } else {
      setDataTable(dataTableOrigin);
    }
  }

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

  useEffect((): void => {
    getListTaiKien();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idChuyenThu]);

  const renderPrintButtonPhieuGiaoNhanChuyenThu = (): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        title: t('In'),
        className: 'sipTitleRightBlockBtnIcon',
        children: <i className="fa fa-print" />,
      }}
      modalBodyProps={{
        children: <PrintablePhieuGiaoNhanChuyenThu idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In th??ng tin chuy???n th??'),
      }}
    />
  );

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <ButtonGoBack />
          {t('Danh s??ch t???i/ki???n trong chuy???n th??')}
        </h1>
        <div className="sipTitleRightBlock">
          {renderPrintButtonPhieuGiaoNhanChuyenThu()}
          {/* <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button> */}
        </div>
      </Row>
    );
  }

  function renderDescriptionServiceShipping(): JSX.Element {
    return (
      <Row className="sipSummaryContent">
        <Col lg="5" xs="12">
          <Row>
            <Col xs="5">{t('M?? chuy???n th??')}: </Col>
            <Col xs="7">{get(dataChuyenThu, 'TOR_ID', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Tr???ng l?????ng')}: </Col>
            <Col xs="7">
              {parseFloat(get(dataChuyenThu, 'NET_WEI_VAL', '')).toFixed(2)} {get(dataChuyenThu, 'NET_WEI_UNI', '')}
            </Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('??i???m ?????n')}: </Col>
            <Col xs="7">{get(dataChuyenThu, 'LOG_LOCID_DES', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi ch??')}: </Col>
            <Col xs="7">{get(dataChuyenThu, 'EXEC_CONT', '')}</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('T???ng s???')}: {totalItem046}
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
              placeholder={t('T??m ki???m t???i/ki???n')}
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

  const renderPrintButton = (item: API.Child): JSX.Element => {
    let children = <PrintablePhieuGiaoTuiThu idChuyenThu={get(item, 'TOR_ID', '')} />;
    if (SipDataType.KIEN === item.TOR_TYPE) {
      children = <PrintablePhieuGiaoNhanChuyenThu idChuyenThu={get(item, 'TOR_ID', '')} />;
    }
    return (
      <ButtonPrintable
        btnProps={{
          title: t('In'),
          className: 'SipTableFunctionIcon',
          children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
        }}
        modalBodyProps={{
          children: children,
        }}
        modalHeaderProps={{
          children: t('In danh s??ch b???ng k?? thu???c t???i'),
        }}
      />
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: t('M?? t???i/ki???n'),
        accessor: 'TOR_ID',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          const torType = get(row, 'original.TOR_TYPE', '');
          if (torType === SipDataType.BUU_GUI || torType === SipDataType.KIEN) {
            return get(row, 'original.PACKAGE_ID', '');
          }
          return get(row, 'original.TOR_ID', '');
        },
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
          return renderPrintButton(get(row, 'original', ''));
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return dataChuyenThu ? (
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
export default DanhSachPhieuGuiTrongChuyenThuDaDong;
