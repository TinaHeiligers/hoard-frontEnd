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
});
