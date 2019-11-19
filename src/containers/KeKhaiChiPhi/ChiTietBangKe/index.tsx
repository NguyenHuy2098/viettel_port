import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Input, Row } from 'reactstrap';
import { Row as TableRow } from 'react-table';
import { concat, get, find, map, toNumber, reject, toString, filter, includes, isEmpty, uniq, size } from 'lodash';
import { match } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import produce from 'immer';
import classnames from 'classnames';
import { THEM_MOI_CHI_PHI_SUCCESS } from 'utils/types';

import emitter from 'utils/emitter';
import { detailBangkeFicoStateMap } from 'utils/common';
import ButtonGoBack from 'components/Button/ButtonGoBack';
import DataTable from 'components/DataTable/Grouped';
import ThemMoiKhoanMuc from 'containers/KeKhaiChiPhi/ThemMoiKhoanMuc';
import { select_ZFI001_list } from 'redux/ZFI001/selectors';
import { action_ZFI007 } from 'redux/ZFI007/actions';
import { action_ZFI001 } from 'redux/ZFI001/actions';
import { select_ZFI007_list, select_ZFI007_header } from 'redux/ZFI007/selectors';
import ThemMoiChiPhi from '../ThemMoiChiPhi';
import TopControllers from './TopControllers';
import TopThongTinBangKe from '../TopThongTinBangKe';
import UtilityDropDown from '../UtilityDropDown';
import useColumns from './useColumns';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const ChiTietBangKe = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const idBangKe = get(props, 'match.params.idBangKe', '');
  const dispatch = useDispatch();
  const list = useSelector(select_ZFI007_list);
  const listKhoanMuc = useSelector(select_ZFI001_list);
  const bangKeHeader = useSelector(select_ZFI007_header);
  const [data, setData] = useState<API.LISTMTDETAILRECEIVER[]>([]);
  const [dataOriginal, setDataOriginal] = useState<API.LISTMTDETAILRECEIVER[]>([]);
  const [deleteData, setDeleteData] = useState<API.LISTMTDETAILRECEIVER[]>([]);
  const [manualGroupedKeys, setManualGroupedKeys] = useState<string[]>([]);

  useEffect(() => {
    const payloads = {
      KM_FLAG: 'X',
    };
    dispatch(action_ZFI001(payloads));
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const groupedKeys = useMemo(() => uniq(concat(manualGroupedKeys, map(data, 'KHOAN_MUC'))), [manualGroupedKeys, data]);

  const groupedKhoanMuc = useMemo(() => {
    if (isEmpty(listKhoanMuc)) return [];
    return map(groupedKeys, key => {
      const currentKhoanMuc = find(listKhoanMuc, { km_id: key });
      return {
        id: get(currentKhoanMuc, 'km_id') || '',
        name: get(currentKhoanMuc, 'km_text') || '',
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupedKeys, listKhoanMuc]);

  const status = useMemo(() => toNumber(get(bangKeHeader, 'BK_STATUS', -1)), [bangKeHeader]);
  const cols = useColumns({ status });

  useEffect(() => {
    dispatch(
      action_ZFI007({
        BK_ID: idBangKe,
      }),
    );
  }, [dispatch, idBangKe]);

  useEffect((): void => {
    setData(filter(list, item => !isEmpty(item)));
    setDataOriginal(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => cols, [data, status]);

  const handleRemoveTableRow = (item: API.LISTMTDETAILRECEIVER, index: number): void => {
    const tempData = reject(data, ['LINE_ITEM', get(item, 'LINE_ITEM')]);
    if (!includes(item.LINE_ITEM, 'CG')) {
      setDeleteData([...deleteData, item]);
    }
    setData(tempData);
    setDataOriginal(tempData);
  };

  const handleEditTableRow = (item: API.LISTMTDETAILRECEIVER): void => {
    const tempData = [...data];
    for (let i = 0; i < tempData.length; i++) {
      if (item.LINE_ITEM === tempData[i].LINE_ITEM) {
        tempData[i] = { ...item };
      }
    }
    setData(tempData);
    setDataOriginal(tempData);
  };

  const handleCopyTableRow = (item: API.LISTMTDETAILRECEIVER): void => {
    const tempData = [...data, item];
    setData([...tempData]);
    setDataOriginal([...tempData]);
  };

  function handleSubmitKhoanMuc(item: API.LIST): void {
    setManualGroupedKeys(
      produce(manualGroupedKeys, draftState => {
        draftState.unshift(get(item, 'km_id', ''));
      }),
    );
  }

  const renderSecondControllers = (): JSX.Element => <ThemMoiKhoanMuc handleSubmit={handleSubmitKhoanMuc} />;

  function handleSubmit(payload: API.LISTMTDETAILRECEIVER): void {
    const nextState = produce(data, draftState => {
      draftState.unshift(payload);
    });
    setData(nextState);
    setDataOriginal(nextState);
    emitter.emit(THEM_MOI_CHI_PHI_SUCCESS, payload.KHOAN_MUC);
  }

  const renderGroupedRow = (
    rows: TableRow<API.LISTMTDETAILRECEIVER>[],
    groupId: string,
    dataDisable: string[],
  ): JSX.Element => {
    const isShow = size(dataDisable.filter(id => toString(id) === toString(groupId))) ? true : false;
    return (
      <ThemMoiChiPhi
        handleSubmit={handleSubmit}
        khoanMuc={find(groupedKhoanMuc, { id: groupId }) || { id: '', name: '' }}
        rows={rows}
        status={status}
        isShow={isShow}
      />
    );
  };

  const renderUtilityDropDown = (row: TableRow<API.LISTMTDETAILRECEIVER>, index: number): JSX.Element => {
    return status !== 0 ? (
      <></>
    ) : (
      <UtilityDropDown
        removeTableRow={handleRemoveTableRow}
        editTableRow={handleEditTableRow}
        copyTableRow={handleCopyTableRow}
        item={row.original}
        khoanMuc={toString(index)}
      />
    );
  };

  const handleFilterByStatus = (event: React.FormEvent<HTMLInputElement>): void => {
    const filteredList = filter(
      list,
      (item: API.LISTMTDETAILRECEIVER): boolean => toString(item.STATUS_ITEM) === event.currentTarget.value,
    );
    setData(event.currentTarget.value === '' ? dataOriginal : filteredList);
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          <div className="d-flex sipTitle">
            <ButtonGoBack />
            <h4>{status === 0 ? t('Sửa bảng kê') : t('Chi tiết bảng kê')}</h4>
          </div>
        </Col>
        <Col className="d-flex justify-content-end">
          <TopControllers idBangKe={idBangKe} items={data} status={status} deleteData={deleteData} />
        </Col>
      </Row>
      <div className="bg-white p-3 shadow-sm mb-4">
        <TopThongTinBangKe data={data} isCreateNew={false} />
      </div>
      <Row className="mb-3 pl-3 pr-3">
        <h1 className="sipTitle">{t('Danh sách khoản mục chi phí')}</h1>
        {(status === 3 || status === 2) && (
          <div className="sipFilterColSearch min-width-100px pull-right ml-2">
            <Input type="select" onChange={handleFilterByStatus}>
              <option value="">{t('Tất cả trạng thái')}</option>
              {map(
                detailBangkeFicoStateMap,
                (item: string, index: number): JSX.Element => (
                  <option key={index} value={toString(index)}>
                    {item}
                  </option>
                ),
              )}
            </Input>
            <img src={'../../assets/img/icon/iconFilter.svg'} alt="VTPostek" />
          </div>
        )}
        {!status && <div className="pull-right">{renderSecondControllers()}</div>}
      </Row>
      <div className={!status ? 'sipTableContainerAmountListContainer' : 'position-relative'}>
        <div
          className={classnames({
            sipTableContainer: true,
            sipTableContainerAmountList: true,
            sipTableContainerAmountListNoFix: status === 3 || status === 2,
          })}
        >
          <DataTable
            columns={columns}
            data={data}
            groupKey={'KHOAN_MUC'}
            preGroups={groupedKhoanMuc}
            renderGroupedRow={renderGroupedRow}
            renderUtilityDropDown={renderUtilityDropDown}
          />
        </div>
      </div>
    </>
  );
};

export default ChiTietBangKe;
