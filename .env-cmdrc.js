const moment = require('moment');
const version = require('./package').version;

const defaultEnv = {
  REACT_APP_BUILD_TIME: moment().format(),
  REACT_APP_VERSION: version,
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
