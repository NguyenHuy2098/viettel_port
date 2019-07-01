import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from 'redux/auth/actions';
import useLoggedInUser from 'hooks/useLoggedInUser';
import routesMap from 'utils/routesMap';

interface Props {
  children: React.ReactElement;
}

function RedirectLogin(): JSX.Element {
  const dispatch = useDispatch();

  useEffect((): void => {
    dispatch(login());
  }, [dispatch]);

  return <div></div>;
}

const Login: React.FC<Props> = (): JSX.Element => {
  const { isLoggedIn } = useLoggedInUser();

  if (isLoggedIn) {
    return <Redirect to={routesMap.home} />;
  }

  return <RedirectLogin />;
};

export default Login;
