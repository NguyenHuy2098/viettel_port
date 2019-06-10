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
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends React.Component {
  public render(): React.ReactElement {
    return (
      <Provider store={store}>
        <Router history={history}>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" render={props => <Login {...props} />} />
              <Route exact path="/register" render={props => <Register {...props} />} />
              <Route exact path="/404" render={props => <Page404 {...props} />} />
              <Route exact path="/500" render={props => <Page500 {...props} />} />
              <Route path="/" render={props => <Layout {...props} />} />
            </Switch>
          </React.Suspense>
        </Router>
      </Provider>
    );
  }
}

export default App;
