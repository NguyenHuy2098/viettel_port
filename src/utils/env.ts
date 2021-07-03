/**
 * NOTE: These variables should only be used in .ts/.tsx files
 */

export const REACT_APP_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export const REACT_APP_BUILD_TIME = process.env.REACT_APP_BUILD_TIME;
export const REACT_APP_COMMODITY_API_ENDPOINT = process.env.REACT_APP_COMMODITY_API_ENDPOINT;
export const REACT_APP_DRIVE_URL = process.env.REACT_APP_DRIVE_URL;
export const REACT_APP_BACKEND_API_ENDPOINT = process.env.REACT_APP_BACKEND_API_ENDPOINT;
export const REACT_APP_ENV = process.env.REACT_APP_ENV;
export const REACT_APP_VERSION = process.env.REACT_APP_VERSION;
export const REACT_APP_LOCATION_API_ENDPOINT = process.env.REACT_APP_LOCATION_API_ENDPOINT;
export const REACT_APP_SSO_URL = process.env.REACT_APP_SSO_URL;
export const REACT_APP_SSO_CLIENT_ID = process.env.REACT_APP_SSO_CLIENT_ID;
export const REACT_APP_SSO_CLIENT_SECRET = process.env.REACT_APP_SSO_CLIENT_SECRET;
export const REACT_APP_SSO_API_URL = process.env.REACT_APP_SSO_API_URL || '';
export const REACT_APP_API_LVC = process.env.REACT_APP_API_LVC;
export const REACT_APP_API_IMPORT_EXCEL = process.env.REACT_APP_API_IMPORT_EXCEL || '';
export const REACT_APP_CONG_NO_BUU_TA = process.env.REACT_APP_CONG_NO_BUU_TA;

export const IS_DEVELOPMENT_ENV = REACT_APP_ENV === 'development';
export const IS_PRODUCTION_ENV = REACT_APP_ENV === 'production';
export const IS_QAS_ENV = REACT_APP_ENV === 'qas';
