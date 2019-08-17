import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import stocksActions from './stocksActions';
import { loadStocks } from './stocksServices';

export function* loadStocksRequestWatcher() {
  yield takeEvery(stocksActions.LOAD_STOCKS_REQUEST, loadStocksRequest);
}

export function* loadStocksRequest() {
  try {
    const results = yield call(loadStocks);
    yield put({
      type: stocksActions.LOAD_STOCKS_SUCCESS,
      stocks: results.data
    });
  } catch (err) {
    yield put({ type: stocksActions.STOCKS_ERROR, error: err });
  }
}

export default function* stocksSaga() {
  yield all([
    fork(loadStocksRequestWatcher),
  ]);
}
