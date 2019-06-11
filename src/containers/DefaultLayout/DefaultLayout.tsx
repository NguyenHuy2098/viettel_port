/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { History } from 'history';
import { Container } from 'reactstrap';
import {
  AppHeader,
  AppSidebar,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
  // @ts-ignore
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

interface Props {
  history: History;
}

class DefaultLayout extends React.PureComponent<Props> {
  private loading = (): React.ReactElement => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  private signOut(event: MouseEvent): void {
    event.preventDefault();
    this.props.history.push('/login');
  }

  public renderRouter(): void {
    routes.map(
      (route, idx: number): React.ReactNode => {
        return route.component ? (
          // @ts-ignore
          <Route
            key={idx}
            path={route.path}
            exact={route.exact}
            name={route.name}
            // eslint-disable-next-line react/jsx-no-bind
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            render={props => <route.component {...props} />}
          />
        ) : null;
      },
    );
  }

  public render(): React.ReactElement {
    return (
      <div className="app">
        <AppHeader fixed>
          <React.Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={this.signOut} />
          </React.Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <React.Suspense fallback={this.loading()}>
              <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
            </React.Suspense>
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <React.Suspense fallback={this.loading()}>
                <Switch>
                  {this.renderRouter()}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </React.Suspense>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
