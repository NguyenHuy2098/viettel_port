import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useLoggedInUser from 'hooks/useLoggedInUser';
import routesMap from 'utils/routesMap';

const PrivateRoute = (props: RouteProps): JSX.Element => {
  const { isLoggedIn } = useLoggedInUser();

  if (isLoggedIn) {
    return <Route {...props} />;
  }

  return <Redirect to={routesMap.login} />;
};

export default PrivateRoute;
