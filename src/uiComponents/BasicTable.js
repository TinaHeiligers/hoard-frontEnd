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

// Table:
// Eui Table Data
const user1 = {
  id: '1',
  firstName: 'john',
  lastName: 'doe',
  github: 'johndoe',
  dateOfBirth: Date.now(),
  nationality: 'NL',
  online: true,
}
const user2 = {
  id: '2',
  firstName: 'precious',
  lastName: 'zizile',
  github: 'preciouszizile',
  dateOfBirth: Date.now(),
  nationality: 'SA',
  online: false,
}
const user3 = {
  id: '3',
  firstName: 'mary',
  lastName: 'jane',
  github: 'maryjane',
  dateOfBirth: Date.now(),
  nationality: 'US',
  online: false,
}
const country1 = {
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱',
}
const country2 = {
  code: 'SA',
  name: 'Republic of South Africa',
  flag: '🇿🇦',
}
const country3 = {
  code: 'US',
  name: 'United States of America',
  flag: '🇺🇲',
}
const users = [user1, user2, user3];
const countries = [country1, country2, country3];

// router helper method
const renderStockLink = (item) => <span><EuiLink name={item.name} {...getRouterLinkProps(`${item.ref}`)}>{item.name}</EuiLink></span>
export const Table = () => {
  const columns = [
    {
      field: 'firstName',
      name: 'First Name',
      sortable: true,
      'data-test-subj': 'firstNameCell',
      mobileOptions: {
        render: item => renderStockLink({ ref: `/stock/${item.id}`, name: `${item.lastName}` }),
        header: false,
        truncateText: false,
        enlarge: true,
        fullWidth: true,
      },
    },
    {
      field: 'lastName',
      name: 'Last Name',
      truncateText: false,
      render: name => renderStockLink({ ref: `#`, name: `${name}` }),
      mobileOptions: {
        show: false,
      },
    },
    {
      field: 'github',
      name: 'Github',
    },
    {
      field: 'dateOfBirth',
      name: 'Date of Birth',
      dataType: 'date',
      render: date => formatDate(date, 'dobLong'),
    },
    {
      field: 'nationality',
      name: 'Nationality',
      render: countryCode => {
        const country = countries.find((country) => country.code === countryCode)
        return `${country.flag} ${country.name}`;
      },
    },
    {
      field: 'online',
      name: 'Online',
      dataType: 'boolean',
      render: online => {
        const color = online ? 'success' : 'danger';
        const label = online ? 'Online' : 'Offline';
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
    },
  ];
  const items = users.filter((user, index) => index < 10);

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
