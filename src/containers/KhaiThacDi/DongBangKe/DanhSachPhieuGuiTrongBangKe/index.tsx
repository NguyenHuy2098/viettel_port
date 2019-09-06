import * as React from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
import { get, map, size } from 'lodash';
import { useTranslation } from 'react-i18next';
import { goBack } from 'connected-react-router';
import { match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Cell } from 'react-table';
import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { makeSelectorMT_ZTMI046_Instane, makeSelectorMT_ZTMI046_Instane_Children } from 'redux/MIOA_ZTMI046/selectors';
import moment from 'moment';
import { push } from 'connected-react-router';
import { generatePath } from 'react-router-dom';
import routesMap from 'utils/routesMap';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const DanhSachPhieuGuiTrongBangKe: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const idBangKe = get(props, 'match.params.idBangKe', '');
  const dataBangKe = useSelector(makeSelectorMT_ZTMI046_Instane);
  const dataBangKeChild = useSelector(makeSelectorMT_ZTMI046_Instane_Children);

  const payload046 = {
    IV_TOR_ID: idBangKe,
    IV_PAGENO: '1',
    IV_NO_PER_PAGE: '10',
  };

  React.useEffect((): void => {
    dispatch(action_MIOA_ZTMI046(payload046));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idBangKe]);

  const handleBack = (): void => {
    dispatch(goBack());
  };

  function handleGotoEditForwardingOrder(idDonHang: string): (event: React.FormEvent<HTMLInputElement>) => void {
    return (event: React.FormEvent<HTMLInputElement>): void => {
      dispatch(push(generatePath(routesMap.NHAP_PHIEU_GUI_TRONG_NUOC, { idDonHang })));
    };
  }

  function renderTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">
          <Button onClick={handleBack} className="sipTitleBtnBack">
            <i className="fa fa-arrow-left backIcon" />
          </Button>
          {t('Danh sách phiếu gửi trong bảng kê')}
        </h1>
        <div className="sipTitleRightBlock">
          <Button className="sipTitleRightBlockBtnIcon">
            <i className="fa fa-print" />
          </Button>
          <Button>
            <i className="fa fa-exchange" />
            {t('Chuyển tải')}
          </Button>
          <Button>
            <i className="fa fa-shopping-bag" />
            {t('Đóng tải')}
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
          {t('Tổng số')}: {size(dataBangKeChild)}
        </Col>
      </Row>
    );
  }

  function renderShippingInformationAndScanCode(): JSX.Element {
    return (
      <div className="sipContentContainer">
        <Row className="sipLine mt-3 mb-3" />
        <div className="d-flex">
          <div className="sipTitleRightBlockInput m-0">
            <i className="fa fa-barcode" />
            <Input type="text" placeholder={t('Quét mã bảng kê phiếu gửi')} />
          </div>
          <Button color="primary" className="ml-2">
            {t('Quét mã')}
          </Button>
          <Button color="white" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow">
            <i className="fa fa-trash-o" />
          </Button>
        </div>
      </div>
    );
  }
  const dataTable = map(
    dataBangKeChild,
    (item: API.Child): API.Child => {
      return {
        TOR_ID: item.TOR_ID,
        DES_LOC_IDTRQ: item.DES_LOC_IDTRQ,
        GRO_WEI_VAL: `${parseFloat(get(item, 'GRO_WEI_VAL', '')).toFixed(2)} ${item.GRO_WEI_UNI}`,
        GRO_WEI_UNI: item.GRO_WEI_UNI,
        DATETIME_CHLC: moment(get(item, 'DATETIME_CHLC', ''), 'YYYYMMDDHHhhmmss').format(' DD/MM/YYYY '),
      };
    },
  );

  const columns = useMemo(
    () => [
      {
        Header: t('Mã phiếu gửi'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Điểm đến'),
        accessor: 'DES_LOC_IDTRQ',
      },
      {
        Header: t('Số lượng'),
        accessor: '',
        Cell: ({ row }: Cell): JSX.Element => {
          return <>Chưa có API</>;
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
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Button
                className="SipTableFunctionIcon"
                onClick={handleGotoEditForwardingOrder(get(row, 'values.TOR_ID'))}
              >
                <i className="fa fa-pencil fa-lg color-blue" />
              </Button>
              <Button className="SipTableFunctionIcon">
                <i className="fa fa-trash-o fa-lg color-red" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      {renderTitle()}
      {renderDescriptionServiceShipping()}
      {renderShippingInformationAndScanCode()}
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={dataTable} />
      </Row>
    </>
  );
};
export default DanhSachPhieuGuiTrongBangKe;
