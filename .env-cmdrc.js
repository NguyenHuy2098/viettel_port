const moment = require('moment');

const defaultEnv = {
  REACT_APP_BUILD_TIME: moment().format(),
  REACT_APP_VERSION: process.env.CI_COMMIT_REF_NAME || process.env.CI_COMMIT_SHORT_SHA || '-',
};

module.exports = {
  development: {
    ...defaultEnv,
    REACT_APP_ENV: 'development',
  },
  qas: {
    ...defaultEnv,
    REACT_APP_ENV: 'qas',
  },
  production: {
    ...defaultEnv,
    GENERATE_SOURCEMAP: 'false',
    REACT_APP_ENV: 'production',
  },
};
