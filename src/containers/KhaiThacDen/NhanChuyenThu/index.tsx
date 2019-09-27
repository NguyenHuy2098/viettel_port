import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { push } from 'connected-react-router';
import { ceil, get } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import Scan from 'components/Input/Scan';
import { makeSelectorMaBP, makeSelectorPreferredUsername } from 'redux/auth/selectors';
import { action_MIOA_ZTMI022 } from 'redux/MIOA_ZTMI022/actions';
import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorRow, makeSelectorPagingCount, makeSelectorTotalPage } from 'redux/MIOA_ZTMI047/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
const ShippingInformation: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const maBP = useSelector(makeSelectorMaBP);
  const userId = useSelector(makeSelectorPreferredUsername);
  const totalPage = useSelector(makeSelectorTotalPage(SipDataType.CHUYEN_THU, SipDataState.CHUYEN_THU_DA_QUET_NHAN));
  const listChuyenThuDaQuetNhan = useSelector(
    makeSelectorRow(SipDataType.CHUYEN_THU, SipDataState.CHUYEN_THU_DA_QUET_NHAN),
  );
  const countChuyenThuDaQuetNhan = useSelector(
    makeSelectorPagingCount(SipDataType.CHUYEN_THU, SipDataState.CHUYEN_THU_DA_QUET_NHAN),
  );
  const [idChuyenThu, setIdChuyenThu] = useState<string>();

  const getListChuyenThuDaQuetNhan = (IV_PAGENO = 1): void => {
    dispatch(
      action_MIOA_ZTMI047({
        IV_TOR_TYPE: SipDataType.CHUYEN_THU,
        IV_CUST_STATUS: SipDataState.CHUYEN_THU_DA_QUET_NHAN,
        IV_PAGENO: IV_PAGENO,
      }),
    );
  };

  useEffect(() => {
    getListChuyenThuDaQuetNhan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeCodeChuyenThu = (event: ChangeEvent<HTMLInputElement>): void => {
    setIdChuyenThu(event.target.value);
  };

  const handleQuetNhanChuyenThu = (): void => {
    dispatch(
      action_MIOA_ZTMI023(
        {
          IV_ID: idChuyenThu,
        },
        {
          onSuccess: (data: API.MIOAZTMI023Response) => {
            const infoChuyenThu: API.RowResponseZTMI023OUT = get(data, 'MT_ZTMI023_OUT.row[0]');
            dispatch(
              action_MIOA_ZTMI022(
                {
                  row: {
                    CU_NO: '',
                    FU_NO: get(infoChuyenThu, 'TOR_ID'),
                    LOC_ID: maBP,
                    STATUS_ID: '1',
                    USER_ID: userId,
                  },
                },
                // {
                //   onSuccess: (data: API.MIOAZTMI022Response) => {
                //     console.log(data);
                //   },
                // },
              ),
            );
          },
        },
      ),
    );
  };

  const renderOrderInformationTitle = (): JSX.Element => (
    <Row className="mb-3 sipTitleContainer">
      <Col className="px-0" md={9}>
        <h3>{t('Nhận chuyến thư')}</h3>
      </Col>
      <Col className="px-0" md={3}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <span className="input-group-text">
              <i className="fa fa-search" />
            </span>
          </InputGroupAddon>
          <Input className="w-25" type="search" placeholder={t('Tra cứu chuyến thư')} />
        </InputGroup>
      </Col>
    </Row>
  );

  const renderFindOrder = (): JSX.Element => (
    <Row className="sipBgWhiteContainer d-flex justify-content-between">
      <Col md={10}>
        <Scan
          buttonProps={{
            onClick: handleQuetNhanChuyenThu,
          }}
          onChange={handleChangeCodeChuyenThu}
          placeholder={t('Quét mã chuyến thư')}
        />
      </Col>
      <Col className="d-flex justify-content-end align-items-center" md={2}>
        {t('Tổng số')}
        {t('HYPHEN', ':')}&nbsp;<strong>{countChuyenThuDaQuetNhan}</strong>
      </Col>
    </Row>
  );

  const handlePageChange = ({ selected }: { selected: number }): void => {
    getListChuyenThuDaQuetNhan(selected + 1);
  };

  const handleRedirectDetail = useCallback(
    (item: API.RowMTZTMI047OUT): void => {
      dispatch(push(generatePath(routesMap.THONG_TIN_CHUYEN_THU, { idChuyenThu: item.TOR_ID })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const columns = useMemo(
    () => [
      {
        Header: t('Mã chuyến thư'),
        accessor: 'TOR_ID',
      },
      {
        Header: t('Bưu cục đi'),
        accessor: 'LOG_LOCID_FR',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'LOG_LOCID_TO',
      },
      {
        Header: t('Số lượng'),
        accessor: 'ITEM_NO',
      },
      {
        Header: t('Trọng lượng'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return `${ceil(get(row, 'original.NET_WEI_VAL'), 2)} ${get(row, 'original.NET_WEI_UNI')}`;
        },
      },
      {
        Header: t('Ngày tạo'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div>
      {renderOrderInformationTitle()}
      {renderFindOrder()}
      <Row className="sipTableContainer sipTableRowClickable">
        <DataTable columns={columns} data={listChuyenThuDaQuetNhan} onRowClick={handleRedirectDetail} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onPageChange={handlePageChange}
        />
      </Row>
    </div>
  );
};
export default ShippingInformation;
