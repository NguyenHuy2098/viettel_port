import React, { useMemo, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import { find, get, map } from 'lodash';
import moment from 'moment';

import ButtonChuyenVaoChuyenThu from 'components/Button/ButtonChuyenVaoChuyenThu';
import ButtonDongChuyenThu from 'components/Button/ButtonDongChuyenThu';
import DataTable from 'components/DataTable';
import Search from 'components/Input/Search';
import ModalPopupConfirm from 'components/Modal/ModalPopupConfirm';
import Pagination from 'components/Pagination';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import { action_MIOA_ZTMI016 } from 'redux/MIOA_ZTMI016/actions';
import { action_MIOA_ZTMI047 } from 'redux/MIOA_ZTMI047/actions';
import { makeSelectorZTMI236OUTPagingTotalPage, makeSelectorZTMI236OUTRow } from 'redux/ZTMI236/selectors';
import { SipDataState, SipDataType } from 'utils/enums';
import { HttpRequestErrorType } from 'utils/HttpRequetsError';
import routesMap from 'utils/routesMap';

interface Props {
  getListKienChuaDongChuyenThu: (IV_PAGENO?: number, IV_PACKAGE_ID?: string) => void;
}

// eslint-disable-next-line max-lines-per-function
const KienChuaDongChuyenThu: React.FC<Props> = (props: Props): JSX.Element => {
  const { getListKienChuaDongChuyenThu } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedKienIds, setSelectedKienIds] = useState<string[]>([]);
  const maBP = useSelector(makeSelectorMaBP);
  const totalPage = useSelector(makeSelectorZTMI236OUTPagingTotalPage);
  const listKienChuaDongChuyenThu = useSelector(makeSelectorZTMI236OUTRow);

  const diemDen = useMemo(() => {
    return get(find(listKienChuaDongChuyenThu, ['FREIGHT_UNIT', selectedKienIds[0]]), 'NEXT_LOC', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listKienChuaDongChuyenThu, selectedKienIds]);

  const selectedKienItems = useMemo(() => {
    return map(selectedKienIds, (id: string): API.TITEM => ({ ITEM_ID: id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKienIds]);

  const onPaginationChange = ({ selected }: { selected: number }): void => {
    getListKienChuaDongChuyenThu(selected + 1);
  };

  const handleTimKiemKien = (searchText: string): void => {
    getListKienChuaDongChuyenThu(1, searchText);
  };

  const handleRedirectDetail = (item: API.RowMTZTMI047OUT) => {
    return (): void => {
      dispatch(push(generatePath(routesMap.DANH_SACH_TAI_KIEN_TRONG_CHUYEN_THU, { idChuyenThu: item.TOR_ID })));
    };
  };

  const handleSelectKien = (selectedIds: string[]): void => {
    setSelectedKienIds(selectedIds);
  };

  const handleSuccessChuyenThuAction = (): void => {
    getListKienChuaDongChuyenThu();
    setSelectedKienIds([]);
  };

  const handleDeleteKien = () => {
    return (): void => {
      const payload = {
        IV_TOR_ID: '',
        IV_TOR_TYPE: SipDataType.KIEN,
        IV_FR_LOC_ID: maBP,
        IV_TO_LOC_ID: '',
        IV_CUST_STATUS: SipDataState.TAO_MOI,
      };
      dispatch(
        action_MIOA_ZTMI016(payload, {
          onSuccess: (): void => {
            toast(t('Xóa thành công!'), { type: 'success' });
          },
          onFailure: (error: HttpRequestErrorType): void => {
            toast(t(error.messages), { type: 'error' });
          },
          onFinish: (): void => {
            dispatch(action_MIOA_ZTMI047(payload));
          },
        }),
      );
    };
  };

  const columns = useMemo(
    // eslint-disable-next-line max-lines-per-function
    () => [
      {
        Header: t('Mã kiện'),
        accessor: 'PACKAGE_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'NEXT_LOC',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return get(row, 'original.NEXT_LOC', '');
        },
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
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): string => {
          return moment(get(row, 'original.CREATED_ON'), 'YYYYMMDDHHmmss').format('HH:mm - DD/MM/YYYY');
        },
      },
      {
        Header: t('Quản trị'),
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          return (
            <>
              <Button className="SipTableFunctionIcon" onClick={handleRedirectDetail(row.original)}>
                <img src={'../../assets/img/icon/iconPencil.svg'} alt="VTPostek" />
              </Button>
              <ModalPopupConfirm handleDoSomething={handleDeleteKien} />
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedKienIds],
  );

  const renderToolbar = (): JSX.Element => (
    <Row>
      <Col lg={6} xl={5}>
        <Search onSubmitSearch={handleTimKiemKien} placeholder={t('Tìm kiếm kiện')} />
      </Col>
      <Col lg={1}>
        {/*_______________temporary hide because of no requirement______________*/}
        <Button color="white" className="sipTitleRightBlockBtnIcon sipBoxShadow hide">
          <img src={'../../assets/img/icon/iconRemove2.svg'} alt="VTPostek" />
        </Button>
      </Col>
      <Col className="d-flex justify-content-end">
        <ButtonChuyenVaoChuyenThu
          className="ml-2"
          diemDen={diemDen}
          listTaiKienCanChuyen={selectedKienItems}
          onSuccess={handleSuccessChuyenThuAction}
        />
        <ButtonDongChuyenThu
          className="ml-2"
          diemDen={diemDen}
          listTaiKienCanGan={selectedKienItems}
          onSuccess={handleSuccessChuyenThuAction}
        />
      </Col>
    </Row>
  );

  return (
    <>
      <div className="shadow-sm p-3 mb-3 bg-white">{renderToolbar()}</div>
      <Row className="sipTableContainer">
        <DataTable
          columns={columns}
          data={listKienChuaDongChuyenThu}
          onCheckedValuesChange={handleSelectKien}
          showCheckboxes
          renderCheckboxValues="PACKAGE_ID"
        />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onThisPaginationChange={onPaginationChange}
        />
      </Row>
    </>
  );
};

export default KienChuaDongChuyenThu;
