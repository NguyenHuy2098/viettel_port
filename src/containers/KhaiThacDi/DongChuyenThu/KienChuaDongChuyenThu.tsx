import React, { useMemo, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { Cell } from 'react-table';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import produce from 'immer';
import { concat, get, includes, map, pull } from 'lodash';
import moment from 'moment';

import ButtonChuyenVaoChuyenThu from 'components/Button/ButtonChuyenVaoChuyenThu';
import ButtonDongChuyenThu from 'components/Button/ButtonDongChuyenThu';
import DataTable from 'components/DataTable';
import Search from 'components/Input/Search';
import ModalPopupConfirm from 'components/ModalConfirm/ModalPopupConfirm';
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

  const selectedKienItems = useMemo(() => {
    return map(selectedKienIds, (id: string): API.TITEM => ({ ITEM_ID: id }));
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

  const handleSelectKien = (event: React.MouseEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    const selectedKienId = event.currentTarget.value;
    if (includes(selectedKienIds, selectedKienId)) {
      setSelectedKienIds(produce(selectedKienIds, draftState => pull(draftState, selectedKienId)));
    } else {
      setSelectedKienIds(produce(selectedKienIds, draftState => concat(draftState, selectedKienId)));
    }
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
        IV_FR_DATE: moment()
          .subtract(1, 'day')
          .format('YYYYMMDD'),
        IV_TO_DATE: moment().format('YYYYMMDD'),
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '20',
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
        id: 'select',
        Cell: ({ row }: Cell<API.RowMTZTMI047OUT>): JSX.Element => {
          const freightUnit = get(row, 'original.FREIGHT_UNIT', '');
          return (
            <Label check>
              <Input
                defaultChecked={includes(selectedKienIds, freightUnit)}
                onClick={handleSelectKien}
                type="checkbox"
                value={freightUnit}
              />
            </Label>
          );
        },
      },
      {
        Header: t('Mã kiện'),
        accessor: 'PACKAGE_ID',
      },
      {
        Header: t('Bưu cục đến'),
        accessor: 'NEXT_LOC',
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
                <i className="fa fa-pencil fa-lg color-blue" />
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
      <Col lg={4} xs={12}>
        <Search onSubmitSearch={handleTimKiemKien} placeholder={t('Tìm kiếm kiện')} />
      </Col>
      <Col lg={1}>
        <Button color="white" className="sipTitleRightBlockBtnIcon sipBoxShadow">
          <i className="fa fa-trash-o" />
        </Button>
      </Col>
      <Col className="d-flex justify-content-end">
        <ButtonChuyenVaoChuyenThu
          className="ml-2"
          listTaiKienCanChuyen={selectedKienItems}
          onSuccess={handleSuccessChuyenThuAction}
        />
        <ButtonDongChuyenThu
          className="ml-2"
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
        <DataTable columns={columns} data={listKienChuaDongChuyenThu} />
        <Pagination
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          onPageChange={onPaginationChange}
        />
      </Row>
    </>
  );
};

export default KienChuaDongChuyenThu;
