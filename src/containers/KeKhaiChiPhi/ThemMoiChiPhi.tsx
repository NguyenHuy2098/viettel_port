import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row as TableRow } from 'react-table';
import { Button } from 'reactstrap';
import { get, sumBy, toNumber } from 'lodash';
import numeral from 'numeral';

import ModalThemMoiChiPhi, { ModalThemMoiChiPhiType } from './ModalThemMoiChiPhi';

interface Props {
  handleSubmit: Function;
  khoanMuc: { id: string; name: string };
  rows: TableRow<API.LISTMTDETAILRECEIVER>[];
  status: number;
}

// eslint-disable-next-line max-lines-per-function
const ThemMoiChiPhi = (props: Props): JSX.Element => {
  const { handleSubmit, khoanMuc, rows, status } = props;
  const [modal, setModal] = React.useState(false);
  const { t } = useTranslation();

  const { id, name } = khoanMuc;
  const tongGiaTri = useMemo(
    () => numeral(sumBy(rows, row => toNumber(get(row, 'original.SUM_AMOUNT') || 0))).format('0,0'),
    [rows],
  );

  function toggle(event?: React.MouseEvent): void {
    event && event.stopPropagation();
    setModal(!modal);
  }

  const closeModal = (): void => {
    setModal(false);
  };

  return (
    <div>
      <div className="sipTableAmountListGroup">
        <span className="nhom-khoan-muc nav-link nav-dropdown-toggle">
          {`${id}-${name}`}
          <i className="fa fa-caret-down fa-lg pl-4 pr-4 nav-icon" />({t('Tổng')}:{' '}
          <span className="text-bold color-primary">{tongGiaTri}</span> <span>{t('VND')}</span>)
        </span>
        {status === 0 && (
          <Button color="primary" outline onClick={toggle}>
            <i className="fa fa-plus mr-2" />
            {t('Thêm mới')}
          </Button>
        )}
      </div>
      <ModalThemMoiChiPhi
        type={ModalThemMoiChiPhiType.NEW}
        showModal={modal}
        toggle={toggle}
        khoanMuc={id}
        tenKhoanMuc={name}
        submit={handleSubmit}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ThemMoiChiPhi;
