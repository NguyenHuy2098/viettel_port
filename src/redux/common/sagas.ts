import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { get } from 'lodash';

import { QUET_NHAN } from './actions';
import { post_MIOA_ZTMI022 } from '../MIOA_ZTMI022/helpers';
import { post_MIOA_ZTMI023 } from '../MIOA_ZTMI023/helpers';

function* takeQuetNhan(action: UnfoldSagaActionType): SagaIterator {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.RowResponseZTMI023OUT> => {
        const data023 = await post_MIOA_ZTMI023({ IV_ID: get(action, 'payload.IV_ID') });
        const item023: API.RowResponseZTMI023OUT = get(data023, 'MT_ZTMI023_OUT.row[0]');
        await post_MIOA_ZTMI022({ FU_NO: get(item023, 'TOR_ID') });
        return item023;
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeLatest(QUET_NHAN, takeQuetNhan);
}