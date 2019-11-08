import React from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import routesMap from 'utils/routesMap';
import { SIPRoutePropsType } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any*/

const Login = React.lazy(() => import('containers/Login'));
const LoginCallback = React.lazy(() => import('containers/LoginCallback'));

/* eslint-enable @typescript-eslint/no-explicit-any*/

const routes = (t: TFunction): SIPRoutePropsType[] => {
  return [
    { path: routesMap.AUTH_LOGIN, name: t('Login'), component: Login },
    { path: routesMap.AUTH_LOGIN_CALLBACK, name: t('Logging in...'), component: LoginCallback },
  ];
};

const useRoutes = (): SIPRoutePropsType[] => {
  const { t } = useTranslation();
  return routes(t);
};

export default useRoutes;
