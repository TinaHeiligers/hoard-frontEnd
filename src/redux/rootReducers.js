import { combineReducers } from 'redux';
import stocksReducer from './stocksReducer';

const rootReducer = () =>
  combineReducers({
    stocks: stocksReducer,
  });

export default rootReducer;
