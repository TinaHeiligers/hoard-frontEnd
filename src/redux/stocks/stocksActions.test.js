import stocks from '../../fixtures/stocksData';
import stocksActions from './stocksActions.js';

describe('stocks action creators -> stocksActions', () => {
  it('gets stocks on loadStocksRequest', () => {
    const testLoadStocksRequest = stocksActions.loadStocksRequest();
    expect(testLoadStocksRequest).toEqual({
      type: stocksActions.LOAD_STOCKS_REQUEST
    });
  });
  it('returns stocks on loadStocksSuccess', () => {
    const testStocks = stocks.data;
    const testLoadStocksSuccess = stocksActions.loadStocksSuccess(testStocks);
    expect(testLoadStocksSuccess).toEqual({
      type: stocksActions.LOAD_STOCKS_SUCCESS,
      stocks: testStocks
    });
  });
  it('returns and error message on stocksError', () => {
    const testError = { message: 'Could not load stocks' };
    const testLoadStocksError = stocksActions.stocksError(testError);
    expect(testLoadStocksError).toEqual({
      type: stocksActions.STOCKS_ERROR,
      error: testError.message
    });
  });
  it('updates a stock on updateStockRequest', () => {
    const testUpdatedStock = { ...stocks.data[0], heart: true };
    const testUpdateStock = stocksActions.updateStockRequest(testUpdatedStock);
    expect(testUpdateStock).toEqual({
      type: stocksActions.UPDATE_STOCK_REQUEST,
      stock: testUpdatedStock
    })
  });
  it('updates a stock on updateStockSuccess', () => {
    const testUpdatedStock = { ...stocks.data[0], heart: true };
    const testUpdatedStockSuccess = stocksActions.updateStockSuccess(testUpdatedStock);
    expect(testUpdatedStockSuccess).toEqual({
      type: stocksActions.UPDATE_STOCK_SUCCESS,
      updatedStock: testUpdatedStock
    })
  });
});
