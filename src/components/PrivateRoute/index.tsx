import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useLoggedInUser from 'hooks/useLoggedInUser';

const PrivateRoute = (props: RouteProps): JSX.Element => {
  const { isLoggedIn } = useLoggedInUser();

  if (isLoggedIn) {
    return <Route {...props} />;
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
