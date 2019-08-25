import stocksActions from './stocksActions';

export const initialState = {
  allStocks: [],
  selectedStock: null,
  selectedStocks: [],
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
    case stocksActions.CLEAR_STOCKS_ERROR: {
      const newState = {
        ...currentState,
        error: null,
      }
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
    case stocksActions.ADD_SELECTED_STOCKS: {
      const newState = {
        ...currentState,
        selectedStocks: action.selectedStocks,
      }
      return newState;
    }
    case stocksActions.DELETE_SINGLE_STOCK_SUCCESS: {
      const allStocksWithoutDeleted = currentState.allStocks.filter((stock, idx) => {
        return action.stockId !== stock.id;
      });
      const selectedStocksWithoutDeleted = currentState.selectedStocks.filter((stockId, idx) => {
        return action.stockId !== stockId;
      });
      const updatedSelectedStock = currentState.selectedStock && currentState.selectedStock.id === action.stockId ? null : currentState.selectedStock;
      const newState = {
        ...currentState,
        allStocks: allStocksWithoutDeleted,
        selectedStock: updatedSelectedStock,
        selectedStocks: selectedStocksWithoutDeleted,
        error: null,
      }
      return newState;
    }
    case stocksActions.DELETE_MULTIPLE_STOCKS_SUCCESS: {
      const allStocksWithoutDeleted = currentState.allStocks.filter(stock =>
        !currentState.selectedStocks.includes(stock.id));
      // We'll assume if an error isn't thrown then all stocks selected for deletion are deleted.
      const newState = {
        ...currentState,
        allStocks: allStocksWithoutDeleted,
        selectedStocks: [],
        error: null,
      }
      return newState;
    }
    default:
      return currentState;
  }
}
