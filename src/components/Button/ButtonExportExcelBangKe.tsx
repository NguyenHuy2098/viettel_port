import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonProps } from 'reactstrap';

interface Props extends ButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

const ButtonExportExcelBangKe = (props: Props): JSX.Element => {
  const { data, ...rest } = props;
  const { t } = useTranslation();
  return (
    <Button color="primary" {...rest}>
      <img src={'../../assets/img/icon/iconExport.svg'} alt="VTPostek" />
      {t('Xuất file Excel')}
    </Button>
  );
};

export default ButtonExportExcelBangKe;
