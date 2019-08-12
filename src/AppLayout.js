import React, { useState } from 'react';
import SideNav from './SideNav';
import '@elastic/eui/dist/eui_theme_light.css';

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
} from '@elastic/eui';


function User(props) {
  return <h1>Hello {props.match.params.username}!</h1>;
}
function PageTitle(title) {
  return <h1 style={{ textTransform: 'uppercase' }}>{title.title}</h1>
}
function getTitle(pathString) {
  switch (pathString) {
    case '/':
      return 'Home';
    case '/about':
      return 'About';
    case '/stocks':
      return 'All stocks';
    default:
      return 'Not found';
  }
}


export function AppLayout({ routerProps, children }) {
  return (
    <EuiPage>
      <EuiPageSideBar>
        <SideNav />
      </EuiPageSideBar>
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <PageTitle title={getTitle(routerProps.location.pathname)} />
            </EuiTitle>
          </EuiPageHeaderSection>
          <EuiPageHeaderSection>Page abilities</EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h1>Page Content Header Section</h1>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            {children}
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  )
};
