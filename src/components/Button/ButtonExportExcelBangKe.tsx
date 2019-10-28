import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonProps } from 'reactstrap';
import { forEach, isEmpty } from 'lodash';
import XLSX from 'xlsx';

import { toastInfo } from '../Toast';

interface Props extends ButtonProps {
  ids?: string[];
}

const ButtonExportExcelBangKe = (props: Props): JSX.Element => {
  const { ids, ...rest } = props;
  const { t } = useTranslation();

  const exportXlsx = (): void => {
    const wb = XLSX.utils.book_new();
    forEach(ids, (id: string): void => {
      const data = [
        [],
        [],
        [],
        [1, 2, 3],
        [true, false, null, 'sheetjs'],
        ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
        ['baz', null, 'qux'],
      ];
      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, id);
    });
    XLSX.writeFile(wb, 'bangKe.xlsx');
  };

  const handleExport = (): void => {
    if (isEmpty(ids)) {
      toastInfo(t('Vui lòng chọn bảng kê để xuất.'));
    } else {
      exportXlsx();
    }
  };

  return (
    <Button color="primary" onClick={handleExport} {...rest}>
      <img src={'../../assets/img/icon/iconExport.svg'} alt="VTPostek" />
      {t('Xuất file Excel')}
    </Button>
  );
};

ButtonExportExcelBangKe.defaultProps = {
  ids: [],
};

export default ButtonExportExcelBangKe;
