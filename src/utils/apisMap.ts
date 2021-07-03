import url from 'url';
import { map, zipObject } from 'lodash';

/**
 * Add more api name here
 */
const sapApis = [
  'MIOA_ZTMI016',
  'MIOA_ZTMI022',
  'MIOA_ZTMI023',
  'MIOA_ZTMI035',
  'MIOA_ZTMI046',
  'MIOA_ZTMI047',
  'MIOA_ZTMI040',
  'MIOA_ZTMI012',
  'MIOA_ZTMI011',
  'MIOA_ZTMI031',
  'MIOA_ZTMI045',
  'MIOA_ZTMI054',
  'MIOA_ZTMI055',
  'MIOA_ZTMI063',
  'SearchLocation',
  'SIOA_ZTMI068',
  'ZTMI236',
  'ZTMI240',
  'ZTMI241',
  'ZTMI213',
  'ZTMI235',
  'ZTMI239',
  'ZTMI229',
  'ZFI001',
  'ZFI002',
  'ZFI003',
  'ZFI004',
  'ZFI005',
  'ZFI006',
  'ZFI007',
  'ZFI007M',
  'thu_tien_buu_ta',
];

const crmApis = ['suggest'];

const ssoApis = ['Users/GetProfileByUsername'];

/**
 * Convert api name array to apis map
 * Ex: { "MIOA_ZTMI016": "https://viettelpost.vn/api/MIOA_ZTMI016" }
 */
export const sapApiMap = zipObject(
  sapApis,
  map(sapApis, (item: string): string => url.resolve('/', item)),
);
export const crmApiMap = zipObject(
  crmApis,
  map(crmApis, (item: string): string => url.resolve('/', item)),
);
export const ssoApiMap = zipObject(
  ssoApis,
  map(ssoApis, (item: string): string => url.resolve('/', item)),
);
export const crmApiMapParam = 'suggest/';

export default {
  sapApiMap,
  crmApiMap,
};
