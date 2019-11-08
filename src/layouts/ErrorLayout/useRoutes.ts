import React from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import routesMap from 'utils/routesMap';
import { SIPRoutePropsType } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any*/

const Page404 = React.lazy(() => import('containers/Page404'));
const Page500 = React.lazy(() => import('containers/Page500'));

/* eslint-enable @typescript-eslint/no-explicit-any*/

const routes = (t: TFunction): SIPRoutePropsType[] => {
  return [
    { path: routesMap.ERROR_404, name: t('Not found!'), component: Page404 },
    { path: routesMap.ERROR_500, name: t('Something wrong!'), component: Page500 },
  ];
};

const useRoutes = (): SIPRoutePropsType[] => {
  const { t } = useTranslation();
  return routes(t);
};

export default useRoutes;
