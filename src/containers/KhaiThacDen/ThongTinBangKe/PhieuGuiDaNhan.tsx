import React, { useMemo } from 'react';
import { Button, Row, Input, Label, InputGroupAddon, InputGroup } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
import { RouteComponentProps } from 'react-router-dom';
import { ceil, get } from 'lodash';
import moment from 'moment';

import DataTable from 'components/DataTable';
import Pagination from 'components/Pagination';
import { makeSelector046ChildrenByLifecycle } from 'redux/MIOA_ZTMI046/selectors';
import { SipDataState } from 'utils/enums';

type Props = RouteComponentProps;

// eslint-disable-next-line max-lines-per-function
const PhieuGuiDaNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const listPhieuGuiDaNhan = useSelector(
    makeSelector046ChildrenByLifecycle([
      SipDataState.PHIEU_GUI_DA_QUET_NHAN_TAI_TTKT,
      SipDataState.PHIEU_GUI_DA_QUET_NHAN_TAI_BUU_CUC,
    ]),
  );
  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <Label check>
              <Input type="checkbox" />
            </Label>
          );
        },
      },
      {
        Header: t('Mã phiếu gửi'),
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
        accessor: 'count',
      },
      {
        Header: t('Trọng lượng'),
        Cell: ({ row }: Cell): string => {
          return `${ceil(get(row, 'original.GRO_WEI_VAL'), 2)} ${get(row, 'original.GRO_WEI_UNI')}`;
        },
      },
      {
        Header: t('Ngày tạo'),
        Cell: ({ row }: Cell): string => {
          return moment(get(row, 'original.DATETIME_CHLC'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
      {
        Header: t('Loại'),
        accessor: 'TOR_TYPE',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <Button className="SipTableFunctionIcon">
              <i className="fa fa-print fa-lg color-green" />
            </Button>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function renderToolbar(): JSX.Element {
    return (
      <Row>
        <div className="btn-toolbar col-10">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <span className="input-group-text">
                <i className="fa fa-search" />
              </span>
            </InputGroupAddon>
            <Input className="w-25 mr-2" type="text" placeholder={t('Tìm kiếm phiếu gửi')} />
          </InputGroup>
          <Button className="mr-2" color="primary">
            {t('Tìm kiếm')}
          </Button>
        </div>
      </Row>
    );
  }

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={listPhieuGuiDaNhan} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={1}
          // onPageChange={handlePageChange}
        />
      </Row>
    </>
  );
};

export default withRouter(PhieuGuiDaNhan);
