import React, { Component } from 'react';
import { EuiLink } from '@elastic/eui';
import { getRouterLinkProps } from './routerConversion';

import { EuiSideNav } from '@elastic/eui';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideNavOpenOnMobile: false,
    };
  }

  toggleOpenOnMobile = () => {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
  };

  renderItem = (item) => <EuiLink name={item.name} {...getRouterLinkProps(`${item.ref}`)}>{item.name}</EuiLink>

  render() {
    const items = [
      {
        name: 'Home',
        id: 1,
        renderItem: () => this.renderItem({ ref: '/', name: 'Home' })
      },
      {
        name: 'About',
        id: 2,
        renderItem: () => this.renderItem({ ref: '/about', name: 'About' })
      },
      {
        name: 'Stocks',
        id: 3,
        renderItem: () => this.renderItem({ ref: '/stocks', name: 'Stocks' })
      }
    ];

    return (
      <EuiSideNav
        mobileTitle="Navigate within $APP_NAME"
        toggleOpenOnMobile={this.toggleOpenOnMobile}
        isOpenOnMobile={this.state.isSideNavOpenOnMobile}
        items={items}
      />
    );
  }
}

