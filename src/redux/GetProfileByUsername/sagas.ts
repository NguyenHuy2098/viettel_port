import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';

import { ACTION_GET_PROFILE_BY_USERNAME } from './actions';
import { post_GetProfileByUsername } from './helpers';

function* takeGet_LOCATIONSUGGEST_DETAIL(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: () => post_GetProfileByUsername(action.payload),
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeLatest(ACTION_GET_PROFILE_BY_USERNAME, takeGet_LOCATIONSUGGEST_DETAIL);
}
