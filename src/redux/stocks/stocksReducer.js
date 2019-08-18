import stocksActions from './stocksActions';

export const initialState = {
  allStocks: [],
  selectedStock: null,
  error: null
};

export default function stocksReducer(currentState = initialState, action) {
  switch (action.type) {
    case stocksActions.LOAD_STOCKS_SUCCESS: {
      const newState = {
        ...currentState,
        allStocks: action.stocks,
        error: null
      };
      return newState;
    }
    case stocksActions.STOCKS_ERROR: {
      const newState = {
        ...currentState,
        error: action.error
      };
      return newState;
    }
    case stocksActions.UPDATE_STOCK_SUCCESS: {
      const updatedStocks = currentState.allStocks.map((stock, idx) => {
        if (stock.id === action.updatedStock.id) {
          stock = action.updatedStock
        };
        return stock;
      });
      const newState = {
        ...currentState,
        allStocks: updatedStocks
      };
      return newState;
    }
    default:
      return currentState;
  }
}
