import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { AppState } from 'redux/store';

interface Props {
  text: string;
}

const { t } = useTranslation();

class Dashboard extends React.PureComponent<Props> {
  public render(): React.ReactElement {
    return (
      <div>
        <h1>About</h1>
        {this.props.text}
        <h3>{t('Welcome to React')}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): Props => {
  return {
    text: state.hello.text,
  };
};

export default connect(mapStateToProps)(Dashboard);
