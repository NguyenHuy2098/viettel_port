import React from 'react';
import { Container } from 'reactstrap';
import { Helmet } from 'react-helmet';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  AppHeader,
  AppSidebar,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
  // @ts-ignore
} from '@coreui/react';
import { logout } from 'redux/auth/actions';
import routesMap from 'utils/routesMap';
import useNavs from './useNavs';
import useRoutes from './useRoutes';
import DefaultHeader from './DefaultHeader';

// eslint-disable-next-line max-lines-per-function
const DefaultLayout: React.FC = (props): JSX.Element => {
  const dispatch = useDispatch();
  const navs = useNavs();
  const routes = useRoutes();

  function signOut(): void {
    dispatch(logout({}));
  }

  function renderRouter(): React.ReactElement {
    return (
      <Switch>
        {routes.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (route: any, idx: number): React.ReactNode => {
            /* eslint-disable react/jsx-no-bind */
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps): JSX.Element => (
                  <>
                    <Helmet>
                      <title>{route.name}</title>
                    </Helmet>
                    <route.component {...props} />
                  </>
                )}
              />
            ) : null;
            /* eslint-enable react/jsx-no-bind */
          },
        )}
        <Redirect from={routesMap.home} to="/dong-bang-ke" />
      </Switch>
    );
  }

  return (
    <div className="app">
      <AppHeader fixed>
        <DefaultHeader onLogout={signOut} />
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <AppSidebarNav navConfig={navs} {...props} router={router} />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <Container fluid>{renderRouter()}</Container>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
