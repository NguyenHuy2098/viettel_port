import { AxiosResponse } from 'axios';
import { get, isEmpty } from 'lodash';
import HttpRequestError from './HttpRequetsError';

export const COMMON_ERROR_MESSAGE = 'Có lỗi xảy ra!';

export function throwErrorIfEmpty({ data }: Partial<AxiosResponse>): void {
  if (isEmpty(data)) {
    throw new Error(COMMON_ERROR_MESSAGE);
  }
}

export function throwErrorIfMalformed({ data }: Partial<AxiosResponse>): void {
  if (isEmpty(data)) {
    throw new Error(COMMON_ERROR_MESSAGE);
  }

  if (!get(data, 'Status')) {
    throw new HttpRequestError(get(data, 'ErrorCode'), get(data, 'Messages'));
  }
}

export default {
  COMMON_ERROR_MESSAGE,
  throwErrorIfEmpty,
};
