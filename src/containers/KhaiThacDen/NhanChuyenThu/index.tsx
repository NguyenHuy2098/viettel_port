import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Input, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { push, replace, getSearch } from 'connected-react-router';
import { get, isArray, isEmpty, isNil, map } from 'lodash';
import queryString from 'query-string';

import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { makeSelectorNhanChuyenThu } from 'redux/MIOA_ZTMI023/selectors';
import { makeSelectorCountMT_ZTMI046 } from 'redux/MIOA_ZTMI046/selectors';
import { AppStateType } from 'redux/store';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
const ShippingInformation: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const search = useSelector<AppStateType, string>(getSearch);
  const dataNhanChuyenThu = useSelector(makeSelectorNhanChuyenThu, shallowEqual);
  const countChuyenThu = useSelector(makeSelectorCountMT_ZTMI046, shallowEqual);
  const [codeChuyenThu, setCodeChuyenThu] = useState<string>('');
  const [error, setError] = useState<string>('');

  // useEffect((): void => {
  //   dispatch(
  //     action_MIOA_ZTMI022({
  //       CU_NO: '',
  //       FU_NO: '4800000037',
  //       STATUS_ID: '1',
  //       USER_ID: 'KT1',
  //       LOC_ID: 'HUB1',
  //     }),
  //   );
  // }, [dispatch]);

  useEffect((): void => {
    const searchObject = queryString.parse(search);
    let chuyenThu = get(searchObject, 'ZC3', codeChuyenThu);
    if (!isEmpty(chuyenThu) && !isNil(chuyenThu)) {
      if (isArray(chuyenThu)) {
        setCodeChuyenThu(chuyenThu[0]);
        chuyenThu = chuyenThu[0];
      } else {
        setCodeChuyenThu(chuyenThu);
      }
      dispatch(
        action_MIOA_ZTMI046({
          IV_TOR_ID: chuyenThu,
        }),
      );
      dispatch(
        action_MIOA_ZTMI023(
          {
            IV_ID: chuyenThu,
          },
          {
            onFailure: (error: HttpRequestErrorType): void => {
              setError(error.messages[0]);
            },
          },
        ),
      );
    }
  }, [search]);

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

  function renderOrderInformationTitle(): JSX.Element {
    return (
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Thông tin chuyến thư')}</h1>
      </Row>
    );
  }

  function handleChangeCodeChuyenThu(e: ChangeEvent<HTMLInputElement>): void {
    setCodeChuyenThu(e.target.value);
  }

  function handleSearchCodeChuyenThu(): void {
    dispatch(replace({ search: queryString.stringify({ ZC3: codeChuyenThu }) }));
  }

  function renderFindOrder(): JSX.Element {
    return (
      <Row className="sipBgWhiteContainer d-flex justify-content-between">
        <div className="sipScanCodeContainer">
          <Input
            type="text"
            placeholder="Quét mã chuyến thư"
            value={codeChuyenThu}
            onChange={handleChangeCodeChuyenThu}
          />
          <Button onClick={handleSearchCodeChuyenThu} color="primary">
            {t('Tìm kiếm')}
          </Button>
        </div>
        <div className="sipTitleRightBlock sipTitleRightBlock2">
          {t('Tổng số')}
          {t('HYPHEN', ':')}&nbsp;<strong>{countChuyenThu}</strong>
        </div>
      </Row>
    );
  }
  const handleRedirectDetail = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      dispatch(push(`${routesMap.NHAN_TAI_KIEN}/${item.TOR_ID}`));
    };
  };
  // eslint-disable-next-line max-lines-per-function
  function renderTable(): JSX.Element {
    return (
      <Row className="sipTableContainer">
        {error && <span className="text-center">{error}</span>}
        <Table striped hover>
          <thead>
            <tr>
              <th>{t('Mã chuyến thư')}</th>
              <th>{t('Bưu cục đi')}</th>
              <th>{t('Bưu cục đến')}</th>
              <th>{t('Số lượng')}</th>
              <th>{t('Trọng lượng')}</th>
              <th>{t('Ngày tạo')}</th>
            </tr>
          </thead>
          <tbody>
            {map(
              dataNhanChuyenThu,
              (item: API.RowResponseZTMI023OUT, index): JSX.Element => {
                return (
                  <tr key={index} onClick={handleRedirectDetail(item)}>
                    <td>{item.TOR_ID}</td>
                    <td>{item.FR_LOG_ID}</td>
                    <td>{item.TO_LOG_ID}</td>
                    <td>{countChuyenThu}</td>
                    <td>{item.GRO_WEI_VAL}</td>
                    <td>{item.CREATED_ON}</td>
                  </tr>
                );
              },
            )}
          </tbody>
        </Table>
        {renderPagination()}
      </Row>
    );
  }
  return (
    <div>
      {renderOrderInformationTitle()}
      {renderFindOrder()}
      {renderTable()}
    </div>
  );
};
export default ShippingInformation;
