import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { get, sumBy, toNumber } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

import BadgeFicoBangKeStatus from 'components/Badge/BadgeFicoBangKeStatus';
import { makeSelectorMaBP, makeSelectorPreferredUsername } from 'redux/auth/selectors';

interface Props {
  date: Date;
  items: API.ITEMBK[];
}

// eslint-disable-next-line max-lines-per-function
const ThongTinBangKe = (props: Props): JSX.Element => {
  const { items, date } = props;
  const maBP = useSelector(makeSelectorMaBP);
  const useId = useSelector(makeSelectorPreferredUsername);
  const { t } = useTranslation();

  const tongGiaTri = useMemo(
    () =>
      numeral(sumBy(items, (item: API.LISTMTDETAILRECEIVER): number => toNumber(get(item, 'SUM_AMOUNT') || 0))).format(
        '0,0',
      ),
    [items],
  );

  return (
    <Row>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Mã bảng kê')}:</div>
          <span className="text-bold">-</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Trạng thái')}:</div>
          <span>
            <BadgeFicoBangKeStatus status={0} />
          </span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Kỳ')}:</div>
          <span className="text-bold">{moment(date).format('MM/YYYY')}</span>
        </div>
      </Col>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Người tạo')}:</div>
          <span className="text-bold">{useId}</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Đơn vị')}:</div>
          <span className="text-bold">{maBP}</span>
        </div>
      </Col>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Tổng giá trị')}:</div>
          <span className="text-bold">{tongGiaTri} đ</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Ngày tạo')}:</div>
          <span className="text-bold">{moment().format('DD/MM/YYYY')}</span>
        </div>
      </Col>
    </Row>
  );
};

export default ThongTinBangKe;
