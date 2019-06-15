import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { History } from 'history';
import { Container } from 'reactstrap';
import {
  AppHeader,
  AppSidebar,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
  // @ts-ignore
} from '@coreui/react';
// sidebar nav config
// routes config
import useRoutes from './useRoutes';
import useNavs from './useNavs';
import DefaultHeader from './DefaultHeader';

interface Props {
  history: History;
}

// eslint-disable-next-line max-lines-per-function
const DefaultLayout: React.FC<Props> = (props): JSX.Element => {
  const routes = useRoutes();
  const navs = useNavs();

  function signOut(event: MouseEvent): void {
    event.preventDefault();
    props.history.push('/login');
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
        <Redirect from="/" to="/dong-bang-ke" />
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
