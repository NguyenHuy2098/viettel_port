import { SagaIterator } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';
import { unfoldSaga, UnfoldSagaActionType } from 'redux-unfold-saga';
import { crmValidate } from 'utils/request';
import HttpRequestError from 'utils/HttpRequetsError';
import { ACTION_HISTORY_IMPORT } from './actions';
// import { historyImportExcel } from './helpers';

function* historyImport(action: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<DetailSuggestedLocation> => {
        const { data } = await crmValidate.get('/history', {
          params: action.payload,
        });
        if (data) return data;
        throw new HttpRequestError(data.ErrorCode, data.Messages);
      },
      key: action.type,
    },
    action.callbacks,
  );
}

export default function*(): SagaIterator {
  yield takeEvery(ACTION_HISTORY_IMPORT, historyImport);
}
