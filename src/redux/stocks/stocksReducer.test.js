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
  it('clears the stocks error on CLEAR_STOCKS_ERROR', () => {
    const testState = { ...defaultState, error: 'all error' };
    const testAction = stocksActions.clearStocksError();
    const newState = stocksReducer(testState, testAction);
    expect(newState.error).toBe(null);
  });
  it('sets a given array as the selectedStocks array on ADD_SELECTED_STOCKS', () => {
    const testState = { ...defaultState };
    const stockIds = [1, 2]
    const testAction = stocksActions.addSelectedStocks(stockIds);
    const newState = stocksReducer(testState, testAction);
    expect(newState.selectedStocks).toEqual(expect.arrayContaining(stockIds))
  });
  it('removes a deleted stock from allStocks and removes the stock from selectedStock if it\' the one selected on DELETE_SINGLE_STOCK_SUCCESS', () => {
    const testState = { ...defaultState, selectedStock: { id: 1 }, selectedStocks: [1, 2, 3], allStocks: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] }
    const testAction = stocksActions.deleteSingleStockSuccess(1);
    const newState = stocksReducer(testState, testAction);
    expect(newState.selectedStock).toBe(null);
    expect(newState.allStocks.length).toEqual(3);
    expect(newState.selectedStocks).not.toEqual(expect.arrayContaining([{ id: 1 }]));
  });
  it('deletes multiple stocks from state on DELETE_MULTIPLE_STOCKS_SUCCESS', () => {
    const testState = { ...defaultState, allStocks: [{ id: 1 }, { id: 2 }, { id: 3 }], selectedStocks: [1, 2] };
    const testAction = stocksActions.deleteMultipleStocksSuccess();
    const newState = stocksReducer(testState, testAction);
    expect(newState.allStocks.length).toEqual(1);
    expect(newState.selectedStocks.length).toEqual(0);
    expect(newState.error).toBeNull();
  });
  it('adds a new stock to allStocks on state on CREATE_STOCK_SUCCESS', () => {
    const testState = { ...defaultState, allStocks: [{ id: 1 }, { id: 2 }] };
    const newStock = { id: 4, symbol: 'TE' };
    const testAction = stocksActions.createStockSuccess(newStock);
    const newState = stocksReducer(testState, testAction);
    expect(newState.allStocks.length).toEqual(3);
    expect(newState.allStocks).toEqual(expect.arrayContaining([{ id: 1 }, { id: 2 }, { id: 4, symbol: 'TE' }]))
  });
});
