import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// eui components
import {
  EuiBasicTable,
  EuiButtonIcon,
  EuiLink,
  EuiIcon,
} from '@elastic/eui';

// routing items
import { getRouterLinkProps } from '../routerConversion';

// redux items
import stocksActions from '../redux/stocks/stocksActions';

const loadStocksRequest = stocksActions.loadStocksRequest;
const updateStockRequest = stocksActions.updateStockRequest;

// React component
const Stocks = () => {
  const dispatch = useDispatch();
  const stocks = useSelector(state => state.stocks && state.stocks.allStocks ? state.stocks.allStocks : null);
  const useFetching = (someFetchActionCreator, dispatch) => {
    useEffect(() => {
      dispatch(someFetchActionCreator());
    }, [dispatch, someFetchActionCreator])
  }
  useFetching(loadStocksRequest, dispatch);

  const error = useSelector(state => state.stocks.error)

  const renderStockLink = (item) => <span><EuiLink name={item.name} {...getRouterLinkProps(`${item.ref}`)}>{item.name}</EuiLink></span>
  const getItemIdFromSymbol = (symbol) => {
    const stockOfInterest = stocks.find(stock => stock.symbol === symbol);
    return stockOfInterest.id
  };
  // use a reducer to toggle heart and star
  const toggleHeart = useCallback(
    (stock) => {
      const newStock = { ...stock, heart: stock.heart ? false : true };
      dispatch(updateStockRequest(newStock))
    },
    [dispatch]
  );
  const toggleStar = useCallback(
    (stock) => {
      const newStock = { ...stock, star: stock.star ? false : true };
      dispatch(updateStockRequest(newStock))
    },
    [dispatch]
  );
  const columns = [
    {
      field: 'name',
      name: 'Company Name',
      sortable: true,
      'data-test-subj': 'nameCell',
      mobileOptions: {
        render: item => renderStockLink({ ref: `/stocks/${item.id}`, name: `${item.name}` }),
        header: false,
        truncateText: false,
        enlarge: true,
        fullWidth: true,
      },
    },
    {
      field: 'symbol',
      name: 'Symbol',
      truncateText: false,
      render: symbol => renderStockLink({ ref: `/stocks/${getItemIdFromSymbol(symbol)}`, name: `${symbol}` }),
      mobileOptions: {
        show: false,
      },
    },
    {
      field: 'annualDividends',
      name: 'Annual Dividends',
      render: annualDividends => annualDividends ? annualDividends : '---'
    },
    {
      field: 'heart',
      name: 'Liked',
      dataType: 'boolean',
      render: (heart, item) => {
        const color = heart ? 'danger' : 'subdued';
        return <EuiButtonIcon
          color={color}
          item={item}
          onClick={() => toggleHeart(item)}
          iconType="heart"
          aria-label="Heart" />
      },
    },
    {
      field: 'star',
      name: 'Watched',
      dataType: 'boolean',
      render: (star, item) => {
        const color = star ? 'warning' : 'subdued';
        return <EuiButtonIcon
          color={color}
          onClick={() => toggleStar(item)}
          iconType="starEmptySpace"
          aria-label="Star" />
      },
    },
  ];
  // const items = stocks.filter((stock, index) => index < 10); // replace with pagination
  const items = stocks;

  const getRowProps = item => {
    const { id } = item;
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
      onClick: () => console.log(`Clicked row ${id}`),
    };
  };
  const getCellProps = (item, column) => {
    const { id } = item;
    const { field } = column;
    return {
      className: 'customCellClass',
      'data-test-subj': `cell-${id}-${field}`,
      textOnly: true,
    };
  };

  if (error) {
    return <h1>We have an error: {JSON.stringify(error)}</h1>
  } else if (stocks && stocks.length) {
    return (
      <EuiBasicTable
        items={items}
        columns={columns}
        rowProps={getRowProps}
        cellProps={getCellProps}
      />)
  } else {
    return (<div>Loading...</div>)
  }
}
export default Stocks;

