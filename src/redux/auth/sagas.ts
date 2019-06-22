import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import userManager from 'utils/userManager';
import { LOG_IN, LOG_OUT } from './actions';

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

function* takeLogout(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<void> => {
        await userManager.removeUser();
        await userManager.revokeAccessToken();
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function* watchAuthSagaAsync(): SagaIterator {
  yield takeLatest(LOG_IN, takeLogin);
  yield takeLatest(LOG_OUT, takeLogout);
}
