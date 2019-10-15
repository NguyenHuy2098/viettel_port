import React, { useEffect, useState } from 'react';
import { Button, Col, Fade, Input, Row } from 'reactstrap';
import { find, get, map, size, toNumber } from 'lodash';
import { useTranslation } from 'react-i18next';
import { goBack } from 'connected-react-router';
import { match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { makeSelector046RowFirstChild, makeSelector046ListChildren } from 'redux/MIOA_ZTMI046/selectors';
import moment from 'moment';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import PrintBangKeChiTiet from 'components/Printable/PrintBangKeChiTiet';
import { SipDataTorType } from 'utils/enums';

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
        DATETIME_CHLC: moment(get(item, 'DATETIME_CHLC', ''), 'YYYYMMDDhhmmss').format(' DD/MM/YYYY '),
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
      const result = find(dataTableOrigin, (item: API.Child) => item.TOR_ID === torIdSearch);
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

  const payload046 = {
    IV_TOR_ID: idTai,
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '10',
  };

  const getListPhieuGui = (): void => {
    dispatch(action_MIOA_ZTMI046(payload046));
  };

  React.useEffect((): void => {
    getListPhieuGui();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTai]);

  const handleBack = (): void => {
    dispatch(goBack());
  };

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack} className="sipTitleBtnBack">
            <img className="backIcon" src={'../../assets/img/icon/iconArrowLeft.svg'} alt="VTPostek" />
          </Button>
          {t('Danh sách bảng kê trong tải')}
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
            <Col xs="5">{t('Mã tải')}: </Col>
            <Col xs="7">{get(dataTai, 'TOR_ID', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Trọng lượng')}: </Col>
            <Col xs="7">
              {parseFloat(get(dataTai, 'NET_WEI_VAL', '')).toFixed(2)} {get(dataTai, 'NET_WEI_UNI', '')}
            </Col>
          </Row>
        </Col>
        <Col lg="5" xl={4} xs="12">
          <Row>
            <Col xs="5">{t('Điểm đến')}: </Col>
            <Col xs="7">{get(dataTai, 'LOG_LOCID_DES', '')}</Col>
          </Row>
          <Row>
            <Col xs="5">{t('Ghi chú')}: </Col>
            <Col xs="7">{get(dataTai, 'EXEC_CONT', '')}</Col>
          </Row>
        </Col>
        <Col lg="2" xl={3} xs="12" className="text-right">
          {t('Tổng số')}: {dataTableCount}
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
              placeholder={t('Tìm kiếm bảng kê/phiếu gửi')}
              onChange={handleChangeTextboxValue(setTorIdSearch)}
            />
          </div>
          <Button color="primary" className="ml-2" onClick={handleSearchPhieuGui}>
            {t('Tìm kiếm')}
          </Button>
        </div>
      </div>
    );
  }

  const renderPrintButton = (idChuyenThu: string): JSX.Element => (
    <ButtonPrintable
      btnProps={{
        className: 'SipTableFunctionIcon',
        children: <img src={'../../assets/img/icon/iconPrint.svg'} alt="VTPostek" />,
      }}
      modalBodyProps={{
        children: <PrintBangKeChiTiet idChuyenThu={idChuyenThu} />,
      }}
      modalHeaderProps={{
        children: t('In danh sách bưu gửi của bảng kê'),
      }}
    />
  );

  const columns = useMemo(
    () => [
      {
        Header: t('Mã BK/PG'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đi'),
        accessor: 'SRC_LOC_IDTRQ',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('Số lượng'),
        accessor: 'child_count',
        // Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
        //   return <>Chưa có API</>;
        // },
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GRO_WEI_VAL',
      },
      {
        Header: t('Ngày tạo'),
        accessor: 'DATETIME_CHLC',
      },
      {
        Header: t('Loại'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          const value = get(SipDataTorType, get(row, 'original.TOR_TYPE', ''), '');
          if (value) return value;
          return '';
        },
      },
      {
        Header: t('Quản trị'),
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
      </Row>
    </>
  ) : (
    <Fade in={true} timeout={1000}>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack} className="sipTitleBtnBack">
            <img className="backIcon" src={'../../assets/img/icon/iconArrowLeft.svg'} alt="VTPostek" />
          </Button>
          {t('Quay lại')}
        </h1>
      </Row>
      <div className="row mb-5" />
      <h3 className="text-center">{t('Không tìm thấy dữ liệu!')}</h3>
    </Fade>
  );
};
export default DanhSachPhieuGuiTrongTaiDaDong;
