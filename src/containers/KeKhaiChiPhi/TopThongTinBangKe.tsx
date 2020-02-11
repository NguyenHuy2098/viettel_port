import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import { get, toNumber, sumBy } from 'lodash';
import { useSelector } from 'react-redux';

import { select_ZFI007_header } from 'redux/ZFI007/selectors';
import moment from 'moment';
import BadgeFicoBangKeStatus from 'components/Badge/BadgeFicoBangKeStatus';
import numeral from 'numeral';
import { makeSelectorPreferredUsername } from 'redux/auth/selectors';

interface Props {
  data: API.LISTMTDETAILRECEIVER[];
  isCreateNew: boolean;
  period?: string;
}

// eslint-disable-next-line max-lines-per-function
const TopThongTinBangKe = (props: Props): JSX.Element => {
  const { data, isCreateNew, period } = props;
  const useId = useSelector(makeSelectorPreferredUsername);
  const { t } = useTranslation();
  const bangKeHeader = useSelector(select_ZFI007_header);
  const status = isCreateNew ? 0 : toNumber(get(bangKeHeader, 'BK_STATUS', -1));
  const tongGiaTri = useMemo(
    () =>
      numeral(sumBy(data, (item: API.LISTMTDETAILRECEIVER): number => toNumber(get(item, 'SUM_AMOUNT') || 0))).format(
        '0,0',
      ),
    [data],
  );
  const currentPostOfficeGetInLocalStorage = localStorage.getItem('currentPostOffice');

  const currentPostOffice = useMemo(() => {
    return get(JSON.parse(currentPostOfficeGetInLocalStorage || ''), 'PostOfficeName');
  }, [currentPostOfficeGetInLocalStorage]);

  return (
    <Row>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Mã bảng kê')}:</div>
          <span className="text-bold">{isCreateNew ? '' : get(bangKeHeader, 'BK_ID')}</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Trạng thái')}:</div>
          <span>
            <BadgeFicoBangKeStatus status={status} />
          </span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Kỳ')}:</div>
          <span className="text-bold">
            {isCreateNew ? period : `${get(bangKeHeader, 'BK_MONTH') || '-'}/${get(bangKeHeader, 'BK_YEAR') || '-'}`}
          </span>
        </div>
      </Col>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Người tạo')}:</div>
          <span className="text-bold">{isCreateNew ? useId : get(bangKeHeader, 'CRE_BY') || '-'}</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Đơn vị')}:</div>
          <span className="text-bold">{currentPostOffice}</span>
        </div>
      </Col>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Tổng giá trị')}:</div>
          <span className="text-bold">
            {tongGiaTri} {t('VND')}
          </span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Ngày tạo')}:</div>
          <span className="text-bold">
            {isCreateNew
              ? moment().format('DD/MM/YYYY')
              : moment(get(bangKeHeader, 'CRE_TIME', ''), 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}
          </span>
        </div>
      </Col>
    </Row>
  );
};

TopThongTinBangKe.defaultProps = {
  data: [],
};

export default TopThongTinBangKe;
