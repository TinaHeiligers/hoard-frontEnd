import stocksReducer, { initialState } from './stocksReducer';
import stocksActions from './stocksActions';
import stocks from '../../fixtures/stocksData';

describe('stocks reducer -> load stocks', () => {
  const defaultState = stocksReducer(initialState, { type: 'unexpected' });
  it('returns an object', () => {
    expect(defaultState).toBeInstanceOf(Object);
  });
  it('returns an object equal to initialState', () => {
    const expected = ['allStocks', 'selectedStock', 'error'];
    expect(Object.keys(defaultState)).toEqual(expect.arrayContaining(expected));
  });
  it('adds new stocks on state on LOAD_STOCKS_SUCCESS', () => {
    const testStocks = [];
    let testAction = stocksActions.loadStocksSuccess(testStocks);
    const newState = stocksReducer(defaultState, testAction);
    expect(newState.allStocks).toEqual(testStocks);
    expect(newState.error).toBeNull();
  });
  it('adds an error to state on STOCKS_ERROR', () => {
    const testError = { message: 'Could not load stocks' };
    let testAction = stocksActions.stocksError(testError);
    const newState = stocksReducer(defaultState, testAction);
    expect(newState.error).toEqual(testError.message);
  });
  it('updates a stock on UPDATE_STOCK_SUCCESS', () => {
    const testState = { ...defaultState, allStocks: stocks.data };
    const testUpdatedStock = { ...stocks.data[0], star: true }
    let testAction = stocksActions.updateStockSuccess(testUpdatedStock);
    const newState = stocksReducer(testState, testAction);
    const testItem = newState.allStocks.find(stock => stock.id === testUpdatedStock.id);
    expect(testItem.star).toBeTruthy();
  });
});
