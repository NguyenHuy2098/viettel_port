import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { push } from 'connected-react-router';
import { map } from 'lodash';
import { Button, Col, Input, Label, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorBangKeChuaDongTai, makeSelectorCountBangKeChuaDongTai } from 'redux/MIOA_ZTMI047/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import routesMap from 'utils/routesMap';
import ModalPopupConfirm from 'components/ModalConfirm/ModalPopupConfirm';
import moment from 'moment';

// eslint-disable-next-line max-lines-per-function
const TaiChuaDongChuyenThu: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getListChuyenThu = useCallback(
    function(payload = {}): void {
      dispatch(
        action_MIOA_ZTMI047({
          IV_TOR_ID: '',
          IV_TOR_TYPE: 'ZC1',
          IV_FR_LOC_ID: 'BHD',
          IV_CUST_STATUS: '101',
          IV_TO_LOC_ID: '',
          ...payload,
        }),
      );
    },
    [dispatch],
  );

  useEffect((): void => getListChuyenThu(), [getListChuyenThu]);

  const countChuyenThuChuaHoanThanh = useSelector(makeSelectorCountBangKeChuaDongTai);
  // eslint-disable-next-line no-undef
  const listChuyenThuChuaHoanThanh = useSelector(makeSelectorBangKeChuaDongTai);

  function handleSearchChuyenThu(e: React.ChangeEvent<HTMLInputElement>): void {
    const payload = {
      IV_TOR_ID: e.target.value,
    };
    getListChuyenThu(payload);
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
  const handleRedirectDetail = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      dispatch(push(`${routesMap.DANH_SACH_PHIEU_GUI_TRONG_BANG_KE}/${item.TOR_ID}`));
    };
  };
  const handleDeleteChuyenThu = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      const payload = {
        IV_FLAG: '3',
        IV_TOR_TYPE: 'ZC1',
        IV_TOR_ID_CU: item.TOR_ID,
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
      dispatch(
        action_MIOA_ZTMI016(payload, {
          onFinish: (): void => {
            const payload = {
              IV_TOR_ID: '',
              IV_TOR_TYPE: 'ZC1',
              IV_FR_LOC_ID: 'BDH',
              IV_CUST_STATUS: '101',
              IV_TO_LOC_ID: '',
            };
            dispatch(action_MIOA_ZTMI047(payload));
          },
        }),
      );
    };
  };

  function renderManifestTableAction(item: API.RowMTZTMI047OUT): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-print fa-lg color-green" />
        </Button>
        <Button onClick={handleRedirectDetail(item)}>
          <i className="fa fa-pencil fa-lg color-blue" />
        </Button>
        <ModalPopupConfirm handleDoSomething={handleDeleteChuyenThu(item)} />
      </>
    );
  }

  function renderTable1(): JSX.Element {
    return (
      <>
        <Table striped hover>
          <thead>
            <tr>
              <th />
              <th>{t('Mã chuyến thư')}</th>
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
              listChuyenThuChuaHoanThanh,
              (item: API.RowMTZTMI047OUT, index): JSX.Element => {
                return (
                  <tr key={index}>
                    <td className="text-center">
                      <Label check>
                        <Input type="checkbox" />
                      </Label>
                    </td>
                    <td>{item.TOR_ID}</td>
                    <td>{item.LOG_LOCID_TO}</td>
                    <td>{item.ITEM_NO}</td>
                    <td />
                    <td>{moment(item.DATETIME_CHLC, 'YYYYMMDDHHmmss').format(' DD/MM/YYYY ')}</td>
                    <td>{item.EXEC_CONT}</td>
                    <td className="SipTableFunctionIcon">{renderManifestTableAction(item)}</td>
                  </tr>
                );
              },
            )}
          </tbody>
        </Table>
        {renderPagination()}
      </>
    );
  }

  return (
    <>
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('Tìm kiếm chuyến thư')} onChange={handleSearchChuyenThu} />
            </div>
            <Button color="primary" className="ml-2">
              {t('Tìm kiếm')}
            </Button>
            <Button color="white" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow">
              <i className="fa fa-trash-o" />
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>{countChuyenThuChuaHoanThanh}</span>
          </p>
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer">{renderTable1()}</Row>
    </>
  );
};

export default TaiChuaDongChuyenThu;
