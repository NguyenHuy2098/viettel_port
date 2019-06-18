import url from 'url';
import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { GET_POSTS } from 'redux/reducers/posts/actions';
import { REACT_APP_API_ENDPOINT } from 'utils/env';
import request from 'utils/request';

function* takeGetPosts(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      handler: async () => {
        const results = await request({
          url: url.resolve(REACT_APP_API_ENDPOINT, '/posts'),
          method: 'GET',
        });
        return results.data;
      },
      key: action.type,
    },
    {},
  );
}

export default function* watchPostSagaAsync(): SagaIterator {
  yield takeLatest(GET_POSTS, takeGetPosts);
}
