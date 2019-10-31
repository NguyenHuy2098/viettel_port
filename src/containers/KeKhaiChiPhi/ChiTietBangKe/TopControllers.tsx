import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router';
import { delay, size } from 'lodash';

import ButtonLuuBangKe from 'components/Button/ButtonLuuBangKe';
import ButtonNopBangKe from 'components/Button/ButtonNopBangKe';
import ButtonPrintable from 'components/Button/ButtonPrintable';
import ButtonExportExcelBangKe from '../ButtonExportExcelBangKe';
import PrintableBangKe from '../PrintableBangKe';

interface Props {
  idBangKe: string;
  status: number;
  items: API.ITEMBK[];
}

const TopControllers = (props: Props): JSX.Element => {
  const { idBangKe, items, status } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const printableBangKe = useMemo((): string[] => [idBangKe], [idBangKe]);

  const handleNopBangKeSuccess = (): void => {
    delay(() => dispatch(goBack()), 2000);
  };

  return (
    <>
      <a color="primary" className="btn btn-primary" href="/templates/SAP_FICO_Temp CPTX_v0.1.xlsx" download>
        <img alt="VTPostek" className="mr-2" src={'../../assets/img/icon/iconExcelWhite.svg'} />
        {t('Lấy file mẫu')}
      </a>
      {status ? (
        <>
          <ButtonExportExcelBangKe className="ml-2" ids={printableBangKe} />
          <ButtonPrintable
            btnProps={{
              disabled: !size(idBangKe),
              color: 'primary',
              className: 'ml-2',
              children: (
                <>
                  <img src={'../../assets/img/icon/iconPrintWhite.svg'} alt="VTPostek" />
                  {t('In bảng kê')}
                </>
              ),
            }}
            modalBodyProps={{
              children: <PrintableBangKe ids={printableBangKe} />,
            }}
            modalHeaderProps={{
              children: t('In thông tin bảng kê'),
            }}
          />
        </>
      ) : (
        <>
          <ButtonLuuBangKe className="ml-2" idBangKe={idBangKe} items={items} />
          <ButtonNopBangKe className="ml-2" idBangKe={idBangKe} onSuccess={handleNopBangKeSuccess} />
        </>
      )}
    </>
  );
};

TopControllers.defaultProps = {
  noBangKeChecked: false,
};

export default TopControllers;
