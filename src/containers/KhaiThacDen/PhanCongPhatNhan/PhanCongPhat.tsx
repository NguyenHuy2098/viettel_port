import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Input, Label, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { match, withRouter } from 'react-router-dom';
import { Cell } from 'react-table';
// import moment from 'moment';
import DataTable from 'components/DataTable';
import { action_MIOA_ZTMI040 } from 'redux/MIOA_ZTMI040/actions';
import { selectPhanCongPhat } from 'redux/MIOA_ZTMI040/selectors';
import ModalThemPhieuGui from './ModalThemPhieuGui';
import ModalChonNhanVien from './ModalChonNhanVien';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const PhanCongPhat: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listPhanCongPhat = useSelector(selectPhanCongPhat);

  useEffect((): void => {
    dispatch(
      action_MIOA_ZTMI040({
        FU_STATUS: '604,806',
        Delivery_postman: 'PM02',
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '50',
        Vourcher: 'N',
        Return: 'N',
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        id: 'select',
        Cell: ({ row }: Cell): JSX.Element => {
          return (
            <>
              <Label check>
                <Input type="checkbox" />
              </Label>
            </>
          );
        },
      },
      {
        Header: t('Mã phiếu gửi'),
        accessor: 'Package_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'TO_LOG_ID',
      },
      {
        Header: t('Địa chỉ phát'),
        accessor: 'Receiver_address',
      },
      {
        Header: t('Tiền phải thu'),
        accessor: 'Freight_charge',
      },
      {
        Header: t('Ngày gửi bưu phẩm'),
        accessor: 'Created_on',
      },
      {
        Header: t('Trạng thái'),
        accessor: 'Status',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <Row className="sipContentContainer">
        <Col lg={4} xs={12} className="p-0">
          <div className="d-flex">
            <div className="sipTitleRightBlockInput m-0">
              <i className="fa fa-search mr-2" />
              <Input type="select" className="pl-4">
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <option value="ZDD">{t('Chọn nhân viên')}</option>
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <option value="ZPP">{t('Nguyễn Văn A')}</option>
              </Input>
            </div>
            <Button color="primary" className="ml-2">
              {t('Tìm kiếm')}
            </Button>
          </div>
        </Col>
        <Col>
          <p className="text-right mt-2 mb-0">
            {t('Tổng số')}: <span>01</span>
          </p>
        </Col>
      </Row>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Danh sách phân công</h1>
        <div className="sipTitleRightBlock">
          <Button>
            <i className="fa fa-print" />
            In phiếu phân công
          </Button>
          <ModalChonNhanVien />
          <ModalThemPhieuGui />
        </div>
      </Row>
      <Row className="sipTableContainer">
        <DataTable columns={columns} data={listPhanCongPhat} />
      </Row>
    </>
  );
};

export default withRouter(PhanCongPhat);
