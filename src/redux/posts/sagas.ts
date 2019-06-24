import url from 'url';
import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { REACT_APP_API_ENDPOINT } from 'utils/env';
import request from 'utils/request';
import { GET_POSTS } from './actions';

function* takeGetPosts(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      handler: async () => {
        try {
          const results = await request({
            url: url.resolve(REACT_APP_API_ENDPOINT, '/api/RESTAdapter/MIOA_ZTMI046'),
            method: 'POST',
            data: { IV_TOR_ID: '4600000037' },
          });
          return results.data;
        } catch (error) {
          console.log(error.response);
        }
      },
      key: action.type,
    },
    {},
  );
}

export default function* watchPostSagaAsync(): SagaIterator {
  yield takeLatest(GET_POSTS, takeGetPosts);
}
