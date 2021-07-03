import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from 'reactstrap';
import TabView from 'components/Tab/TabView';

import DetailCODKhachHangTab1 from './DetailCODKhachHangTab1';
import DetailCODKhachHangTab2 from './DetailCODKhachHangTab2';

interface Props {
  toggle: () => void;
}

const DetailKhachHang = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  // const [resetCheckbox, setResetCheckbox] = useState<boolean>(false);

  return (
    <>
      <TabView
        tabKey="Detail-khach-hang"
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
            children: <DetailCODKhachHangTab1 />,
          },
          { children: <DetailCODKhachHangTab2 /> },
        ]}
      />
    </>
  );
};

export default DetailKhachHang;
