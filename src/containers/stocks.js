import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  EuiBasicTable,
  EuiButton,
  EuiButtonIcon,
  EuiLink,
} from '@elastic/eui';
import { compareValues } from '../utilities/generalMethods';
import { getRouterLinkProps } from '../routerConversion';
import AddStockForm from '../components/addStock'
import stocksActions from '../redux/stocks/stocksActions';
const loadStocksRequest = stocksActions.loadStocksRequest;
const updateStockRequest = stocksActions.updateStockRequest;
const addSelectedStocks = stocksActions.addSelectedStocks;
const deleteMultipleStocks = stocksActions.deleteMultipleStocksRequest;

const Stocks = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState('symbol');
  const [sortDirection, setSortDirection] = useState('asc');
  const error = useSelector(state => state.stocks.error)
  const stocks = useSelector(state => state.stocks && state.stocks.allStocks ? state.stocks.allStocks : null);
  const selectedStocks = useSelector(state => state.stocks && state.stocks.selectedStocks ? state.stocks.selectedStocks : []);

  const dispatch = useDispatch();

  const useFetching = (someFetchActionCreator, dispatch) => {
    useEffect(() => {
      dispatch(someFetchActionCreator());
    }, [dispatch, someFetchActionCreator])
  }
  useFetching(loadStocksRequest, dispatch);

  const toggleFlag = (stock, flag) => {
    const updatedHeart = flag === 'heart' ? !stock.heart : stock.heart;
    const updatedStar = flag === 'star' ? !stock.star : stock.star;
    const newStock = { ...stock, heart: updatedHeart, star: updatedStar };
    dispatch(updateStockRequest(newStock)) // already using useDispatch() from react-redux so this is fine.
  }

  const onSelectionChange = selectedItems => {
    const selectedStockIds = selectedItems.map(item => item.id)
    dispatch(addSelectedStocks(selectedStockIds));
  };

  const onClickDelete = () => {
    dispatch(deleteMultipleStocks(selectedStocks));
  }

  const getItemIdFromSymbol = (symbol) => {
    const stockOfInterest = stocks.find(stock => stock.symbol === symbol);
    return stockOfInterest.id
  };

  const renderDeleteButton = () => {
    if (selectedStocks.length === 0) {
      return;
    }
    return <EuiButton color="danger" iconType="trash" onClick={onClickDelete}>
      Delete {selectedStocks.length} stock{selectedStocks.length > 1 ? 's' : ''}
    </EuiButton>
  }
  // Ui change methods
  const onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;
    const { field: sortField, direction: sortDirection } = sort;
    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSortField(sortField);
    setSortDirection(sortDirection);
  };
  const sortedStocks = stocks && stocks.sort(compareValues(sortField, sortDirection));
  const items = sortedStocks && sortedStocks.slice(pageIndex, Math.floor(pageIndex + pageSize));

  const renderStockLink = (item) => <span><EuiLink name={item.name} {...getRouterLinkProps(`${item.ref}`)}>{item.name}</EuiLink></span>

  const getRowProps = item => {
    const { id, symbol } = item;
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
      onClick: () => console.log(`Clicked row ${id} with symbol ${symbol}`),
    };
  };
  const getCellProps = (item, column) => {
    const { id } = item;
    const { field } = column;
    return {
      className: 'customCellClass',
      'data-test-subj': `cell-${id}-${field}`,
      textOnly: true,
      onClick: () => console.log(`Clicked row ${id}`)
    };
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
      sortable: true,
      truncateText: false,
      render: symbol => renderStockLink({ ref: `/stocks/${getItemIdFromSymbol(symbol)}`, name: `${symbol}` }),
      mobileOptions: {
        show: false,
      },
    },
    {
      field: 'annualDividends',
      name: 'Annual Dividends',
      sortable: true,
      render: annualDividends => annualDividends ? annualDividends : '---'
    },
    {
      field: 'heart',
      name: 'Liked',
      sortable: true,
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
      sortable: true,
      dataType: 'boolean',
      render: (star, item) => {
        const color = star ? 'warning' : 'subdued';
        return <EuiButtonIcon
          color={color}
          onClick={() => toggleFlag(item, 'star')}
          iconType="starEmptySpace"
          aria-label="Star" />
      },
    }
  ];

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount: stocks.length,
    pageSizeOptions: [5, 10, 15],
    hidePerPageOptions: false,
  };

  const sorting = {
    sort: {
      field: sortField,
      direction: sortDirection,
    }
  }

  const selection = {
    selectable: item => item,
    selectableMessage: selectable =>
      !selectable ? 'Item not available' : undefined,
    onSelectionChange: onSelectionChange,
  };

  if (error) {
    return <h1>We have an error: {JSON.stringify(error)}</h1>
  } else if (stocks && stocks.length) {
    return (
      <Fragment>
        <AddStockForm />
        {renderDeleteButton()}
        <EuiBasicTable
          items={items}
          itemId="id"
          columns={columns}
          rowProps={getRowProps}
          cellProps={getCellProps}
          pagination={pagination}
          sorting={sorting}
          selection={selection}
          onChange={onTableChange}
        />
      </Fragment>)
  } else {
    return (<div>Loading...</div>)
  }
}
export default Stocks;

