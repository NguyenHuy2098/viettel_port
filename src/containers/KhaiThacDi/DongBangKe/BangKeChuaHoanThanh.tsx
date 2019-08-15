import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Col, Input, Label, Row, Table } from 'reactstrap';
import { map } from 'lodash';
import Pagination from 'components/Pagination';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorBangKeChuaDongTai, makeSelectorCountBangKeChuaDongTai } from 'redux/MIOA_ZTMI047/selectors';
import ModalPopupConfirm from 'components/ModalConfirm/ModalPopupConfirm';
import { push } from 'connected-react-router';
import routesMap from 'utils/routesMap';

// eslint-disable-next-line max-lines-per-function
const BangKeChuaHoanThanh: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const countBangKeChuaDongTai = useSelector(makeSelectorCountBangKeChuaDongTai);
  const listBangKeChuaDongTai = useSelector(makeSelectorBangKeChuaDongTai);

  const getListBangKe = useCallback(
    function(payload = {}): void {
      dispatch(
        action_MIOA_ZTMI047({
          IV_TOR_ID: '',
          IV_TOR_TYPE: 'ZC1',
          IV_FR_LOC_ID: 'BDH',
          IV_CUST_STATUS: '101',
          IV_TO_LOC_ID: '',
          ...payload,
        }),
      );
    },
    [dispatch],
  );

  useEffect((): void => getListBangKe(), [getListBangKe]);

  function handleSearchBangKe(e: React.ChangeEvent<HTMLInputElement>): void {
    const payload = {
      IV_TOR_ID: e.target.value,
    };
    getListBangKe(payload);
  }

  function onPageChange(selectedItem: { selected: number }): void {
    console.log(selectedItem);
  }

  const handleDeleteManifest = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
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
          onFinish: (): void => getListBangKe(),
        }),
      );
    };
  };

  function renderAction(item: API.RowMTZTMI047OUT): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-print fa-lg color-green" />
        </Button>
        <Button>
          <i className="fa fa-pencil fa-lg color-blue" />
        </Button>
        <ModalPopupConfirm handleDoSomething={handleDeleteManifest(item)} />
      </>
    );
  }
  const handleRedirectDetail = (item: API.RowMTZTMI047OUT): ((event: React.MouseEvent) => void) => {
    return (): void => {
      dispatch(push(`${routesMap.DANH_SACH_PHIEU_GUI}/${item.TOR_ID}`));
    };
  };
  function renderTable(): JSX.Element {
    return (
      <>
        <Table striped hover>
          <thead>
            <tr>
              <th />
              <th>{t('Mã bảng kê')}</th>
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
              listBangKeChuaDongTai,
              (item: API.RowMTZTMI047OUT, index): JSX.Element => {
                return (
                  <tr key={index} onClick={handleRedirectDetail(item)}>
                    <td className="text-center">
                      <Label check>
                        {/* eslint-disable-next-line react/jsx-max-depth */}
                        <Input type="checkbox" />
                      </Label>
                    </td>
                    <td>{item.TOR_ID}</td>
                    <td>{item.LOG_LOCID_TO}</td>
                    <td>{item.ITEM_NO}</td>
                    <td>Chưa có</td>
                    <td>{item.DATETIME_CHLC}</td>
                    <td>{item.EXEC_CONT}</td>
                    <td className="SipTableFunctionIcon">{renderAction(item)}</td>
                  </tr>
                );
              },
            )}
          </tbody>
        </Table>
        <Pagination pageRangeDisplayed={5} marginPagesDisplayed={2} pageCount={100} onPageChange={onPageChange} />
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
              <Input type="text" placeholder={t('Tìm kiếm bảng kê')} onChange={handleSearchBangKe} />
            </div>
            <Button color="primary" className="ml-2">
              {t('Tìm kiếm')}
            </Button>
            <Button color="gray" className="sipTitleRightBlockBtnIcon ml-2 sipBoxShadow">
              <i className="fa fa-trash-o" />
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>{countBangKeChuaDongTai}</span>
          </p>
        </Col>
      </Row>
      <div className="mt-3" />
      <Row className="sipTableContainer">{renderTable()}</Row>
    </>
  );
};

export default BangKeChuaHoanThanh;
