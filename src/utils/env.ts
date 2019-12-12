/**
 * NOTE: These variables should only be used in .ts/.tsx files
 */

export const REACT_APP_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export const REACT_APP_BUILD_TIME = process.env.REACT_APP_BUILD_TIME;
export const REACT_APP_COMMODITY_API_ENDPOINT = process.env.REACT_APP_COMMODITY_API_ENDPOINT;
export const REACT_APP_ENV = process.env.REACT_APP_ENV;
export const REACT_APP_VERSION = process.env.REACT_APP_VERSION;
export const REACT_APP_LOCATION_API_ENDPOINT = process.env.REACT_APP_LOCATION_API_ENDPOINT;
export const REACT_APP_SSO_URL = process.env.REACT_APP_SSO_URL;
export const REACT_APP_SSO_CLIENT_ID = process.env.REACT_APP_SSO_CLIENT_ID;
export const REACT_APP_SSO_CLIENT_SECRET = process.env.REACT_APP_SSO_CLIENT_SECRET;

export const IS_DEVELOPMENT_ENV = REACT_APP_ENV === 'development';
export const IS_PRODUCTION_ENV = REACT_APP_ENV === 'production';
export const IS_QAS_ENV = REACT_APP_ENV === 'qas';
