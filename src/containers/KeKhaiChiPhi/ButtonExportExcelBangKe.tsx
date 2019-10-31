import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonProps } from 'reactstrap';
import { forEach, get, isEmpty, map, sumBy, toNumber } from 'lodash';
import moment from 'moment';
import XLSX from 'xlsx';

import { badgeFicoStateMap } from 'utils/common';
import { toastError, toastInfo } from 'components/Toast';
import { action_ZFI007M } from 'redux/ZFI007M/actions';
import { makeSelectorMaBP, makeSelectorPreferredUsername } from 'redux/auth/selectors';

interface Props extends ButtonProps {
  ids?: string[];
}

// eslint-disable-next-line max-lines-per-function
const ButtonExportExcelBangKe = (props: Props): JSX.Element => {
  const { ids, ...rest } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const useId = useSelector(makeSelectorPreferredUsername);
  const maBP = useSelector(makeSelectorMaBP);

  const handleGetCollectionError = (error: Error): void => {
    toastError(error.message);
  };

  // eslint-disable-next-line max-lines-per-function
  const handleGetCollectionSuccess = (data: API.ZFI007MResponse): void => {
    const collection = get(data, 'MT_DETAIL_RECEIVER_M.collection');
    if (!isEmpty(collection)) {
      const wb = XLSX.utils.book_new();
      // eslint-disable-next-line max-lines-per-function
      forEach(collection, (bangKe: API.Collection): void => {
        const idBangKe = get(bangKe, 'header.BK_ID');
        const data = [
          [
            'Mã bảng kê',
            idBangKe,
            'Người tạo',
            useId,
            'Tổng giá trị',
            sumBy(get(bangKe, 'list'), item => toNumber(get(item, 'SUM_AMOUNT') || 0)),
          ],
          [
            'Trạng thái',
            badgeFicoStateMap[get(bangKe, 'header.BK_STATUS')],
            'Đơn vị',
            maBP,
            'Ngày tạo',
            moment(get(bangKe, 'header.CRE_TIME', ''), 'YYYYMMDDHHmmss').format('DD/MM/YYYY'),
          ],
          ['Kỳ', `${get(bangKe, 'header.BK_MONTH')}/${get(bangKe, 'header.BK_YEAR')}`],
          [],
          [
            'Mẫu hợp đồng',
            'Ký hiệu',
            'Số',
            'Ngày',
            'Trạng thái',
            'Người bán',
            'MST',
            'Hàng hoá',
            'Giá chưa thuế',
            'Phụ phí',
            'TS',
            'Thuế GTGT',
            'Tổng',
            'Link URL',
          ],
          ...[
            ...map(get(bangKe, 'list'), (item: API.LISTMTDETAILRECEIVERM) => [
              get(item, 'MAU_HD'),
              get(item, 'KIHIEU_HD'),
              get(item, 'SO_HD'),
              get(item, 'NGAY_HD'),
              badgeFicoStateMap[get(item, 'STATUS_ITEM', -1)],
              get(item, 'NGUOI_BAN'),
              get(item, 'MST'),
              get(item, 'DESCR'),
              get(item, 'AMOUNT'),
              get(item, 'PHU_PHI'),
              get(item, 'TAX'),
              get(item, 'TAX_AMOUNT'),
              get(item, 'SUM_AMOUNT'),
              get(item, 'URL'),
            ]),
          ],
        ];
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, idBangKe);
      });
      XLSX.writeFile(wb, 'VTP_bang_ke_cptx.xlsx');
    }
  };

  const exportXlsx = useCallback(() => {
    dispatch(
      action_ZFI007M(
        {
          BK_INPUT: map(ids, (id: string) => ({ ID: id })),
        },
        {
          onFailure: handleGetCollectionError,
          onSuccess: handleGetCollectionSuccess,
        },
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, ids]);

  const handleExport = (): void => {
    if (isEmpty(ids)) {
      toastInfo(t('Vui lòng chọn bảng kê để xuất.'));
    } else {
      exportXlsx();
    }
  };

  return (
    <Button color="primary" onClick={handleExport} {...rest}>
      <img alt="VTPostek" className="mr-2" src={'../../assets/img/icon/iconExport.svg'} />
      {t('Xuất file Excel')}
    </Button>
  );
};

ButtonExportExcelBangKe.defaultProps = {
  ids: [],
};

export default ButtonExportExcelBangKe;
