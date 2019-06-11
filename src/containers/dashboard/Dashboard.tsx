import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store';
import store from '../../redux/store';
import { actionHello } from '../../redux/reducers/hello/actions';

interface Props {
  text: string;
}

const mapStateToProps = (state: AppState): Props => {
  return {
    text: state.hello.text,
  };
};

const Dashboard: React.FC<Props> = (props): JSX.Element => {
  const { t, i18n } = useTranslation();

  const handleChangeText = (): void => {
    store.dispatch(actionHello());
  };

  const handleChangeLanguage = (): void => {
    i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
  };

  return (
    <div>
      <h1>About</h1>
      <h2>{props.text}</h2>
      <button onClick={handleChangeText}>Test Redux</button>
      <h3>{t('Welcome to React')}</h3>
      <button onClick={handleChangeLanguage}>Change Language</button>
    </div>
  );
};

export default connect(mapStateToProps)(Dashboard);
