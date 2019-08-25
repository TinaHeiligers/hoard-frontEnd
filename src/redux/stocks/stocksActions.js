const stocksActions = {
  ADD_SELECTED_STOCKS: 'ADD_SELECTED_STOCKS',
  LOAD_STOCKS_REQUEST: 'LOAD_STOCKS_REQUEST',
  LOAD_STOCKS_SUCCESS: 'LOAD_STOCKS_SUCCESS',
  UPDATE_STOCK_REQUEST: 'UPDATE_STOCK_REQUEST',
  UPDATE_STOCK_SUCCESS: 'UPDATE_STOCK_SUCCESS',
  STOCKS_ERROR: 'STOCKS_ERROR',
  CLEAR_STOCKS_ERROR: 'CLEAR_STOCKS_ERROR',
  DELETE_MULTIPLE_STOCKS_REQUEST: 'DELETE_MULTIPLE_STOCKS_REQUEST',
  DELETE_MULTIPLE_STOCKS_SUCCESS: 'DELETE_MULTIPLE_STOCKS_SUCCESS',
  DELETE_SINGLE_STOCK_REQUEST: 'DELETE_SINGLE_STOCK_REQUEST',
  DELETE_SINGLE_STOCK_SUCCESS: 'DELETE_SINGLE_STOCK_SUCCESS',
  CREATE_STOCK_REQUEST: 'CREATE_STOCK_REQUEST',
  CREATE_STOCK_ERROR: 'CREATE_STOCK_ERROR',
  CREATE_STOCK_SUCCESS: 'CREATE_STOCK_SUCCESS',
  addSelectedStocks: (selectedStockIds) => ({
    type: stocksActions.ADD_SELECTED_STOCKS,
    selectedStocks: selectedStockIds,
  }),
  clearStocksError: () => ({
    type: stocksActions.CLEAR_STOCKS_ERROR,
  }),
  loadStocksRequest: () => ({
    type: stocksActions.LOAD_STOCKS_REQUEST
  }),
  loadStocksSuccess: stocks => ({
    type: stocksActions.LOAD_STOCKS_SUCCESS,
    stocks: stocks
  }),
  updateStockRequest: stock => ({
    type: stocksActions.UPDATE_STOCK_REQUEST,
    stock: stock
  }),
  updateStockSuccess: updatedStock => ({
    type: stocksActions.UPDATE_STOCK_SUCCESS,
    updatedStock: updatedStock
  }),
  stocksError: err => ({
    type: stocksActions.STOCKS_ERROR,
    error: err.message
  }),
  deleteMultipleStocksRequest: stockIds => ({
    type: stocksActions.DELETE_MULTIPLE_STOCKS_REQUEST,
    stockIds: stockIds
  }),
  deleteMultipleStocksSuccess: () => ({
    type: stocksActions.DELETE_MULTIPLE_STOCKS_SUCCESS,
  }),
  deleteSingleStockRequest: (id) => ({
    type: stocksActions.DELETE_SINGLE_STOCK_REQUEST,
    stockId: id,
  }),
  deleteSingleStockSuccess: (id) => ({
    type: stocksActions.DELETE_SINGLE_STOCK_SUCCESS,
    stockId: id,
  }),
  createStockRequest: symbol => ({
    type: stocksActions.CREATE_STOCK_REQUEST,
    symbol: symbol
  }),
  createStockSuccess: newStock => ({
    type: stocksActions.CREATE_STOCK_SUCCESS,
    newStock: newStock
  }),
};
export default stocksActions;
