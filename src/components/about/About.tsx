import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from "react-i18next";
export interface Props { hello: string; helloSaga: string; }

const { t } = useTranslation()

const mapStateToProps = state => {
  return {
    hello: state.hello,
    helloSaga: state.helloSaga
  }
}

class About extends Component<Props, {}> {
  render() {
    return (
      <div>
        <h1>About</h1>
        {
          this.props.hello + this.props.helloSaga
        }
        <h3>{t('Welcome to React')}</h3>
      </div>
    )
  }
}

export default connect(mapStateToProps)(About)