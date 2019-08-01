import * as React from 'react';
import { Button, Input, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { push } from 'connected-react-router';
import { map } from 'lodash';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { action_MIOA_ZTMI023 } from 'redux/MIOA_ZTMI023/actions';
import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { makeSelectorNhanChuyenThu } from 'redux/MIOA_ZTMI023/selectors';
import { makeSelectorCountMT_ZTMI046 } from 'redux/MIOA_ZTMI046/selectors';
import { HttpRequestErrorType } from '../../../utils/HttpRequetsError';
import routesMap from '../../../utils/routesMap';

// eslint-disable-next-line max-lines-per-function
const ShippingInformation: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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

  function renderPagination(): JSX.Element {
    return (
      <Pagination className="sipPagination">
        <PaginationItem className="sipPaginationPrev pull-left">
          <PaginationLink previous href="#">
            <i className="fa fa-arrow-left"></i>
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
            <i className="fa fa-arrow-right"></i>
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
  const [codeChuyenThu, setCodeChuyenThu] = React.useState<string>('4800000278');

  function handleChangeCodeChuyenThu(e: any) {
    setCodeChuyenThu(e.target.value);
  }

  const [error, setError] = React.useState<string>('');
  function handleSearchCodeChuyenThu() {
    const payload = {
      IV_ID: codeChuyenThu,
    };
    const payload046 = {
      IV_TOR_ID: codeChuyenThu,
    };
    dispatch(action_MIOA_ZTMI046(payload046));
    dispatch(
      action_MIOA_ZTMI023(payload, {
        onFailure: (error: HttpRequestErrorType): void => {
          setError(error.messages[0]);
        },
      }),
    );
  }

  const dataNhanChuyenThu = useSelector(makeSelectorNhanChuyenThu, shallowEqual);
  const countChuyenThu = useSelector(makeSelectorCountMT_ZTMI046, shallowEqual);

  // console.log(count);

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
          {t('HYPHEN', ':')} <strong>3</strong>
        </div>
      </Row>
    );
  }
  const handleRedirectDetail = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      dispatch(push(`${routesMap.thongTinTai}/${item.TOR_ID}`));
    };
  };
  // eslint-disable-next-line max-lines-per-function
  function renderTable(): JSX.Element {
    return (
      <Row className="sipTableContainer">
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
            {error && <div className="text-center">{error}</div>}
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
