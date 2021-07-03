import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Row } from 'reactstrap';
import TabView from 'components/Tab/TabView';

import DetailCODChuaChotTab1 from './DetailCODChuaChotTab1';
import DetailCODChuaChotTab2 from './DetailCODChuaChotTab2';

interface Props {
  toggle: () => void;
}

const DetailBangKeCOD = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  // const [resetCheckbox, setResetCheckbox] = useState<boolean>(false);

  return (
    <>
      <div className="mb-3"></div>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">Chi tiết vận đơn thu bưu tá : BKCPN-TN2-2104-1</h1>
        {/* <div className="sipTitleRightBlock">{renderTopController()}</div> */}
      </Row>
      <Row xs="4" className="sipContentContainer sipTableRowClickable">
        <TabView
          tabKey="Detail-chua-chot"
          navs={[
            {
              children: (
                <>
                  {t('Phải trả COD')}
                  <Badge color="primary">0</Badge>
                </>
              ),
            },
            {
              children: (
                <>
                  {t('Phải thu cước')}
                  <Badge color="primary">0</Badge>
                </>
              ),
            },
          ]}
          tabs={[
            {
              children: <DetailCODChuaChotTab1 />,
            },
            { children: <DetailCODChuaChotTab2 /> },
          ]}
        />
      </Row>
    </>
  );
};

export default DetailBangKeCOD;
