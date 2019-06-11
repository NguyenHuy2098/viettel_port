import * as React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';

import history from './common/history';
import store from './redux/store';
import './App.scss';

const loading = (): React.ReactElement => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const Layout = React.lazy(() => import('./containers'));

// Pages
const Login = React.lazy(() => import('./views/Login'));
const Register = React.lazy(() => import('./views/Register'));
const Page404 = React.lazy(() => import('./views/Page404'));
const Page500 = React.lazy(() => import('./views/Page500'));

class App extends React.Component {
  private renderLogin = (props: any): React.ReactElement => <Login {...props} />;
  private renderRegister = (props: any): React.ReactElement => <Register {...props} />;
  private renderPage404 = (props: any): React.ReactElement => <Page404 {...props} />;
  private renderPage500 = (props: any): React.ReactElement => <Page500 {...props} />;
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
