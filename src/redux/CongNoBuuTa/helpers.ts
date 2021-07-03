import { sapApiMap } from 'utils/apisMap';
import { testApi } from 'utils/request';

export async function post_COD_Chua_Chot(payload: Partial<API.TEST>): Promise<API.TEST> {
  const { data } = await testApi.get(sapApiMap.thu_tien_buu_ta, {});
  if (data) return data;
  throw new Error('Không tìm thấy.');
}
