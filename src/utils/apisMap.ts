import url from 'url';
import { map, zipObject } from 'lodash';

/**
 * Add more api name here
 */
const sapApis = [
  'MIOA_ZTMI016',
  'MIOA_ZTMI022',
  'MIOA_ZTMI023',
  'MIOA_ZTMI046',
  'MIOA_ZTMI047',
  'MIOA_ZTMI012',
  'SearchLocation',
  'SIOA_ZTMI068',
  'MIOA_ZTMI011',
  'MIOA_ZTMI031',
];

/**
 * Convert api name array to apis map
 * Ex: { "MIOA_ZTMI016": "https://viettelpost.vn/api/MIOA_ZTMI016" }
 */
export const sapApiMap = zipObject(sapApis, map(sapApis, (item: string): string => url.resolve('/', item)));

export default {
  sapApiMap,
};
