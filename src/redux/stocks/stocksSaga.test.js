import { call, put, takeEvery, select } from 'redux-saga/effects';
import { loadStocks, updateStock, deleteStock } from './stocksServices';
import stocksActions from './stocksActions';
import {
  loadStocksRequestWatcher,
  loadStocksRequest,
  updateStockRequestWatcher,
  updateStockRequest,
  deleteMultipleStocksRequestWatcher,
  deleteMultipleStocksRequest,
  deleteSingleStockRequestWatcher,
  deleteSingleStockRequest
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
        error: testError
      })
    )
  });
});
describe('stocks saga -> deleteMultipleStocksRequestWatcher', () => {
  const deleteMultipleStocksRequestWatcherGen = deleteMultipleStocksRequestWatcher();
  it('should act on every DELETE_MULTIPLE_STOCKS_REQUEST', () => {
    expect(deleteMultipleStocksRequestWatcherGen.next().value).toEqual(
      takeEvery(stocksActions.DELETE_MULTIPLE_STOCKS_REQUEST, deleteMultipleStocksRequest)
    )
  });
});
describe('stocks saga -> deleteMultipleStocksRequest', () => {
  const testStockIds = [1, 2];
  const testAction = { stockIds: testStockIds };
  const deleteMultipleStocksRequestGen = deleteMultipleStocksRequest(testAction);
  it('should put DELETE_SINGLE_STOCK_REQUEST with each id in the given id', () => {
    expect(deleteMultipleStocksRequestGen.next().value).toEqual(
      put({
        type: stocksActions.DELETE_SINGLE_STOCK_REQUEST,
        stockId: 1
      })
    );
    expect(deleteMultipleStocksRequestGen.next(testStockIds[0]).value).toEqual(
      put({
        type: stocksActions.DELETE_SINGLE_STOCK_REQUEST,
        stockId: 2
      })
    );
  });
  it('should put DELETE_MULTIPLE_STOCKS_SUCCESS when all items in the array have been worked through', () => {
    expect(deleteMultipleStocksRequestGen.next().value).toEqual(
      put({
        type: stocksActions.DELETE_MULTIPLE_STOCKS_SUCCESS
      })
    );
  });
  it('should put STOCKS_ERROR on an error', () => {
    const testError = { message: 'Could not delete stocks' };
    expect(deleteMultipleStocksRequestGen.throw(testError).value).toEqual(
      put({
        type: stocksActions.STOCKS_ERROR,
        error: testError
      })
    );
  });
});
describe('stocks saga -> deleteSingleStockRequestWatcher', () => {
  const deleteSingleStockRequestWatcherGen = deleteSingleStockRequestWatcher();
  it('should act on every DELETE_SINGLE_STOCK_REQUEST', () => {
    expect(deleteSingleStockRequestWatcherGen.next().value).toEqual(
      takeEvery(stocksActions.DELETE_SINGLE_STOCK_REQUEST, deleteSingleStockRequest)
    );
  });
});
describe('stocks saga -> deleteSingleStockRequest', () => {
  const testAction = { stockId: 1 };
  const deleteSingleStockRequestGen = deleteSingleStockRequest(testAction);
  it('should call the api when given an id', () => {
    expect(deleteSingleStockRequestGen.next().value).toEqual(
      call(deleteStock, 1)
    );
  });
  it('should put DELETE_SINGLE_STOCK_SUCCESS on successful return from the api', () => {
    expect(deleteSingleStockRequestGen.next().value).toEqual(
      put({
        type: stocksActions.DELETE_SINGLE_STOCK_SUCCESS,
        stockId: 1
      })
    );
  });
  it('should throw an error if the api returns an error', () => {
    const testError = { message: 'Cannot delete stock' };
    expect(deleteSingleStockRequestGen.throw(testError).value).toEqual(
      put({
        type: stocksActions.STOCKS_ERROR,
        error: testError
      })
    )
  })
})
