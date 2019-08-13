import React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import { Helmet } from 'react-helmet';
import { SIPRoutePropsType } from 'layouts/types';
import routesMap from 'utils/routesMap';

interface Props {
  routes: SIPRoutePropsType[];
}

const Switcher: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <Switch>
      {props.routes.map(
        (route: SIPRoutePropsType, idx: number): React.ReactNode => {
          const { component: Component } = route;
          /* eslint-disable react/jsx-no-bind */
          return (
            Component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps): JSX.Element => (
                  <>
                    <Helmet>
                      <title>{route.name}</title>
                    </Helmet>
                    <Component {...props} />
                  </>
                )}
              />
            )
          );
          /* eslint-enable react/jsx-no-bind */
        },
      )}
      <Redirect to={routesMap.ERROR_404} />
    </Switch>
  );
};

export default Switcher;
