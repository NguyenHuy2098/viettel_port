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
  AppSidebarNav2 as AppSidebarNav,
  // @ts-ignore
} from '@coreui/react';
import routes from './routes';
import navigation from './navigation';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

interface Props {
  history: History;
}

class Index extends React.PureComponent<Props> {
  private loading = (): React.ReactElement => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  private signOut(event: MouseEvent): void {
    event.preventDefault();
    this.props.history.push('/login');
  }

  private renderRouter = (): React.ReactElement => (
    <React.Suspense fallback={this.loading()}>
      <Switch>
        {routes.map(
          (route, idx: number): React.ReactNode => {
            function renderComponent(props: Props): JSX.Element {
              // @ts-ignore
              return <route.component {...props} />;
            }
            return route.component ? (
              <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={renderComponent} />
            ) : null;
          },
        )}
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </React.Suspense>
  );

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
            <Container fluid>{this.renderRouter()}</Container>
          </main>
        </div>
      </div>
    );
  }
}

export default Index;
