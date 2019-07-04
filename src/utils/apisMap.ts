import url from 'url';
import { REACT_APP_API_ENDPOINT } from './env';

export default {
  MIOA_ZTMI046: url.resolve(REACT_APP_API_ENDPOINT, 'MIOA_ZTMI046'),
  MIOA_ZTMI047: url.resolve(REACT_APP_API_ENDPOINT, 'MIOA_ZTMI047'),
  MIOA_ZTMI016: url.resolve(REACT_APP_API_ENDPOINT, 'MIOA_ZTMI016'),
};
