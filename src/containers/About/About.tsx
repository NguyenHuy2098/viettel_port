import * as React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppState } from '../../redux/store';

export interface Props {
  hello: string;
}

const About: React.FC<Props> = (props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>About</h1>
      {props.hello}
      <h3>{t('Welcome to React')}</h3>
    </div>
  );
};

const mapStateToProps = (state: AppState): Props => ({
  hello: state.hello.text,
});

export default connect(mapStateToProps)(About);
