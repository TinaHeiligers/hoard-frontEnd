import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// eui components
import {
  EuiBasicTable,
  EuiLink,
  EuiIcon,
} from '@elastic/eui';

// routing items
import { getRouterLinkProps } from '../routerConversion';

// redux items
import stocksActions from '../redux/stocks/stocksActions';

const loadStocksRequest = stocksActions.loadStocksRequest;

// React component
const Stocks = () => {
  const stocks = useSelector(state => state.stocks && state.stocks.allStocks ? state.stocks.allStocks : null);
  const useFetching = (someFetchActionCreator, dispatch) => {
    useEffect(() => {
      dispatch(someFetchActionCreator());
    }, [dispatch, someFetchActionCreator])
  }
  useFetching(loadStocksRequest, useDispatch());

  const error = useSelector(state => state.stocks.error)

  const renderStockLink = (item) => <span><EuiLink name={item.name} {...getRouterLinkProps(`${item.ref}`)}>{item.name}</EuiLink></span>
  const getItemIdFromSymbol = (symbol) => {
    const stockOfInterest = stocks.find(stock => stock.symbol === symbol);
    return stockOfInterest.id
  };
  // use a reducer to toggle heart and star

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
      render: item => renderStockLink({ ref: `/stocks/${getItemIdFromSymbol(item)}`, name: `${item}` }),
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
      render: heart => {
        const color = heart ? 'danger' : 'darkgray';
        return <EuiIcon color={color} type="heart" />
      },
    },
    {
      field: 'star',
      name: 'Watched',
      render: star => {
        const color = star ? 'goldenrod' : 'darkgray';
        return <EuiIcon color={color} type="starEmptySpace" />;
      },
    },
  ];
  const items = stocks.filter((stock, index) => index < 10);

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

