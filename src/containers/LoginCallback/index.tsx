import React from 'react';
import { useDispatch } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { push } from 'connected-react-router';
import { action_GET_PROFILE_BY_USERNAME } from 'redux/GetProfileByUsername/actions';
import userManager from 'utils/userManager';

const LoginCallback: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const redirectToPreviousLocation = (): void => {
    dispatch(push('/'));
  };

  const successCallback = (): void => {
    dispatch(action_GET_PROFILE_BY_USERNAME({}, {}, {}));
    redirectToPreviousLocation();
  };

  const errorCallback = (): void => {
    redirectToPreviousLocation();
  };

  return (
    <>
      <CallbackComponent userManager={userManager} successCallback={successCallback} errorCallback={errorCallback}>
        <div>Redirecting...</div>
      </CallbackComponent>
    </>
  );
};

export default LoginCallback;
