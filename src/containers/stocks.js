import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// eui components
import {
  EuiBasicTable,
  EuiButtonIcon,
  EuiLink,
} from '@elastic/eui';

// routing items
import { getRouterLinkProps } from '../routerConversion';

// redux items
import stocksActions from '../redux/stocks/stocksActions';

const loadStocksRequest = stocksActions.loadStocksRequest;
const updateStockRequest = stocksActions.updateStockRequest;

// React component
const Stocks = () => {
  // pagination
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  // stocks
  const stocks = useSelector(state => state.stocks && state.stocks.allStocks ? state.stocks.allStocks : null);
  const useFetching = (someFetchActionCreator, dispatch) => {
    useEffect(() => {
      dispatch(someFetchActionCreator());
    }, [dispatch, someFetchActionCreator])
  }
  useFetching(loadStocksRequest, dispatch);
  // errors
  const error = useSelector(state => state.stocks.error)

  const renderStockLink = (item) => <span><EuiLink name={item.name} {...getRouterLinkProps(`${item.ref}`)}>{item.name}</EuiLink></span>

  // plain Js helper method
  const getItemIdFromSymbol = (symbol) => {
    const stockOfInterest = stocks.find(stock => stock.symbol === symbol);
    return stockOfInterest.id
  };
  // reducer calls
  const toggleFlag = (stock, flag) => {
    const updatedHeart = flag === 'heart' ? !stock.heart : stock.heart;
    const updatedStar = flag === 'star' ? !stock.star : stock.star;
    const newStock = { ...stock, heart: updatedHeart, star: updatedStar };
    dispatch(updateStockRequest(newStock))
  }
  const onTableChange = ({ page = {} }) => {
    const { index: pageIndex, size: pageSize } = page;
    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };
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
          onClick={() => toggleFlag(item, 'heart')}
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
          onClick={() => toggleFlag(item, 'star')}
          iconType="starEmptySpace"
          aria-label="Star" />
      },
    },
  ];
  const items = stocks.slice(pageIndex, Math.floor(pageIndex + pageSize)); // for pagination

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

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount: stocks.length,
    pageSizeOptions: [5, 10, 15],
    hidePerPageOptions: false,
  };

  if (error) {
    return <h1>We have an error: {JSON.stringify(error)}</h1>
  } else if (stocks && stocks.length) {
    return (
      <Fragment>
        <EuiBasicTable
          items={items}
          columns={columns}
          rowProps={getRowProps}
          cellProps={getCellProps}
          pagination={pagination}
          onChange={onTableChange}
        />
      </Fragment>)
  } else {
    return (<div>Loading...</div>)
  }
}
export default Stocks;

