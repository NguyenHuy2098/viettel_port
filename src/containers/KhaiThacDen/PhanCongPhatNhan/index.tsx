import React, { useEffect } from 'react';
import { Row, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import TabView from 'components/Tab/TabView';
import { action_MIOA_ZTMI054 } from 'redux/MIOA_ZTMI054/actions';
import { selectPhanCongNhanListCount } from 'redux/MIOA_ZTMI035/selectors';
import { selectPhanCongPhatListCount } from 'redux/MIOA_ZTMI040/selectors';
import PhanCongNhan from './PhanCongNhan';
import PhanCongPhat from './PhanCongPhat';

// eslint-disable-next-line max-lines-per-function
const PhanCongPhatNhan: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listPhanCongNhan = useSelector(selectPhanCongNhanListCount);
  const listPhanCongPhat = useSelector(selectPhanCongPhatListCount);

  useEffect((): void => {
    dispatch(
      action_MIOA_ZTMI054({
        row: [
          {
            iv_position: 'NVBH',
          },
        ],
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h3>{t('Phân Công Phát/Nhận')}</h3>
      </Row>

      <TabView
        navs={[
          {
            children: (
              <>
                {t('Phân công phát')}
                <Badge color="primary">{listPhanCongPhat}</Badge>
              </>
            ),
          },
          {
            children: (
              <>
                {t('Phân công nhận')}
                <Badge color="primary">{listPhanCongNhan}</Badge>
              </>
            ),
          },
        ]}
        tabs={[
          {
            children: <PhanCongPhat />,
          },
          { children: <PhanCongNhan /> },
        ]}
      />
    </>
  );
};

export default PhanCongPhatNhan;
