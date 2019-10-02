import { AxiosResponse } from 'axios';
import { get, isEmpty } from 'lodash';
import HttpRequestError from './HttpRequetsError';

export function throwErrorIfMalformed({ data }: Partial<AxiosResponse>): void {
  if (isEmpty(data)) {
    throw new Error('Empty response.');
  }

  if (!get(data, 'Status')) {
    throw new HttpRequestError(get(data, 'ErrorCode'), get(data, 'Messages'));
  }
}
