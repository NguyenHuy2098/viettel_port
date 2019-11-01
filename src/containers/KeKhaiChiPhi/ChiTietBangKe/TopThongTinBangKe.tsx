import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import { get, toNumber, sumBy } from 'lodash';
import { useSelector } from 'react-redux';

import { select_ZFI007_header } from 'redux/ZFI007/selectors';
import useLoggedInUser from 'hooks/useLoggedInUser';
import moment from 'moment';
import BadgeFicoBangKeStatus from 'components/Badge/BadgeFicoBangKeStatus';
import numeral from 'numeral';

interface DataType extends API.LISTMTDETAILRECEIVER {
  IS_GROUP_DATA_TABLE?: boolean;
}

interface Props {
  data: DataType[];
}

// eslint-disable-next-line max-lines-per-function
const TopThongTinBangKe = (props: Props): JSX.Element => {
  const { data } = props;
  const { t } = useTranslation();
  const userLogin = useLoggedInUser();
  const bangKeHeader = useSelector(select_ZFI007_header);
  const status = useMemo(() => toNumber(get(bangKeHeader, 'BK_STATUS', -1)), [bangKeHeader]);
  const tongGiaTri = useMemo(
    () =>
      numeral(sumBy(data, (item: API.LISTMTDETAILRECEIVER): number => toNumber(get(item, 'SUM_AMOUNT') || 0))).format(
        '0,0',
      ),
    [data],
  );

  return (
    <Row>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Mã bảng kê')}:</div>
          <span className="text-bold">{get(bangKeHeader, 'BK_ID')}</span>
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
            {get(bangKeHeader, 'BK_MONTH') || '-'}/{get(bangKeHeader, 'BK_YEAR') || '-'}
          </span>
        </div>
      </Col>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Người tạo')}:</div>
          <span className="text-bold">{get(bangKeHeader, 'CRE_BY') || '-'}</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Đơn vị')}:</div>
          <span className="text-bold">{get(userLogin, 'user.profile.bp_org_unit', '')}</span>
        </div>
      </Col>
      <Col xs={12} xl={4}>
        <div className="sipFicoBangKeInformation">
          <div>{t('Tổng giá trị')}:</div>
          <span className="text-bold">{tongGiaTri} đ</span>
        </div>
        <div className="sipFicoBangKeInformation">
          <div>{t('Ngày tạo')}:</div>
          <span className="text-bold">
            {moment(get(bangKeHeader, 'CRE_TIME', ''), 'YYYYMMDDHHmmss').format('DD/MM/YYYY')}
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
