import React, { useEffect } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import { SIPRoutePropsType } from 'layouts/types';
import routesMap from 'utils/routesMap';
import Loading from 'components/Loading';
import ErrorBoundary from 'layouts/ErrorLayout/ErrorBoundary';

interface Props {
  routes: SIPRoutePropsType[];
}

const Switcher: React.FC<Props> = (props: Props): JSX.Element => {
  useEffect(() => {
    try {
      const route = props.routes.filter(route => route.path === window.location.pathname);
      document.title = route[0].name;
    } catch (error) {}
  }, [props.routes]);

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<Loading error={false} />}>
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
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default Switcher;
