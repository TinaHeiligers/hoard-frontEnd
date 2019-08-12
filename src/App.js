import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import Stocks from './containers/stocks';

import {
  HomeComponent,
  About,
  // StocksLayout,
  StockContent,
  CompanyContainer,
  NoMatch
} from './components/dummyComponents';
import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';

export function App(props) {
  return (
    <div className="App">
      <AppLayout routerProps={{ ...props }}>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route path="/about" component={About} />
          <Route path="/stocks" component={Stocks} />
          <Route path="/stock/:stock_id" component={StockContent} />
          <Route path="/companies/:symbol" component={CompanyContainer} />
          <Route path='*' component={NoMatch} />
        </Switch>
      </AppLayout>
    </div>
  );
}


export default () => (
  <div></div>
)
