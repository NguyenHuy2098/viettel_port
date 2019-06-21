import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { push } from 'connected-react-router';
import userManager from 'utils/userManager';

const LoginCallback: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const redirectToPreviousLocation = (): void => {
    dispatch(push('/'));
  };

  const successCallback = (): void => {
    redirectToPreviousLocation();
  };

  const errorCallback = (): void => {
    redirectToPreviousLocation();
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Logging in by SSO" />
      </Helmet>

      <CallbackComponent userManager={userManager} successCallback={successCallback} errorCallback={errorCallback}>
        <div>Redirecting...</div>
      </CallbackComponent>
    </>
  );
};

export default LoginCallback;
