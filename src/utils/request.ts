import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { get, merge } from 'lodash';
import store from 'redux/store';
import { REACT_APP_API_ENDPOINT } from './env';
import { throwErrorIfEmpty } from './errorHelpers';

/**
 * Configure default request config
 * @param requestConfig
 */
export const configure = (requestConfig: AxiosRequestConfig = {}): AxiosRequestConfig => {
  const targetConfig = {
    headers: {
      'Access-Control-Allow-Origin': '*',
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
    throwErrorIfEmpty(response);
    return response;
  },
  (error): Promise<Error> => {
    return Promise.reject(error);
  },
);

export default {
  sapApi,
};
