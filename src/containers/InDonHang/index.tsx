/* eslint-disable max-lines */
import React from 'react';
import { Row, Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { match } from 'react-router-dom';
import qs from 'query-string';
import { get } from 'lodash';
import { printHtml } from 'utils/printOrder';

import PrintableThongTinDonHang from 'components/Printable/PrintableThongTinDonHang';
import { action_MIOA_ZTMI031 } from 'redux/MIOA_ZTMI031/actions';

interface Props {
  match: match;
}

const defaultPrintableId = 'printableBody';

// eslint-disable-next-line max-lines-per-function
const OrderInformation: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const idDonHang = get(props, 'match.params.idDonHang');
  const params = qs.parse(get(props, 'location.search'));
  const idChuyenThu = get(params, 'idChuyenThu', '') as string;

  const payloadFirstLoad = {
    FWO_ID: idDonHang,
    BUYER_REFERENCE_NUMBER: '',
  };

  const handlePrint = (): void => {
    printHtml({
      printable: defaultPrintableId,
    });
  };

  const onClose = (): void => {
    window.close();
  };

  React.useEffect((): void => {
    dispatch(action_MIOA_ZTMI031(payloadFirstLoad));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idDonHang]);

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('In đơn hàng')}</h1>
        <Button className="mr-2" color="primary" onClick={handlePrint} size="lg">
          <>
            <i className="fa fa-print" />
            {t(' ')}
            {t('In')}
          </>
        </Button>
        <Button className="mr-4" color="secondary" onClick={onClose} size="lg">
          <>
            <i className="fa fa-remove" />
            {t(' ')}
            {t('Đóng')}
          </>
        </Button>
      </Row>
      <Row id={defaultPrintableId} className="orderPrintBody">
        <PrintableThongTinDonHang idDonHang={idDonHang} idChuyenThu={idChuyenThu} type="PGCN" />
      </Row>
    </>
  );
};

export default OrderInformation;
