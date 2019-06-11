import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { AppState } from 'redux/store';

interface Props {
  text: string;
}

const mapStateToProps = (state: AppState): Props => {
  return {
    text: state.hello.text,
  };
};

const Dashboard: React.FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>About</h1>
      {props.text}
      <h3>{t('Welcome to React')}</h3>
    </div>
  );
};

export default connect(mapStateToProps)(Dashboard);
