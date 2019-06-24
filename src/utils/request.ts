import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import store from 'redux/store';

function request(options: AxiosRequestConfig): AxiosPromise {
  let accessToken = '';
  try {
    accessToken = store.getState().auth.user.access_token;
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
