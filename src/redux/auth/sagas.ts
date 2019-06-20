import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import userManager from 'utils/userManager';
import { LOG_IN } from './actions';

function* takeLogin(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<void> => {
        await userManager.signinRedirect();
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function* watchPostSagaAsync(): SagaIterator {
  yield takeLatest(LOG_IN, takeLogin);
}
