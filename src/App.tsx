import React from 'react';
import Loadable from 'react-loadable';
import { OidcProvider } from 'redux-oidc';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Loading from 'components/Loading';
import PrivateRoute from 'components/PrivateRoute';
import store from 'redux/store';
import history from 'utils/history';
import userManager from 'utils/userManager';
import './App.scss';

const DefaultLayout = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('layouts/DefaultLayout'),
  loading: Loading,
});
const Login = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('containers/Login'),
  loading: Loading,
});
const Register = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('containers/Register'),
  loading: Loading,
});
const Page404 = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('containers/Page404'),
  loading: Loading,
});
const Page500 = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('containers/Page500'),
  loading: Loading,
});
const LoginCallback = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('containers/LoginCallback'),
  loading: Loading,
});

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <OidcProvider store={store} userManager={userManager}>
          <Router history={history}>
            <Switch>
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/register" component={Register} />} />
              <Route exact path="/404" component={Page404} />
              <Route exact path="/500" component={Page500} />
              <Route exact path="/signin-callback" component={LoginCallback} />
              <Route path="/" component={DefaultLayout} />} />
            </Switch>
          </Router>
        </OidcProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
