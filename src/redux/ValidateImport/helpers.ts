import { size } from 'lodash';
import { crmValidate } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function validateImportExcel(payload: Partial<any>): Promise<any> {
  const { data } = await crmValidate.post('/validate-arr', payload);
  if (size(data)) return data;
  throw new HttpRequestError(data.ErrorCode, data.Messages);
}
