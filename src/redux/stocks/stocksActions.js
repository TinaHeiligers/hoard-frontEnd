const stocksActions = {
  LOAD_STOCKS_REQUEST: 'LOAD_STOCKS_REQUEST',
  LOAD_STOCKS_SUCCESS: 'LOAD_STOCKS_SUCCESS',
  STOCKS_ERROR: 'STOCKS_ERROR',
  UPDATE_STOCK_REQUEST: 'UPDATE_STOCK_REQUEST',
  UPDATE_STOCK_SUCCESS: 'UPDATE_STOCK_SUCCESS',
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
};
export default stocksActions;
