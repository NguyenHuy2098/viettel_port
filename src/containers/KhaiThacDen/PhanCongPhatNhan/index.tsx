import React, { useCallback, useEffect, useState } from 'react';
import { Row, TabContent, TabPane, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { match } from 'react-router-dom';
import classNames from 'classnames';

import { action_MIOA_ZTMI054 } from 'redux/MIOA_ZTMI054/actions';
import { selectPhanCongNhan } from 'redux/MIOA_ZTMI035/selectors';
import { selectPhanCongPhat } from 'redux/MIOA_ZTMI040/selectors';
import { makeSelectorMaBP } from 'redux/auth/selectors';
import PhanCongNhan from './PhanCongNhan';
import PhanCongPhat from './PhanCongPhat';

interface Props {
  match: match;
}

// eslint-disable-next-line max-lines-per-function
const PhanCongPhatNhan: React.FC<Props> = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userMaBp = useSelector(makeSelectorMaBP);
  const [tab, setTab] = useState<number>(1);
  const listPhanCongNhan = useSelector(selectPhanCongNhan);
  const listPhanCongPhat = useSelector(selectPhanCongPhat);

  function handleChangeTab(tab: number): void {
    setTab(tab);
  }

  useEffect((): void => {
    dispatch(
      action_MIOA_ZTMI054({
        iv_post: userMaBp,
        iv_position: 'NVLX',
        IV_PAGENO: '1',
        IV_NO_PER_PAGE: '10',
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function handleSearchCodeChuyenThu(): void {
  //   dispatch(
  //     action_MIOA_ZTMI023({
  //       IV_ID: '',
  //     }),
  //   );
  // }

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
              <Badge color="primary">{listPhanCongPhat.length}</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: tab === 2 })}
              onClick={useCallback((): void => handleChangeTab(2), [])}
            >
              {t('Phân công nhận')}
              <Badge color="primary">{listPhanCongNhan && listPhanCongNhan.length}</Badge>
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
