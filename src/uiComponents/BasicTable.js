import React from 'react';
// eui helper services
import { formatDate } from '@elastic/eui/lib/services/format';
// eui components
import {
  EuiBasicTable,
  EuiLink,
  EuiHealth,
} from '@elastic/eui';


// routing items
import { getRouterLinkProps } from '../routerConversion';

// data
import stocks from '../redux/stocksData';

// Table:
// Eui Table Data
// const stock1 = {
//   id: '1',
//   firstName: 'john',
//   lastName: 'doe',
//   github: 'johndoe',
//   dateOfBirth: Date.now(),
//   nationality: 'NL',
//   online: true,
// }
// const stock2 = {
//   id: '2',
//   firstName: 'precious',
//   lastName: 'zizile',
//   github: 'preciouszizile',
//   dateOfBirth: Date.now(),
//   nationality: 'SA',
//   online: false,
// }
// const stock3 = {
//   id: '3',
//   firstName: 'mary',
//   lastName: 'jane',
//   github: 'maryjane',
//   dateOfBirth: Date.now(),
//   nationality: 'US',
//   online: false,
// }
// const country1 = {
//   code: 'NL',
//   name: 'Netherlands',
//   flag: '🇳🇱',
// }
// const country2 = {
//   code: 'SA',
//   name: 'Republic of South Africa',
//   flag: '🇿🇦',
// }
// const country3 = {
//   code: 'US',
//   name: 'United States of America',
//   flag: '🇺🇲',
// }
// const countries = [country1, country2, country3];
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
      dataType: 'number',
      name: 'Annual Dividends',
    },
    {
      field: 'updatedAt',
      name: 'Updated at',
      dataType: 'date',
      render: date => formatDate(date, 'dobLong'),
    },
    {
      field: 'heart',
      name: 'Liked',
      render: heart => {
        const color = heart ? 'success' : 'danger';
        const label = heart ? 'Liked' : 'Not liked';
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
    },
    {
      field: 'star',
      name: 'Watched',
      render: star => {
        const color = star ? 'success' : 'danger';
        const label = star ? 'Watched' : 'Not watched';
        return <EuiHealth color={color}>{label}</EuiHealth>;
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
