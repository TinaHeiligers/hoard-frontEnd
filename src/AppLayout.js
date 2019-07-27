import React, { useState } from 'react';
import { SideNav } from './SideNav';

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

export function AppLayout() {
  const [selectedItem, setItem] = useState('');
  return (
    <EuiPage>
      <EuiPageSideBar>
        <SideNav setItem={setItem} />
        <h1>
          {selectedItem}
        </h1>
      </EuiPageSideBar>
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              {selectedItem !== '' ?
                <h1>{selectedItem}</h1> :
                <h1>Page Title</h1>
              }
            </EuiTitle>
          </EuiPageHeaderSection>
          <EuiPageHeaderSection>Page abilities</EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>Content title</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
            <EuiPageContentHeaderSection>
              Content abilities
          </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>Content body</EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  )
};
