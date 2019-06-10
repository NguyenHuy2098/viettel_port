import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import store from 'redux/store';
import { actionHello } from 'redux/reducers/hello/actions';

const Dashboard = props => {
  const handleChangeData = () => {
    store.dispatch(actionHello());
  };

  const handleChangeDataAsync = () => {
    store.dispatch({ type: 'INCREMENT_ASYNC' });
  };

  const { t, i18n } = useTranslation();

  const handleChangeLanguage = () => {
    return i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
  };

  return (
    <div>
      <h1>Home</h1>
      <h2>{props.hello}</h2>
      <button onClick={handleChangeData}>Test Redux</button>
      {<h2>{props.helloSaga}</h2>}
      <button onClick={handleChangeDataAsync}>Test Saga</button>
      <h3>{t('Welcome to React')}</h3>
      <button onClick={handleChangeLanguage}>Change language</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    hello: state.hello,
    helloSaga: state.helloSaga,
  };
};

export default connect(mapStateToProps)(Dashboard);
