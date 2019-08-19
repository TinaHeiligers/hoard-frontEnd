import { call, put, takeEvery, select } from 'redux-saga/effects';
import { loadStocks, updateStock } from './stocksServices';
import stocksActions from './stocksActions';
import {
  loadStocksRequestWatcher,
  loadStocksRequest,
  updateStockRequestWatcher,
  updateStockRequest
} from './stocksSaga';
import stocks, { newStock } from '../../fixtures/stocksData';
// TODO: add tests for adding a stock
describe('stocks saga -> loadsStocksRequestWatcher', () => {
  const loadStocksRequestWatcherGen = loadStocksRequestWatcher();
  it('should act on every LOAD_STOCKS_REQUEST action', () => {
    expect(loadStocksRequestWatcherGen.next().value).toEqual(
      takeEvery(stocksActions.LOAD_STOCKS_REQUEST, loadStocksRequest)
    );
  });
});
describe('stocks saga -> loadStocksRequest', () => {
  const loadStocksRequestGen = loadStocksRequest();
  it('should call the api', () => {
    expect(loadStocksRequestGen.next().value).toEqual(call(loadStocks));
  });
  it('should put LOAD_STOCKS_SUCCESS on success of the api call', () => {
    const testResult = { data: [] };
    expect(loadStocksRequestGen.next(testResult).value).toEqual(
      put({ type: stocksActions.LOAD_STOCKS_SUCCESS, stocks: testResult.data })
    );
  });
  it('should put STOCKS_ERROR action on an error', () => {
    const testError = new Error('Error');
    expect(loadStocksRequestGen.throw(testError).value).toEqual(
      put({ type: stocksActions.STOCKS_ERROR, error: testError })
    );
  });
});
describe('stocks saga -> updateStockRequestWatcher', () => {
  const updateStockRequestWatcherGen = updateStockRequestWatcher();
  it('should act on every UPDATE_STOCK_REQUEST', () => {
    expect(updateStockRequestWatcherGen.next().value).toEqual(
      takeEvery(stocksActions.UPDATE_STOCK_REQUEST, updateStockRequest)
    )
  });
});
describe('stocks saga -> updateStockRequest', () => {
  const testStock = { ...stocks.data[0], star: false };
  const testAction = { stock: testStock }
  const updateStockRequestGen = updateStockRequest(testAction);
  it('should call the api', () => {
    expect(updateStockRequestGen.next().value).toEqual(
      call(updateStock, testAction.stock)
    );
  });
  it('should put UPDATE_STOCK_SUCCESS on success of the api call', () => {
    const testResult = { data: testStock };
    expect(updateStockRequestGen.next(testResult).value).toEqual(
      put({
        type: stocksActions.UPDATE_STOCK_SUCCESS,
        updatedStock: testResult.data
      })
    );
  });
  it('should put STOCK_ERROR on an error from the api', () => {
    const testError = { message: 'Could not update stock' };
    expect(updateStockRequestGen.throw(testError).value).toEqual(
      put({
        type: stocksActions.STOCKS_ERROR,
        error: testError.message
      })
    )
  })
})
