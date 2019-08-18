import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// ui components
import { Table } from '../uiComponents/BasicTable';
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
  // use a reducer to toggle heart and star
  const error = useSelector(state => state.stocks.error)
  if (error) {
    return <h1>We have an error: {error}</h1>
  } else if (stocks && stocks.length) {
    return <Table stocks={stocks} />
  } else {
    return (<div>Loading...</div>)
  }
}
export default Stocks;

