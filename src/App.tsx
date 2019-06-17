import React from 'react';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import store from './redux/store';
import history from './utils/history';
import './App.scss';

const Login = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('containers/Login'),
  loading: Loading,
});
const Register = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('containers/Register'),
  loading: Loading,
});
const Page404 = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('containers/Page404'),
  loading: Loading,
});
const Page500 = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('containers/Page500'),
  loading: Loading,
});
const DefaultLayout = Loadable({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  loader: () => import('layouts/DefaultLayout'),
  loading: Loading,
});

class App extends React.Component {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderDefaultLayout = (props: any): React.ReactElement => <DefaultLayout {...props} />;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderLogin = (props: any): React.ReactElement => <Login {...props} />;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderRegister = (props: any): React.ReactElement => <Register {...props} />;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderPage404 = (props: any): React.ReactElement => <Page404 {...props} />;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderPage500 = (props: any): React.ReactElement => <Page500 {...props} />;

  public componentDidCatch(): JSX.Element {
    return (
      <div>
        <button>Error</button>
      </div>
    );
  }

  public render(): React.ReactElement {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" render={this.renderLogin} />
            <Route exact path="/register" render={this.renderRegister} />} />
            <Route exact path="/404" render={this.renderPage404} />
            <Route exact path="/500" render={this.renderPage500} />
            <Route path="/" render={this.renderDefaultLayout} />} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
