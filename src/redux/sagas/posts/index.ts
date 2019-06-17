import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga } from 'redux-unfold-saga';
import { GET_POSTS } from 'redux/reducers/posts/actions';
import request from 'utils/request';

function* takeGetPosts() {
  yield unfoldSaga(
    {
      handler: async () => {
        const results = await request({
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'GET',
        });
        return results.data;
      },
      key: GET_POSTS,
    },
    {},
  );
}

export default function* watchPostSagaAsync(): SagaIterator {
  yield takeLatest(GET_POSTS, takeGetPosts);
}
