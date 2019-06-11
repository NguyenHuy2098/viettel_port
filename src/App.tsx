import * as React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';

import history from './common/history';
import store from './redux/store';
import './App.scss';

const loading = (): React.ReactElement => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Layout = React.lazy(() => import('./layouts'));

// Pages
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Login = React.lazy(() => import('./containers/Login/Login'));
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Register = React.lazy(() => import('./containers/Register/Register'));
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Page404 = React.lazy(() => import('./containers/Page404/Page404'));
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Page500 = React.lazy(() => import('./containers/Page500/Page500'));

class App extends React.Component {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderLogin = (props: any): React.ReactElement => <Login {...props} />;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderRegister = (props: any): React.ReactElement => <Register {...props} />;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderPage404 = (props: any): React.ReactElement => <Page404 {...props} />;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderPage500 = (props: any): React.ReactElement => <Page500 {...props} />;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderLayout = (props: any): React.ReactElement => <Layout {...props} />;

  public render(): React.ReactElement {
    return (
      <Provider store={store}>
        <Router history={history}>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" render={this.renderLogin} />
              <Route exact path="/register" render={this.renderRegister} />} />
              <Route exact path="/404" render={this.renderPage404} />
              <Route exact path="/500" render={this.renderPage500} />
              <Route path="/" render={this.renderLayout} />} />
            </Switch>
          </React.Suspense>
        </Router>
      </Provider>
    );
  }
}

export default App;
