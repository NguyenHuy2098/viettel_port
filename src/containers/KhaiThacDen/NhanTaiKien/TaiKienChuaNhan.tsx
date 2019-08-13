import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { match, withRouter } from 'react-router-dom';
import { Button, Row, Input, Pagination, PaginationItem, PaginationLink, Table, Label } from 'reactstrap';
import { push } from 'connected-react-router';
import { get, map } from 'lodash';
import moment from 'moment';

import { action_MIOA_ZTMI046 } from 'redux/MIOA_ZTMI046/actions';
import { makeSelectorCountMT_ZTMI046, useGet_MT_ZTMI046_OUT } from 'redux/MIOA_ZTMI046/selectors';
import routesMap from 'utils/routesMap';
import { ChangeEvent } from 'react';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const TaiKienChuaNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const idChuyenThu = get(props, 'match.params.idChuyenThu', '');
  const manifestForwardingOrderList = useGet_MT_ZTMI046_OUT();
  const countTaiKien = useSelector(makeSelectorCountMT_ZTMI046, shallowEqual);

  React.useEffect((): void => {
    const payload = {
      IV_TOR_ID: idChuyenThu,
    };
    dispatch(action_MIOA_ZTMI046(payload));
  }, [dispatch, idChuyenThu]);

  const [idTaiKien, setIdTaiKien] = React.useState<string>('');

  function handleSearchTaiKien(): void {
    console.log(idTaiKien);
  }

  function handleChangeTaiKien(event: ChangeEvent<HTMLInputElement>): void {
    setIdTaiKien(event.target.value);
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

  function renderAction(): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-print fa-lg color-green" />
        </Button>
      </>
    );
  }
  const handleRedirectDetail = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      dispatch(push(`${routesMap.nhanBangKePhieuGui}/${item.TOR_ID}`));
    };
  };

  function renderTable(): JSX.Element {
    return (
      <Row className="sipTableContainer">
        <Table striped hover>
          <thead>
            <tr>
              <th></th>
              <th>{t('Mã tải kiện')}</th>
              <th>{t('Điểm đi')}</th>
              <th>{t('Điểm đến')}</th>
              <th>{t('Số lượng')}</th>
              <th>{t('Trọng lượng')}</th>
              <th>{t('Ngày tạo')}</th>
              <th>{t('Loại')}</th>
              <th>{t('Quản trị')}</th>
            </tr>
          </thead>
          <tbody>
            {map(get(manifestForwardingOrderList, 'Row[0].CHILDS'), (item: API.Child, index): JSX.Element | null => {
              if (item.LIFECYCLE === 106) {
                return (
                  <tr key={index} onClick={handleRedirectDetail(item)}>
                    <td>
                      <Label check>
                        <Input type="checkbox" />
                      </Label>
                    </td>
                    <td>{item.TOR_ID}</td>
                    <td>{item.SRC_LOC_IDTRQ}</td>
                    <td>{item.DES_LOC_IDTRQ}</td>
                    <td>{countTaiKien}</td>
                    <td>{item.GRO_WEI_VAL}</td>
                    <td>{moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY ')}</td>
                    <td>{item.TOR_TYPE === 'ZC2' ? 'Tải' : 'Kiện'}</td>
                    <td className="SipTableFunctionIcon">{renderAction()}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </Table>
        {renderPagination()}
      </Row>
    );
  }
  return (
    <>
      <Row className="sipBgWhiteContainer">
        <div className="sipScanCodeContainer">
          <Input onChange={handleChangeTaiKien} type="text" placeholder="Tìm kiếm tải kiện" />
          <Button onClick={handleSearchTaiKien} color="primary">
            Tìm kiếm
          </Button>
        </div>
      </Row>
      <div className="row mt-3" />
      {renderTable()}
    </>
  );
};

export default withRouter(TaiKienChuaNhan);
