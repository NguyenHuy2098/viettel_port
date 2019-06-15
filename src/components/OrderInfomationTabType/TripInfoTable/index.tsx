import * as React from 'react';
import { Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const TripInfoTable: React.FC = (props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="sipTableContainer">
      <Table striped hover>
        <thead>
          <tr>
            <th>{t('Mã bưu cục')}</th>
            <th>{t('Thời gian')}</th>
            <th>{t('Thông tin hành trình')}</th>
            <th>{t('Thông tin bảng kê')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LHA - Hà Nội</td>
            <td>11:12 ∙ 19/05/2019</td>
            <td>Giao cho bưu cục (103)</td>
            <td>CT_335_DHNI TAT_194_DTHNI</td>
          </tr>
          <tr>
            <td>LHA - Hà Nội</td>
            <td>11:12 ∙ 19/05/2019</td>
            <td>Đang vận chuyển</td>
            <td>CT_335_DHNI TAT_194_DTHNI</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default TripInfoTable;
