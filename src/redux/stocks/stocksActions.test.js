import stocks from '../../fixtures/stocksData';
import stocksActions from './stocksActions.js';

describe('stocks action creators -> stocksActions', () => {
  it('puts LOAD_STOCKS_REQUEST on loadStocksRequest', () => {
    const testLoadStocksRequest = stocksActions.loadStocksRequest();
    expect(testLoadStocksRequest).toEqual({
      type: stocksActions.LOAD_STOCKS_REQUEST
    });
  });
  it('puts LOAD_STOCKS_SUCCESS with a payload of stocks on loadStocksSuccess', () => {
    const testStocks = stocks.data;
    const testLoadStocksSuccess = stocksActions.loadStocksSuccess(testStocks);
    expect(testLoadStocksSuccess).toEqual({
      type: stocksActions.LOAD_STOCKS_SUCCESS,
      stocks: testStocks
    });
  });
  it('puts STOCKS_ERROR with an error message on stocksError', () => {
    const testError = { message: 'Could not load stocks' };
    const testLoadStocksError = stocksActions.stocksError(testError);
    expect(testLoadStocksError).toEqual({
      type: stocksActions.STOCKS_ERROR,
      error: testError.message
    });
  });
  it('puts CLEAR_STOCKS_ERROR on clearStocksError', () => {
    const testClearStocksError = stocksActions.clearStocksError();
    expect(testClearStocksError).toEqual({
      type: stocksActions.CLEAR_STOCKS_ERROR,
    });
  });
  it('puts UPDATE_STOCKS_REQUEST with the stock item on updateStockRequest', () => {
    const testUpdatedStock = { ...stocks.data[0], heart: true };
    const testUpdateStock = stocksActions.updateStockRequest(testUpdatedStock);
    expect(testUpdateStock).toEqual({
      type: stocksActions.UPDATE_STOCK_REQUEST,
      stock: testUpdatedStock
    })
  });
  it('puts UPDATE_STOCK_SUCCESS with the updated stock on updateStockSuccess', () => {
    const testUpdatedStock = { ...stocks.data[0], heart: true };
    const testUpdatedStockSuccess = stocksActions.updateStockSuccess(testUpdatedStock);
    expect(testUpdatedStockSuccess).toEqual({
      type: stocksActions.UPDATE_STOCK_SUCCESS,
      updatedStock: testUpdatedStock
    });
  });
  it('puts ADD_SELECTED_STOCKS with an array of stockIds on addSelectedStocks', () => {
    const testStockIdsToAdd = ['10', '11'];
    const testAddSelectedStocks = stocksActions.addSelectedStocks(testStockIdsToAdd);
    expect(testAddSelectedStocks).toEqual({
      type: stocksActions.ADD_SELECTED_STOCKS,
      selectedStocks: testStockIdsToAdd,
    })
  })
  it('puts DELETE_MULTIPLE_STOCKS_REQUEST with an array of ids on deleteMultipleStocksRequest', () => {
    const testIds = ['1', '2'];
    const testDeleteMultipleStocksRequest = stocksActions.deleteMultipleStocksRequest(testIds);
    expect(testDeleteMultipleStocksRequest).toEqual({
      type: stocksActions.DELETE_MULTIPLE_STOCKS_REQUEST,
      stockIds: testIds,
    });
  });
  it('puts DELETE_MULTIPLE_STOCKS_SUCCESS on deleteMultipleStocksSuccess', () => {
    const testDeleteMultipleStocksSuccess = stocksActions.deleteMultipleStocksSuccess();
    expect(testDeleteMultipleStocksSuccess).toEqual({
      type: stocksActions.DELETE_MULTIPLE_STOCKS_SUCCESS,
    });
  });
  it('puts DELETE_SINGLE_STOCK_REQUEST with a single id on deleteSingleStockRequest', () => {
    const testId = 1;
    const testDeleteSingleStockRequest = stocksActions.deleteSingleStockRequest(testId);
    expect(testDeleteSingleStockRequest).toEqual({
      type: stocksActions.DELETE_SINGLE_STOCK_REQUEST,
      stockId: testId,
    });
  });
  it('puts DELETE_SINGLE_STOCK_SUCCESS with a single id on deleteSingleStockSuccess', () => {
    const testId = 1;
    const testDeleteSingleStockSuccess = stocksActions.deleteSingleStockSuccess(testId);
    expect(testDeleteSingleStockSuccess).toEqual({
      type: stocksActions.DELETE_SINGLE_STOCK_SUCCESS,
      stockId: testId,
    });
  });
});
