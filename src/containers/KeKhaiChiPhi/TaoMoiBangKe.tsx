import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactDatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { Cell, Row as TableRow } from 'react-table';
import { Col, Row } from 'reactstrap';
import { goBack } from 'connected-react-router';
import { delay, get, isEmpty, map, reject } from 'lodash';
import produce from 'immer';
import moment from 'moment';
import XLSX, { WorkBook } from 'xlsx';

import ButtonGoBack from 'components/Button/ButtonGoBack';
import ButtonInputXlsxFile from 'components/Button/ButtonInputXlsxFile';
import ButtonLuuBangKe from 'components/Button/ButtonLuuBangKe';
import ButtonNopBangKe from 'components/Button/ButtonNopBangKe';
import DataTable from 'components/DataTable/Grouped';
import ThemMoiKhoanMuc from 'containers/KeKhaiChiPhi/ThemMoiKhoanMuc';
import useLoggedInUser from 'hooks/useLoggedInUser';
import { transformXlsxRowToBangKeItem } from 'utils/common';
import ThemMoiChiPhi from './ThemMoiChiPhi';
import UtilityDropDown from './Utility';

interface DataType extends API.ITEMBK {
  IS_GROUP_DATA_TABLE?: boolean;
}

// eslint-disable-next-line max-lines-per-function
const TaoMoiBangKe = (): JSX.Element => {
  const dispatch = useDispatch();
  const userLogin = useLoggedInUser();
  const [data, setData] = useState<DataType[]>([]);
  const [idBangKe, setIdBangKe] = useState<string>('');
  const { t } = useTranslation();

  const handleRemoveTableRow = (item: API.ITEMBK): void => {
    const tempData = reject(data, ['SO_HD', get(item, 'original.SO_HD')]);
    setData(tempData);
  };

  const handleEditTableRow = (item: API.ITEMBK): void => {
    const tempData = [...data];
    for (let i = 0; i < tempData.length; i++) {
      if (item.SO_HD === tempData[i].SO_HD) {
        tempData[i] = item;
      }
    }
    setData(tempData);
  };

  const handleCopyTableRow = (item: API.ITEMBK): void => {
    const tempData = [...data, item];
    setData([...tempData]);
  };

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mẫu hoá đơn'),
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
        accessor: 'ITEM_NO',
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
        Header: t('Giá chưa thuế'),
        accessor: 'AMOUNT',
      },
      {
        Header: t('Phụ phí'),
        accessor: 'PHU_PHI',
      },
      {
        Header: t('TS'),
        accessor: 'TAX',
      },
      {
        Header: t('Thuế GTGT'),
        accessor: 'TAX_AMOUNT',
      },
      {
        Header: t('Tổng'),
        accessor: 'SUM_AMOUNT',
      },
      {
        Header: t('Link URL'),
        accessor: 'URL',
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.Child>): JSX.Element => {
          const [dropdownOpen, setDropdownOpen] = useState(false);
          function toggle(): void {
            setDropdownOpen(prevState => !prevState);
          }
          return get(row, 'original.SO_HD') ? (
            <UtilityDropDown
              dropdownOpen={dropdownOpen}
              toggle={toggle}
              removeTableRow={handleRemoveTableRow}
              editTableRow={handleEditTableRow}
              copyTableRow={handleCopyTableRow}
              item={row.original}
            />
          ) : (
            <></>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const handleChangeFile = (workbook: WorkBook): void => {
    const firstSheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { range: 2 });
    setData(map(sheetData, transformXlsxRowToBangKeItem));
  };

  const handleLuuBangKeSuccess = (data: API.ZFI003Response): void => {
    setIdBangKe(get(data, 'MT_CRBK_RECEIVER.BK_ID'));
  };

  const handleNopBangKeSuccess = (): void => {
    delay(() => dispatch(goBack()), 2000);
  };

  const items = useMemo(() => data.filter(item => !item.IS_GROUP_DATA_TABLE), [data]);

  const renderFirstControllers = (): JSX.Element => (
    <>
      <ButtonLuuBangKe
        className="ml-2"
        date={monthYear}
        disabled={isEmpty(items)}
        items={items}
        onSuccess={handleLuuBangKeSuccess}
      />
      <ButtonNopBangKe
        className="ml-2"
        disabled={isEmpty(idBangKe)}
        idBangKe={idBangKe}
        onSuccess={handleNopBangKeSuccess}
      />
    </>
  );

  const [monthYear, setMonthYear] = useState<Date>(new Date());
  function handleChangeMonthYear(date: Date): void {
    setMonthYear(date);
  }

  const renderFilters = (): JSX.Element => (
    <div className="bg-white p-3 shadow-sm">
      <Row>
        <Col xs={12} md={3}>
          <ReactDatePicker
            className="form-control"
            dateFormat="MM/yyyy"
            onChange={handleChangeMonthYear}
            selected={monthYear}
            showMonthYearPicker
          />
        </Col>
      </Row>
    </div>
  );

  const renderThongTinBangKe = (): JSX.Element => (
    <Row>
      <Col xs={12} md={6} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Mã bảng kê')}:</div>
          <span />
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Trạng thái')}:</div>
          <span>{t('Tạo mới')}</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Kỳ')}:</div>
          <span>{moment(monthYear).format('MM/YYYY')}</span>
        </div>
      </Col>
      <Col xs={12} md={6} xl={8}>
        <Row>
          <Col xs={12} xl={6}>
            <div className="sipFicoBangKeInformation">
              <div>{t('Người tạo')}:</div>
              <span>{get(userLogin, 'user.profile.preferred_username', '')}</span>
            </div>
            <div className="sipFicoBangKeInformation">
              <div>{t('Đơn vị')}:</div>
              <span>{get(userLogin, 'user.profile.bp_org_unit', '')}</span>
            </div>
          </Col>
          <Col xs={12} xl={6}>
            <div className="sipFicoBangKeInformation">
              <div>{t('Tổng giá trị')}:</div>
              <span />
            </div>
            <div className="sipFicoBangKeInformation">
              <div>{t('Ngày tạo')}:</div>
              <span />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  function handleSubmit(item: API.LIST): void {
    const nextState = produce(data, draftState => {
      draftState.unshift({ KHOAN_MUC: item.km_text, IS_GROUP_DATA_TABLE: true });
    });
    setData(nextState);
  }

  const renderSecondControllers = (): JSX.Element => (
    <>
      <ButtonInputXlsxFile extension="xlsx" onChange={handleChangeFile} />
      <ThemMoiKhoanMuc handleSubmit={handleSubmit} />
    </>
  );

  function handleSubmitThemMoiChiPhi(payload: API.LISTMTDETAILRECEIVER): void {
    const nextState = produce(data, draftState => {
      draftState.unshift(payload);
    });
    setData(nextState);
  }

  const renderGroupedRow = (rows: TableRow<API.RowMTZTMI047OUT>[], index: string): JSX.Element => {
    return <ThemMoiChiPhi index={index} handleSubmit={handleSubmitThemMoiChiPhi} rows={rows} />;
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          <div className="d-flex sipTitle">
            <ButtonGoBack />
            <h4>{t('Tạo mới bảng kê')}</h4>
          </div>
        </Col>
        <Col className="d-flex justify-content-end">{renderFirstControllers()}</Col>
      </Row>

      <Row className="mb-3">
        <Col>{renderFilters()}</Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <div className="bg-white p-3 shadow-sm">{renderThongTinBangKe()}</div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <h1 className="sipTitle">{t('Danh sách khoản mục chi phí')}</h1>
        </Col>
        <Col className="d-flex justify-content-end">{renderSecondControllers()}</Col>
      </Row>

      <Row>
        <Col>
          <div className="sipTableContainerAmountListContainer">
            <div className="sipTableContainer sipTableContainerAmountList">
              <DataTable columns={columns} data={data} groupKey={'KHOAN_MUC'} renderGroupedRow={renderGroupedRow} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TaoMoiBangKe;
