import React from 'react';
import { Container } from 'reactstrap';
import { get } from 'lodash';
import * as router from 'react-router-dom';
import {
  AppHeader,
  AppSidebar,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
  // @ts-ignore
} from '@coreui/react';
import Switcher from 'components/Switcher';
import DefaultHeader from './DefaultHeader';
import useNavs from './useNavs';
import useRoutes from './useRoutes';

// eslint-disable-next-line max-lines-per-function
const DefaultLayout: React.FC = (props): JSX.Element => {
  const navs = useNavs();
  const routes = useRoutes();

  return (
    <div className="app">
      <AppHeader fixed>
        <DefaultHeader url={get(props, 'location.pathname', '')} />
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <AppSidebarNav navConfig={navs} {...props} router={router} />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <Container fluid>
            <Switcher routes={routes} />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
