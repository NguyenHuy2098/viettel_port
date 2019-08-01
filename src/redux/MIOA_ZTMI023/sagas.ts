import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { get } from 'lodash';
import apisMap from 'utils/apisMap';
import request from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_MIOA_ZTMI023 } from './actions';

function* takeGet_MIOA_ZTMI023(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.MIOAZTMI023Response> => {
        const { data } = await request({
          url: apisMap.MIOA_ZTMI023,
          data: action.payload,
        });

        let dataCheck = get(data, 'MT_ZTMI023_OUT.row.0', null);

        let check = false;
        if (dataCheck.TOR_TYPE === 'ZC3' && dataCheck.ZVTP_CUST_STATUS === 106 && dataCheck.TO_LOG_ID === 'BDH') {
          const payload = {
            row: {
              CU_NO: '',
              FU_NO: dataCheck.TOR_ID,
              STATUS_ID: '1',
              USER_ID: 'KT1',
              LOC_ID: 'HUB1',
            },
          };
          const results = await request({
            url: apisMap.MIOA_ZTMI022,
            data: payload,
          });

          check = get(results, 'data.MT_ZTMI022_OUT.EV_ERROR', 1);
        }

        if (dataCheck.ZVTP_CUST_STATUS === 107) {
          throw new HttpRequestError('400', ['Chuyến thư đã được nhận']);
        }

        if (dataCheck.TOR_TYPE !== 'ZC3') {
          throw new HttpRequestError('400', ['Có lỗi xảy ra']);
        }

        if (data.Status && check) return data;
        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeLatest(ACTION_MIOA_ZTMI023, takeGet_MIOA_ZTMI023);
}
