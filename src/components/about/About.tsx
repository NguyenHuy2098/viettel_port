import * as React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AppState } from 'redux/store';

export interface Props {
  hello: string;
}

const { t } = useTranslation();

class About extends React.PureComponent<Props> {
  public render(): React.ReactElement {
    return (
      <div>
        <h1>About</h1>
        {this.props.hello}
        <h3>{t('Welcome to React')}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): Props => ({
  hello: state.hello.text,
});

export default connect(mapStateToProps)(About);
