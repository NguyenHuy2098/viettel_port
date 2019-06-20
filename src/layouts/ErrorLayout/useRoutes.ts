import { useTranslation } from 'react-i18next';
import Loadable from 'react-loadable';
import i18next from 'i18next';
import Loading from 'components/Loading';
import routesMap from 'utils/routesMap';
import { SIPRoutePropsType } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any*/

const Page404 = Loadable({
  loader: (): any => import('containers/Page404'),
  loading: Loading,
});
const Page500 = Loadable({
  loader: (): any => import('containers/Page500'),
  loading: Loading,
});

/* eslint-enable @typescript-eslint/no-explicit-any*/

const routes = (t: i18next.TFunction): SIPRoutePropsType[] => {
  return [
    { path: routesMap.error404, name: t('Not found!'), component: Page404 },
    { path: routesMap.error500, name: t('Something wrong!'), component: Page500 },
  ];
};

const useRoutes = (): SIPRoutePropsType[] => {
  const { t } = useTranslation();
  return routes(t);
};

export default useRoutes;
