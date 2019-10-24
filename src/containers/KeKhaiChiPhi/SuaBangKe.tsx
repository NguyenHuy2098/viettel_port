import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, FormGroup, Input, Row } from 'reactstrap';
import { Cell, Row as TableRow } from 'react-table';
import { get, sumBy, toNumber } from 'lodash';
import { match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ButtonGoBack from 'components/Button/ButtonGoBack';
import DataTable from 'components/DataTable/Grouped';
import useLoggedInUser from 'hooks/useLoggedInUser';
import ThemMoiKhoanMuc from 'containers/KeKhaiChiPhi/ThemMoiKhoanMuc';
import { action_ZFI007 } from 'redux/ZFI007/actions';
import { select_ZFI007, select_MT_DETAIL_RECEIVER_ZFI007 } from 'redux/ZFI007/selectors';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const SuaBangKe = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const [data, setData] = useState([]);

  const userLogin = useLoggedInUser();

  const idBangKe = get(props, 'match.params.idBangKe', '');

  React.useEffect(() => {
    const payloads = {
      MA_BUU_CUC: 'BDH',
      BK_ID: idBangKe,
      IV_PAGENO: '1',
      IV_NO_PER_PAGE: '10',
    };
    dispatch(action_ZFI007(payloads));
  }, [dispatch, idBangKe]);

  const data = useSelector(select_ZFI007);

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mẫu hợp đồng'),
        accessor: 'MAU_HD',
      },
      {
        Header: t('Ký hiệu'),
        accessor: 'KIHIEU_HD',
      },
      {
        Header: t('Số'),
        accessor: 'SO_HD',
      },
      {
        Header: t('Ngày'),
        accessor: 'NGAY_HD',
      },
      {
        Header: t('Trạng thái'),
        accessor: 'STATUS_ITEM',
      },
      {
        Header: t('Người bán'),
        accessor: 'NGUOI_BAN',
      },
      {
        Header: t('MST'),
        accessor: 'MST',
      },
      {
        Header: t('Hàng hoá'),
        accessor: 'DESCR',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon">
                <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" />
              </Button>
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const renderFirstControllers = (): JSX.Element => (
    <>
      <Button color="primary" className="ml-2">
        <i className="fa fa-save mr-2" />
        {t('Lưu')}
      </Button>
      <Button color="primary" className="ml-2">
        <i className="fa fa-send mr-2" />
        {t('Nộp')}
      </Button>
    </>
  );

  const years = useMemo(() => Array.from(new Array(20), (val, index) => index + new Date().getFullYear()), []);

  const [month, setMonth] = React.useState<string>('1');
  function handleChangeMonth(e: React.FormEvent<HTMLInputElement>): void {
    setMonth(e.currentTarget.value);
  }

  const [year, setYear] = React.useState<string>('2019');
  function handleChangeYear(e: React.FormEvent<HTMLInputElement>): void {
    setYear(e.currentTarget.value);
  }

  const renderFilters = (): JSX.Element => (
    <div className="bg-white p-3 shadow-sm">
      <Row>
        <Col xs={12} md={3} xl={2}>
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect" onChange={handleChangeMonth}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </Input>
          </FormGroup>
        </Col>
        <Col xs={12} md={3} xl={2}>
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect" onChange={handleChangeYear}>
              {years.map(year => {
                return <option key={year}>{year}</option>;
              })}
            </Input>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );

  const detailRecerver = useSelector(select_MT_DETAIL_RECEIVER_ZFI007);

  const renderThongTinBangKe = (): JSX.Element => (
    <div className="bg-white p-3 shadow-sm">
      <Row>
        <Col>
          <div>
            {t('Mã bảng kê')}: {idBangKe}
          </div>
          <div>
            {t('Trạng thái')}: {t('Sửa bảng kê')}
          </div>
          <div>
            {t('Kỳ')}: {`${month}/${year}`}
          </div>
        </Col>
        <Col>
          <div>
            {t('Người tạo')}: {get(userLogin, 'user.profile.preferred_username', '')}
          </div>
          <div>
            {t('Đơn vị')}: {get(userLogin, 'user.profile.bp_org_unit', '')}
          </div>
        </Col>
        <Col>
          <div>
            {t('Tổng giá trị')}: {sumBy(data, (item: API.LISTMTDETAILRECEIVER): number => toNumber(item.SUM_AMOUNT))}
          </div>
          <div>
            {t('Ngày tạo')}: {get(detailRecerver, 'header.CRE_TIME', '')}
          </div>
        </Col>
      </Row>
    </div>
  );

  const renderSecondControllers = (): JSX.Element => (
    <>
      <ThemMoiKhoanMuc />
    </>
  );

  const renderGroupedRow = (rows: TableRow<API.RowMTZTMI047OUT>[], index: string): JSX.Element => {
    return (
      <Row>
        <Col>{index}</Col>
        <Col>
          <div className="d-flex justify-content-end">
            <Button color="primary" className=" ml-2" outline>
              <i className="fa fa-plus mr-2" />
              {t('Thêm mới')}
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          <div className="d-flex sipTitle">
            <ButtonGoBack />
            <h4>{t('Sửa bảng kê')}</h4>
          </div>
        </Col>
        <Col className="d-flex justify-content-end">{renderFirstControllers()}</Col>
      </Row>

      <Row className="mb-3">
        <Col>{renderFilters()}</Col>
      </Row>

      <Row className="mb-4">
        <Col>{renderThongTinBangKe()}</Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <h1 className="sipTitle">{t('Danh sách khoản mục chi phí')}</h1>
        </Col>
        <Col className="d-flex justify-content-end">{renderSecondControllers()}</Col>
      </Row>

      <Row>
        <Col>
          <div className="sipTableContainer">
            <DataTable columns={columns} data={data} groupKey={'TEN_KM'} renderGroupedRow={renderGroupedRow} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SuaBangKe;
