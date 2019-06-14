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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const loading = (): React.ReactElement => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

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
        <Redirect from="/" to="/dashboard" />
      </Switch>
    );
  }

  return (
    <div className="app">
      <AppHeader fixed>
        <React.Suspense fallback={loading()}>
          <DefaultHeader onLogout={signOut} />
        </React.Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <React.Suspense fallback={loading()}>
            <AppSidebarNav navConfig={navs} {...props} router={router} />
          </React.Suspense>
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
