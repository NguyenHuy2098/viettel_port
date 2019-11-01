import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row as TableRow } from 'react-table';
import { Button } from 'reactstrap';
import { get, sumBy, toNumber } from 'lodash';
import numeral from 'numeral';

import ModalThemMoiChiPhi from './ModalThemMoiChiPhi';

interface Props {
  index: string;
  handleSubmit: Function;
  rows: TableRow<API.RowMTZTMI047OUT>[];
}

// eslint-disable-next-line max-lines-per-function
const ThemMoiChiPhi = (props: Props): JSX.Element => {
  const [modal, setModal] = React.useState(false);
  const { t } = useTranslation();
  const index = props.index;
  const rows = props.rows;

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
          {index !== 'null' ? index : ''}&nbsp;({t('Tổng')}:{' '}
          <span className="text-bold color-primary">
            {numeral(sumBy(rows, row => toNumber(get(row, 'original.SUM_AMOUNT')))).format('0,0')}
          </span>
          )
        </span>
        <Button color="primary" outline onClick={toggle}>
          <i className="fa fa-plus mr-2" />
          {t('Thêm mới')}
        </Button>
      </div>
      <ModalThemMoiChiPhi
        type="new"
        showModal={modal}
        toggle={toggle}
        index={index}
        submit={props.handleSubmit}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ThemMoiChiPhi;
