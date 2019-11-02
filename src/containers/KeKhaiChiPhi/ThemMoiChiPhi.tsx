import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row as TableRow } from 'react-table';
import { Button } from 'reactstrap';
import { get, head, sumBy, toNumber } from 'lodash';
import numeral from 'numeral';

import ModalThemMoiChiPhi, { ModalThemMoiChiPhiType } from './ModalThemMoiChiPhi';

interface Props {
  handleSubmit: Function;
  rows: TableRow<API.LISTMTDETAILRECEIVER>[];
  status: number;
}

// eslint-disable-next-line max-lines-per-function
const ThemMoiChiPhi = (props: Props): JSX.Element => {
  const { handleSubmit, rows, status } = props;
  const [modal, setModal] = React.useState(false);
  const { t } = useTranslation();

  const { KHOAN_MUC: khoanMuc, TEN_KM: tenKhoanMuc } = useMemo(() => get(head(rows), 'original'), [rows]);

  function toggle(): void {
    setModal(!modal);
  }

  const closeModal = (): void => {
    setModal(false);
  };

  return (
    <div>
      <div className="sipTableAmountListGroup">
        <span>
          {`${khoanMuc}-${tenKhoanMuc}`}&nbsp;({t('Tổng')}:{' '}
          <span className="text-bold color-primary">
            {numeral(sumBy(rows, row => toNumber(get(row, 'original.SUM_AMOUNT')))).format('0,0')}
          </span>
          )
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
        khoanMuc={khoanMuc}
        tenKhoanMuc={tenKhoanMuc}
        submit={handleSubmit}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ThemMoiChiPhi;
