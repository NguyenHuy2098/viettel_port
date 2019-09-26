import React, { useState, useEffect, useMemo } from 'react';
import { Badge, Button, Nav, NavItem, NavLink, Row, TabContent, TabPane, Col, Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { action_ZTMI241 } from 'redux/ZTMI241/actions';
import DataTable from 'components/DataTable';
import { Cell } from 'react-table';
import { select_ZTMI241 } from 'redux/ZTMI241/selectors';
import moment from 'moment';
import { Location } from 'history';

interface Props {
  location: Location;
}

// eslint-disable-next-line max-lines-per-function
function ChiTietNhomHangHoa(props: Props): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tab] = useState(1);
  const childs = get(props, 'location.state', []);

  useEffect((): void => {
    const payload = {
      IV_PACKAGE_ID: '',
      IV_FREIGHT_UNIT_STATUS: [301, 304, 311, 600],
      IV_LOC_ID: 'BDH',
      IV_COMMODITY_GROUP: 'Thư-Nhanh-Nội vùng.TTHNI',
      IV_DATE: moment().format('YYYYMMDD'),
      IV_USER: get(childs, '[0].USER', ''),
      IV_PAGE_NO: '1',
      IV_NO_PER_PAGE: '10',
    };
    dispatch(action_ZTMI241(payload));
  }, [dispatch]);

  const data = useSelector(select_ZTMI241);

  const dataRow = get(data, 'Row', []);

  const columns = useMemo(
    () => [
      {
        Header: t('Mã phiếu gửi'),
        accessor: 'PACKAGE_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'MANIFEST_LOC',
      },
      {
        Header: t('Số lượng'),
        accessor: 'QUANTITY',
      },
      {
        Header: t('Trọng lượng'),
        accessor: 'GROSS_WEIGHT',
      },
      {
        Header: t('Ngày gửi'),
        accessor: 'CREATED_ON',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI241OUT>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
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

  function renderSearch(): JSX.Element {
    return (
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search" />
              <Input type="text" placeholder={t('Tìm kiếm phiếu gửi')} />
            </div>
            <Button color="primary" className="ml-2">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Đã chọn')}: <span className="color-primary">02/03</span>
          </p>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Thư - Nhanh')}</h1>
        <div className="sipTitleRightBlock">
          <Button>
            <i className="fa fa-file-excel-o" />
            {t('Chuyển bảng kê')}
          </Button>
          <Button>
            <i className="fa fa-file-archive-o" />
            {t('Tạo bảng kê')}
          </Button>
          <Button>
            <i className="fa fa-download" />
            {t('Đóng bảng kê')}
          </Button>
          <Button>
            <i className="fa fa-download" />
            {t('Đóng tải')}
          </Button>
        </div>
      </Row>
      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          {childs.map((child: API.RowMTZTMI241OUT) => {
            return (
              <NavItem key={child.USER}>
                <NavLink className={classNames({ active: tab === 1 })}>
                  {t('Đơn hợp lệ')}
                  <Badge color="primary">01</Badge>
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent className="sipFlatContainer">
          <TabPane>
            {renderSearch()}
            <Row className="sipTableContainer">
              <DataTable columns={columns} data={dataRow ? dataRow : []} />
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
}

export default ChiTietNhomHangHoa;
