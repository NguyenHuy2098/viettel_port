import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import { OidcProvider } from 'redux-oidc';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ConnectedRouter } from 'connected-react-router';

import Loading from 'components/Loading';
import PrivateRoute from 'components/PrivateRoute';
import history from 'utils/history';
import routesMap from 'utils/routesMap';
import store from 'redux/store';
import userManager from 'utils/userManager';
import './App.scss';

/**
 * Layouts
 */
const AuthLayout = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('layouts/AuthLayout'),
  loading: Loading,
});
const DefaultLayout = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('layouts/DefaultLayout'),
  loading: Loading,
});
const ErrorLayout = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('layouts/ErrorLayout'),
  loading: Loading,
});

const App: React.FC = (): JSX.Element => {
  useEffect(() => {
    toast.configure();
  }, []);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <OidcProvider store={store} userManager={userManager}>
          <Router history={history}>
            <Switch>
              <Route path={routesMap.AUTH} component={AuthLayout} />
              <Route path={routesMap.ERROR} component={ErrorLayout} />
              <PrivateRoute path={routesMap.ROOT} component={DefaultLayout} />
            </Switch>
          </Router>
        </OidcProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
