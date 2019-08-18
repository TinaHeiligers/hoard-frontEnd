import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import stocksActions from './stocksActions';
import { loadStocks, updateStock } from './stocksServices';

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

export function* updateStockRequestWatcher() {
  yield takeEvery(stocksActions.UPDATE_STOCK_REQUEST, updateStockRequest);
}

export function* updateStockRequest(action) {
  try {
    const result = yield call(updateStock, action.stock);
    yield put({
      type: stocksActions.UPDATE_STOCK_SUCCESS,
      updatedStock: result.data
    })
  } catch (err) {
    yield put({
      type: stocksActions.STOCKS_ERROR,
      error: 'Could not update stock'
    })
  }
}

export default function* stocksSaga() {
  yield all([
    fork(loadStocksRequestWatcher),
    fork(updateStockRequestWatcher)
  ]);
}
