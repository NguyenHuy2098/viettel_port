import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { map } from 'lodash';
import { Button, Col, Input, Label, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorCountTaiChuaHoanThanh, makeSelectorTaiChuaHoanThanh } from 'redux/MIOA_ZTMI047/selectors';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';

// eslint-disable-next-line max-lines-per-function
const TaiChuaHoanThanh: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const listTaiChuaHoanThanh = useSelector(makeSelectorTaiChuaHoanThanh);
  const countTaiChuaHoanThanh = useSelector(makeSelectorCountTaiChuaHoanThanh);

  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    const payload = {
      IV_TOR_ID: event.target.value,
      IV_TOR_TYPE: 'ZC2',
      IV_FR_LOC_ID: 'BDH',
      IV_CUST_STATUS: '101',
    };
    dispatch(action_MIOA_ZTMI047(payload));
  }

  function printTai(tai: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (): void => {
      console.log('print', tai.TOR_ID);
    };
  }

  function editTai(tai: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (): void => {
      console.log('edit', tai.TOR_ID);
    };
  }

  function deleteTai(tai: API.RowMTZTMI047OUT): (event: React.MouseEvent) => void {
    return (): void => {
      const payload = {
        IV_FLAG: '3',
        IV_TOR_TYPE: 'ZC2',
        IV_TOR_ID_CU: tai.TOR_ID,
        IV_SLOCATION: '',
        IV_DLOCATION: '',
        IV_DESCRIPTION: '',
        T_ITEM: [
          {
            ITEM_ID: '',
            ITEM_TYPE: '',
          },
        ],
      };
      if (!window.confirm('Bạn có chắc chắn?')) return;
      dispatch(
        action_MIOA_ZTMI016(payload, {
          onFailure: (error: HttpRequestErrorType): void => {
            console.log(error);
          },
          onSuccess: (): void => {
            const payload = {
              IV_TOR_ID: '',
              IV_TOR_TYPE: 'ZC2',
              IV_FR_LOC_ID: 'BDH',
              IV_CUST_STATUS: '101',
            };
            dispatch(
              action_MIOA_ZTMI047(payload, {
                onFailure: (error: HttpRequestErrorType): void => {
                  console.log(error.messages);
                },
              }),
            );
          },
        }),
      );
    };
  }

  function renderAction(taiChuaHoanThan: API.RowMTZTMI047OUT): JSX.Element {
    return (
      <>
        <Button onClick={printTai(taiChuaHoanThan)}>
          <i className="fa fa-print fa-lg color-green" />
        </Button>
        <Button onClick={editTai(taiChuaHoanThan)}>
          <i className="fa fa-pencil fa-lg color-blue" />
        </Button>
        <Button onClick={deleteTai(taiChuaHoanThan)}>
          <i className="fa fa-trash-o fa-lg color-red" />
        </Button>
      </>
    );
  }

  function renderPagination(): JSX.Element {
    return (
      <Pagination className="sipPagination">
        <PaginationItem className="sipPaginationPrev pull-left">
          <PaginationLink previous href="#">
            <i className="fa fa-arrow-left" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem className="sipPaginationNext pull-right">
          <PaginationLink next href="#">
            <i className="fa fa-arrow-right" />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }

  function renderTable(): JSX.Element {
    return (
      <Table striped hover>
        <thead>
          <tr>
            <th />
            <th>{t('Mã tải')}</th>
            <th>{t('Điểm đến')}</th>
            <th>{t('SL')}</th>
            <th>{t('Người nhập')}</th>
            <th>{t('Ngày nhập')}</th>
            <th>{t('Ghi chú')}</th>
            <th>{t('Quản trị')}</th>
          </tr>
        </thead>
        <tbody>
          {map(
            listTaiChuaHoanThanh,
            (tai: API.RowMTZTMI047OUT): JSX.Element => (
              <tr key={tai.TOR_ID}>
                <td className="text-center">
                  <Label check>
                    <Input type="checkbox" />
                  </Label>
                </td>
                <td>{tai.TOR_ID}</td>
                <td>{tai.LOG_LOCID_DES}</td>
                <td>{tai.ITEM_NO}</td>
                <td>-</td>
                <td>{moment(parseInt(tai.DATETIME_CHLC || '0')).format()}</td>
                <td>{tai.EXEC_CONT || '-'}</td>
                <td className="SipTableFunctionIcon">{renderAction(tai)}</td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
    );
  }

  return (
    <>
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="sipTitleRightBlockInput m-0">
            <i className="fa fa-search" />
            <Input type="text" placeholder={t('Tìm kiếm tải')} onChange={handleSearch} />
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>{countTaiChuaHoanThanh}</span>
          </p>
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer">
        {renderTable()}
        {renderPagination()}
      </Row>
    </>
  );
};

export default TaiChuaHoanThanh;