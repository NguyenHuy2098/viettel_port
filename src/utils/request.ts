import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { get, merge } from 'lodash';
import store from 'redux/store';
import {
  REACT_APP_API_ENDPOINT,
  REACT_APP_LOCATION_API_ENDPOINT,
  REACT_APP_COMMODITY_API_ENDPOINT,
  REACT_APP_SSO_API_URL,
  REACT_APP_BACKEND_API_ENDPOINT,
  REACT_APP_API_LVC,
} from './env';
import { throwErrorIfMalformed } from './errorHelpers';

/**
 * Configure default request config
 * @param requestConfig
 */
export const configure = (requestConfig: AxiosRequestConfig = {}): AxiosRequestConfig => {
  const targetConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  };
  const accessToken = get(store.getState(), 'auth.user.access_token');

  if (accessToken) {
    merge(targetConfig, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return merge(targetConfig, requestConfig);
};

/**
 * SAP API instance
 */
export const sapApi = axios.create({
  baseURL: REACT_APP_API_ENDPOINT,
});

sapApi.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return configure(config);
  },
  (error): Promise<Error> => {
    return Promise.reject(error);
  },
);

sapApi.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    throwErrorIfMalformed(response);
    return response;
  },
  (error): Promise<Error> => {
    return Promise.reject(error);
  },
);

/**
 * CRM API instance
 */
export const crmApi = axios.create({
  baseURL: REACT_APP_LOCATION_API_ENDPOINT,
});

export const crmCommodityApi = axios.create({
  baseURL: REACT_APP_COMMODITY_API_ENDPOINT,
});

crmCommodityApi.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return configure(config);
  },
  (error): Promise<Error> => {
    return Promise.reject(error);
  },
);

export const crmBackendApi = axios.create({
  baseURL: REACT_APP_BACKEND_API_ENDPOINT,
});

crmBackendApi.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return configure(config);
  },
  (error): Promise<Error> => {
    return Promise.reject(error);
  },
);

export const crmValidate = axios.create({
  baseURL: 'http://192.168.5.58:8000',
});

crmValidate.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return configure(config);
  },
  (error): Promise<Error> => {
    return Promise.reject(error);
  },
);

export const lvcSapApi = axios.create({
  baseURL: REACT_APP_API_LVC,
});

lvcSapApi.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return configure(config);
  },
  (error): Promise<Error> => {
    return Promise.reject(error);
  },
);

/**
 * SSO API instance
 */
export const ssoApi = axios.create({
  baseURL: REACT_APP_SSO_API_URL,
});

ssoApi.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return configure(config);
  },
  (error): Promise<Error> => {
    return Promise.reject(error);
  },
);

export default {
  lvcSapApi,
  sapApi,
  crmApi,
  crmCommodityApi,
};
