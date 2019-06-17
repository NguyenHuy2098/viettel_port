import * as React from 'react';
import { Row, Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line max-lines-per-function
const HistoryImpactTable: React.FC = (props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Row className="sipTableContainer">
      <Table striped hover>
        <thead>
          <tr>
            <th>{t('Mã bưu cục')}</th>
            <th>{t('Thời gian')}</th>
            <th>{t('Tác động  ')}</th>
            <th>{t('Thông tin bảng kê')}</th>
            <th>{t('Người tác động')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LHA - Hà Nội</td>
            <td>11:12 ∙ 19/05/2019</td>
            <td>Giao cho bưu cục (103)</td>
            <td>CT_335_DHNI TAT_194_DTHNI</td>
            <td>NV: Huy PV ∙ 0988753</td>
          </tr>
          <tr>
            <td>LHA - Hà Nội</td>
            <td>11:12 ∙ 19/05/2019</td>
            <td>Đang vận chuyển</td>
            <td>CT_335_DHNI TAT_194_DTHNI</td>
            <td>NV: Phạm Điệp ∙ 0988</td>
          </tr>
        </tbody>
      </Table>
    </Row>
  );
};
export default HistoryImpactTable;
