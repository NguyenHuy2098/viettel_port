import React from 'react';
import { Switch, Route } from 'react-router-dom';

const About: React.FC = (): JSX.Element => <div>About</div>;
const Introduction: React.FC = (): JSX.Element => <div>Introduction</div>;

const BlankLayout: React.FC = (): JSX.Element => {
  return (
    <>
      <header>
        <h1>Blank Layout</h1>
      </header>
      <Switch>
        <Route path="/blank/about" component={About} />
        <Route path="/blank/introduction" component={Introduction} />
      </Switch>
    </>
  );
};

export default BlankLayout;
