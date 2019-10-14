import React, { useCallback, useEffect, useMemo } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabContentProps, TabPane } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { generatePath, RouteComponentProps, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { replace } from 'connected-react-router';
import { get, isEmpty, isNil, map, toNumber } from 'lodash';
import { parse, ParsedQuery, stringify } from 'query-string';
import url from 'url';

interface Props extends RouteComponentProps {
  defaultTab?: number;
  navs: {
    children: React.ReactNode;
  }[];
  tabContentProps?: TabContentProps;
  tabKey?: string;
  tabs: {
    children: React.ReactNode;
  }[];
}

// eslint-disable-next-line max-lines-per-function
const TabView: React.FC<Props> = (props: Props): JSX.Element => {
  const { defaultTab, location, navs, tabContentProps, tabKey, tabs } = props;
  const dispatch = useDispatch();
  const theTabKey = isNil(tabKey) || isEmpty(tabKey) ? 'tab' : tabKey;
  const theDefaultTab = isNil(defaultTab) ? 0 : defaultTab;
  const queryString = useMemo((): ParsedQuery => parse(location.search), [location.search]);
  const activeTab = useMemo((): number => toNumber(get(queryString, theTabKey, theDefaultTab)), [queryString]);

  const navigateTo = (tabId: number): void => {
    dispatch(
      replace(
        generatePath(
          url.format({
            ...location,
            search: stringify({ ...queryString, [theTabKey]: tabId }),
          }),
        ),
      ),
    );
  };

  useEffect(() => {
    navigateTo(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTab = useCallback(
    (tabId: number) => (): void => {
      navigateTo(tabId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navs, tabs],
  );

  return (
    <div className="sipTabContainer sipFlatContainer">
      <Nav className="shadow-sm" tabs>
        {map(navs, (navItem, index) => (
          <NavItem key={`navItem-${index}`}>
            <NavLink className={classNames({ active: activeTab === index })} onClick={toggleTab(index)}>
              {navItem.children}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab} className="sipFlatContainer" {...tabContentProps}>
        {map(tabs, (tabPane, index) => (
          <TabPane key={`tabPane-${index}`} tabId={index}>
            {tabPane.children}
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
};

TabView.defaultProps = {
  tabContentProps: {},
};

export default withRouter(TabView);
