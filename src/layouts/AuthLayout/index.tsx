import React from 'react';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Helmet } from 'react-helmet';
import routesMap from 'utils/routesMap';
import useRoutes from './useRoutes';

const AuthLayout: React.FC = (): JSX.Element => {
  const routes = useRoutes();

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
        <Redirect from={routesMap.auth} to={routesMap.error404} />
      </Switch>
    );
  }

  return (
    <div className="app">
      <Container fluid>{renderRouter()}</Container>
    </div>
  );
};

export default AuthLayout;
