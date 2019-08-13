import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { get } from 'lodash';
import store from 'redux/store';

function request(options: AxiosRequestConfig): AxiosPromise {
  options.method = options.method || 'POST';
  let accessToken = '';
  try {
    accessToken = get(store.getState(), 'auth.user.access_token');
  } catch (error) {
    console.log(error);
  }
  if (accessToken) {
    options.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return axios(options);
}

export default request;
