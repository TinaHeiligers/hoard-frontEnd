import { combineReducers } from 'redux';
import stocksReducer from './stocks/stocksReducer';

const rootReducer = () =>
  combineReducers({
    stocks: stocksReducer,
  });

export default rootReducer;
