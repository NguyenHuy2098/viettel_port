import React from 'react';
import { Route } from 'react-router-dom';
import useLoggedInUser from 'hooks/useLoggedInUser';

const PrivateRoute = (props: any): JSX.Element => {
  const { isLoggedIn } = useLoggedInUser();

  if (isLoggedIn) {
    return <Route {...props} />;
  }

  return <div>Not logged in!</div>;
};

export default PrivateRoute;
