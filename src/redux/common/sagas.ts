import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { get } from 'lodash';

import { makeSelectorMaBP } from 'redux/auth/selectors';
import { select } from 'utils/stateHelpers';
import { QUET_NHAN } from './actions';
import { post_MIOA_ZTMI022 } from '../MIOA_ZTMI022/helpers';
import { post_MIOA_ZTMI023 } from '../MIOA_ZTMI023/helpers';

function* takeQuetNhan(action: UnfoldSagaActionType): SagaIterator {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.RowResponseZTMI023OUT> => {
        const data023 = await post_MIOA_ZTMI023({
          IV_ID: get(action, 'payload.IV_ID'),
        });
        const item023: API.RowResponseZTMI023OUT = get(data023, 'MT_ZTMI023_OUT.row[0]');
        const maBP = select(makeSelectorMaBP);
        await post_MIOA_ZTMI022({
          FU_NO: get(item023, 'TOR_ID'),
          LOC_ID: maBP,
          STATUS_ID: '1',
        });
        return item023;
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(QUET_NHAN, takeQuetNhan);
}
