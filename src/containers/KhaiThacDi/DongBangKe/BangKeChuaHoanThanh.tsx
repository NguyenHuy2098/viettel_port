import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Label, Row, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import { map } from 'lodash';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorBangKeChuaDongTai, makeSelectorCountBangKeChuaDongTai } from 'redux/MIOA_ZTMI047/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';

// eslint-disable-next-line max-lines-per-function
const BangKeChuaHoanThanh: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const countBangKeChuaDongTai = useSelector(makeSelectorCountBangKeChuaDongTai);
  const listBangKeChuaDongTai = useSelector(makeSelectorBangKeChuaDongTai);

  useEffect((): void => {
    const payload = {
      IV_TOR_ID: '',
      IV_TOR_TYPE: 'ZC1',
      IV_FR_LOC_ID: 'BDH',
      IV_CUST_STATUS: '101',
      IV_TO_LOC_ID: '',
    };
    dispatch(action_MIOA_ZTMI047(payload));
  }, [dispatch]);

  function handleSearchBangKe(e: React.ChangeEvent<HTMLInputElement>): void {
    const payload = {
      IV_TOR_ID: e.target.value,
      IV_TOR_TYPE: 'ZC1',
      IV_FR_LOC_ID: 'BDH',
      IV_CUST_STATUS: '101',
      IV_TO_LOC_ID: '',
    };
    dispatch(action_MIOA_ZTMI047(payload));
  }

  function onPageChange(selectedItem: { selected: number }): void {
    console.log(selectedItem);
  }

  function renderPagination(): JSX.Element {
    return (
      <nav className="sipPagination">
        <ReactPaginate
          pageCount={100}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          containerClassName="pagination"
          previousClassName="sipPaginationPrev pull-left page-item"
          nextClassName="sipPaginationNext pull-right page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousLabel={<i className="fa fa-arrow-left" />}
          nextLabel={<i className="fa fa-arrow-right" />}
          activeClassName="selected"
          onPageChange={onPageChange}
          breakClassName="page-item"
        />
      </nav>
    );
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
      if (!window.confirm('Bạn có chắc chắn?')) return;
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

  function renderAction(item: API.RowMTZTMI047OUT): JSX.Element {
    return (
      <>
        <Button>
          <i className="fa fa-print fa-lg color-green" />
        </Button>
        <Button>
          <i className="fa fa-pencil fa-lg color-blue" />
        </Button>
        <Button onClick={handleDeleteManifest(item)}>
          <i className="fa fa-trash-o fa-lg color-red" />
        </Button>
      </>
    );
  }

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
                  <tr key={index}>
                    <td className="text-center">
                      <Label check>
                        {/* eslint-disable-next-line react/jsx-max-depth */}
                        <Input type="checkbox" />
                      </Label>
                    </td>
                    <td>{item.TOR_ID}</td>
                    <td></td>
                    <td>{item.ITEM_NO}</td>
                    <td></td>
                    <td>{item.DATETIME_CHLC}</td>
                    <td>{item.EXEC_CONT}</td>
                    <td className="SipTableFunctionIcon">{renderAction(item)}</td>
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
          <div className="sipTitleRightBlockInput m-0">
            <i className="fa fa-search" />
            <Input onChange={handleSearchBangKe} type="text" placeholder={t('Tìm kiếm bảng kê')} />
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
