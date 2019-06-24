import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import apisMap from 'utils/apisMap';
import request from 'utils/request';
import { GET_POSTS } from './actions';

function* takeGetPosts(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<API.MIOAZTMI046Response> => {
        const results = await request({
          url: apisMap.MIOA_ZTMI046,
          data: action.payload,
        });
        return results.data;
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function* watchPostSagaAsync(): SagaIterator {
  yield takeLatest(GET_POSTS, takeGetPosts);
}
