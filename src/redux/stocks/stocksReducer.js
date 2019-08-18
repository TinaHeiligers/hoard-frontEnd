import stocksActions from './stocksActions';

export const initialState = {
  allStocks: [],
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
    default:
      return currentState;
  }
}
