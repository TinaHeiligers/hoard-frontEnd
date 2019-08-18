import React from 'react';
// eui helper services
import { formatDate } from '@elastic/eui/lib/services/format';
// eui components
import {
  EuiBasicTable,
  EuiLink,
  EuiHealth,
  EuiIcon,
} from '@elastic/eui';


// routing items
import { getRouterLinkProps } from '../routerConversion';

// data
import stocks from '../redux/stocksData';

const stocksData = stocks.data;
// router helper method
const renderStockLink = (item) => <span><EuiLink name={item.name} {...getRouterLinkProps(`${item.ref}`)}>{item.name}</EuiLink></span>
export const Table = () => {
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
      render: item => renderStockLink({ ref: `#`, name: `${item}` }),
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
  const items = stocksData.filter((stock, index) => index < 10);

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
  return (
    <EuiBasicTable
      items={items}
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
    />
  );
};
