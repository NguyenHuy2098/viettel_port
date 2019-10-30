import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { push } from 'connected-react-router';
import { size } from 'lodash';

import ButtonPrintable from 'components/Button/ButtonPrintable';
import routesMap from 'utils/routesMap';
import ButtonExportExcelBangKe from '../ButtonExportExcelBangKe';
import PrintableBangKe from '../PrintableBangKe';

interface Props {
  noBangKeChecked?: boolean;
  checkedBangKe: string[];
}

const TopControllers = (props: Props): JSX.Element => {
  const { checkedBangKe, noBangKeChecked } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const redirectToTaoMoiBangKe = (): void => {
    dispatch(push(routesMap.TAO_MOI_BANG_KE));
  };

  return (
    <>
      <Button className="sipTitleRightBlockBtnIcon">
        <img src={'../../assets/img/icon/iconRefresh.svg'} alt="VTPostek" />
      </Button>
      <ButtonExportExcelBangKe className="ml-2" disabled={noBangKeChecked} ids={checkedBangKe} />
      <ButtonPrintable
        btnProps={{
          disabled: !size(checkedBangKe),
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
          children: <PrintableBangKe ids={checkedBangKe} />,
        }}
        modalHeaderProps={{
          children: t('In thông tin bảng kê'),
        }}
      />
      <Button color="primary" className="ml-2" onClick={redirectToTaoMoiBangKe}>
        <img src={'../../assets/img/icon/iconPlus.svg'} alt="VTPostek" />
        {t('Thêm mới')}
      </Button>
    </>
  );
};

TopControllers.defaultProps = {
  noBangKeChecked: false,
};

export default TopControllers;
