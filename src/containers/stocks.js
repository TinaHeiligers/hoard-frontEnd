import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// redux items
import stocksActions from '../redux/stocksActions';

const loadStocksRequest = stocksActions.loadStocksRequest;


// React component
const Stocks = () => {
  const stocks = useSelector(state => state.stocks && state.stocks.allStocks ? state.stocks.allStocks : null);
  const useFetching = (someFetchActionCreator, dispatch) => {
    useEffect(() => {
      dispatch(someFetchActionCreator());
    })
  }
  useFetching(loadStocksRequest, useDispatch());
  const error = useSelector(state => state.stocks.error)
  if (error) {
    return <h1>We have an error: {error}</h1>
  } else if (stocks && stocks.length) {
    return (<div>
      {
        stocks.map((stock) =>
          <ol key={stock.id}>
            {Object.keys(stock).map((item, index) =>
              <li key={index}>
                <span>{item}: </span>
                <span>{stock[item]}</span>
              </li>
            )}
            <br />
          </ol>
        )
      }
    </div >)
  } else {
    return (<div>Loading...</div>)
  }
}
export default Stocks;

