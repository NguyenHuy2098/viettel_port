import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

function request(options: AxiosRequestConfig): AxiosPromise {
  return axios(options);
}

export default request;
