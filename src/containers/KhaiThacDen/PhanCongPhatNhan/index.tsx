import React, { useCallback, useState } from 'react';
import { Row, TabContent, TabPane, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { match } from 'react-router-dom';
import classNames from 'classnames';
import PhanCongNhan from './PhanCongNhan';
import PhanCongPhat from './PhanCongPhat';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const PhanCongPhatNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(1);

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }
  return (
    <>
      <Row className="mb-3 sipTitleContainer">
        <h1 className="sipTitle">{t('Phân Công Phát/Nhận')}</h1>
      </Row>
      <div className="row mt-3" />
      <div className="sipTabContainer sipFlatContainer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 1 })}
              onClick={useCallback((): void => handleChangeTab(1), [])}
            >
              {t('Phân công phát')}
              <Badge color="primary">01</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Phân công nhận')}
              <Badge color="primary">30</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab} className="sipFlatContainer">
          <TabPane tabId={1}>
            <PhanCongPhat />
          </TabPane>
          <TabPane tabId={2}>
            <PhanCongNhan />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default PhanCongPhatNhan;
