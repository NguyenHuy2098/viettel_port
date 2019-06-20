import React from 'react';
import { Container } from 'reactstrap';
import Switcher from 'components/Switcher';
import useRoutes from './useRoutes';

const ErrorLayout: React.FC = (): JSX.Element => {
  const routes = useRoutes();

  return (
    <div className="app">
      <Container fluid>
        <Switcher routes={routes} />
      </Container>
    </div>
  );
};

export default ErrorLayout;
