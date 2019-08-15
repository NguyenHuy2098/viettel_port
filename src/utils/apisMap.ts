import url from 'url';
import { map, zipObject } from 'lodash';
import { REACT_APP_API_ENDPOINT } from './env';

/**
 * Add more api name here
 */
const apis = [
  'MIOA_ZTMI016',
  'MIOA_ZTMI022',
  'MIOA_ZTMI023',
  'MIOA_ZTMI046',
  'MIOA_ZTMI047',
  'MIOA_ZTMI012',
  'SearchLocation',
  'SIOA_ZTMI068',
];

/**
 * Convert api name array to apis map
 * Ex: { "MIOA_ZTMI016": "https://viettelpost.vn/api/MIOA_ZTMI016" }
 */
const apisMap = zipObject(apis, map(apis, (item: string): string => url.resolve(REACT_APP_API_ENDPOINT, item)));

export default apisMap;
