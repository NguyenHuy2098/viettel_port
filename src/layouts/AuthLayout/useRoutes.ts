import { useTranslation } from 'react-i18next';
import Loadable from 'react-loadable';
import i18next from 'i18next';
import Loading from 'components/Loading';
import routesMap from 'utils/routesMap';
import { SIPRoutePropsType } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any*/

const Login = Loadable({
  loader: (): any => import('containers/Login'),
  loading: Loading,
});
const LoginCallback = Loadable({
  loader: (): any => import('containers/LoginCallback'),
  loading: Loading,
});

/* eslint-enable @typescript-eslint/no-explicit-any*/

const routes = (t: i18next.TFunction): SIPRoutePropsType[] => {
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
