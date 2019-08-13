import React from 'react';
import { Redirect } from 'react-router-dom';
import routesMap from 'utils/routesMap';

const RedirectToHome: React.FC = (): JSX.Element => {
  return <Redirect to={routesMap.HOME} />;
};

export default RedirectToHome;
