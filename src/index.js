import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import './polyfill';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './languages/i18n';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

if (process.env.REACT_APP_ENV === 'production') {
  serviceWorker.register();
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
} else {
  serviceWorker.unregister();
}

if (process.env.REACT_APP_ENV === 'production') {
  if (!window.console) window.console = {};
  const methods = ['log', 'debug', 'warn', 'info'];
  for (let i = 0; i < methods.length; i++) {
    // eslint-disable-next-line no-console
    console[methods[i]] = function() {
      //
    };
  }
}
