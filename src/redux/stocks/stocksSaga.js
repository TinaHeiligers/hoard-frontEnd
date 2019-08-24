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

export function* deleteMultipleStocksRequestWatcher() {
  yield takeEvery(stocksActions.DELETE_MULTIPLE_STOCKS_REQUEST, deleteMultipleStocksRequest);
}

export function* deleteMultipleStocksRequest(action) {
  const stockIds = action.stockIds;
  try {
    yield action.stockIds.forEach(function* (id) {
      yield put({
        type: stocksActions.DELETE_SINGLE_STOCK_REQUEST,
        stockId: id,
      });
    })
    yield put({
      type: stocksActions.DELETE_MULTIPLE_STOCKS_SUCCESS,
      stockIds: stockIds,
    })
  } catch (err) {
    yield put({ type: stocksActions.STOCKS_ERROR, error: err })
  }
}

export function* deleteSingleStockRequestWatcher() {
  yield takeEvery(stocksActions.DELETE_SINGLE_STOCK_REQUEST, deleteSingleStockRequest);
}

export function* deleteSingleStockRequest(action) {
  const stockId = action.stockId;
  try {
    yield call(deleteStock, action.stockId);
    yield put({
      type: stocksActions.DELETE_SINGLE_STOCK_SUCCESS,
      stockId: stockId
    })
  } catch (err) {
    yield put({
      type: stocksActions.STOCKS_ERROR,
      error: err
    })
  }
}

export default function* stocksSaga() {
  yield all([
    fork(loadStocksRequestWatcher),
    fork(updateStockRequestWatcher),
    fork(deleteMultipleStocksRequestWatcher),
    fork(deleteSingleStockRequestWatcher),
  ]);
}
