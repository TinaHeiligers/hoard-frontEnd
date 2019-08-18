import React from 'react';
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
          <EuiPageHeaderSection>Extra Stuff for: {getTitle(routerProps.location.pathname)}</EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle title={getTitle(routerProps.location.pathname)}>
                <h1>Content for {getTitle(routerProps.location.pathname)}</h1>
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
