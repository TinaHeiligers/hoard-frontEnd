import React, { Fragment } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import { EuiLink } from '@elastic/eui';
import { getRouterLinkProps } from './routerConversion';
import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';
// import { AppLayout } from './AppLayout';
function HomeComponent({ ...routeProps }) {
  return <h1 style={{ fontWeight: 'bold' }}>Home</h1>;
}

function About({ ...routeProps }) {
  return <h1 style={{ fontWeight: 'bold' }}>About</h1>;
}

function Versions({ ...routeProps }) {
  return <h1 style={{ fontWeight: 'bold' }}>Users</h1>;
}

function NoMatch() {
  return <h1>404</h1>;
}

function Topics({ ...routeProps }) {
  return <h1>Topics</h1>
}

function StocksLayout({ ...routeProps }) {
  return <h1>StocksLayout</h1>
}

function StockLayout({ ...routeProps }) {
  return <h1>Single Stock Layout</h1>
}

function CompanyContainer({ ...routeProps }) {
  return <h1>Single Company Layout</h1>
}
function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <EuiLink {...getRouterLinkProps("/")}>Home</EuiLink>
          </li>
          <li>
            <EuiLink
              activeClassName="selected"
              aria-current="page"
              {...getRouterLinkProps("/about")}
            >About</EuiLink>
          </li>
          <li>
            <EuiLink {...getRouterLinkProps("/versions")} aria-current="page">Versions</EuiLink>
          </li>
          <li>
            <EuiLink {...getRouterLinkProps("/topics")} aria-current="page">Cool</EuiLink>
          </li>
          <li>
            <EuiLink {...getRouterLinkProps("/stocks")} aria-current="page">
              StocksLayout
            </EuiLink>
          </li>

        </ul>
      </nav>
      <hr />
      <hr />
      <Switch>
        {/* Using component to render, the component is returned directly with the router using React.createElement. If using an inline function to the component prop, a new component is rednered everytime instead of the existing one updating.*/}
        <Route exact path="/" component={HomeComponent} />
        <Route path="/about" component={About} />
        <Route path="/versions" component={Versions} />
        <Route path="/topics" component={Topics} />
        <Route path="/stocks" component={StocksLayout} />
        {/* The links to the specific stock and company will be declared in the relevant table/items. See old code as an example */}
        <Route path="/stock/:stock_id" component={StockLayout} />
        <Route path="/companies/:symbol" component={CompanyContainer} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

export default App;
