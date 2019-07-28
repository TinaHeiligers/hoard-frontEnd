import React, { Fragment } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import { EuiLink, EuiText } from '@elastic/eui';
import { getRouterLinkProps } from './routerConversion';
import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';
// import { AppLayout } from './AppLayout';
function Index({ ...routeProps }) {
  return <h1 style={{ fontWeight: 'bold' }}>Home</h1>;
}

function About({ ...routeProps }) {
  return <h1 style={{ fontWeight: 'bold' }}>About</h1>;
}

function Users({ ...routeProps }) {
  return <h1 style={{ fontWeight: 'bold' }}>Users</h1>;
}

function NoMatch() {
  return <h1>404</h1>;
}

function Something({ ...routeProps }) {
  return <h1>Something</h1>
}

const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={routeProps => (
    <div>
      <Component {...routeProps} />
    </div>
  )}>
  </Route>
)

function OldSchool(props) {
  return (
    <Fragment>
      <h1>OldSchool</h1>
      <h3>Props:</h3>
      <ul>
        {Object.keys(props).map((prop, idx) => <li key={idx} style={{ listStyle: "square" }}>{prop}</li>)}
      </ul>
    </Fragment >
  )
}

function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }) {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <div className={match ? "selected" : ""}>
          {match ? "---> " : ""}
          <Link to={to}>{label}</Link>
        </div>
      )}
    />
  );
}

function EuiLinkItem({ ...routeProps }) {
  return <h1>EuiLinkItem</h1>
}
function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <NavLink
              to="/about/"
              activeClassName="selected"
              aria-current="page"
            >About</NavLink>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
          <li>
            <Link to="/cool/">Cool</Link>
          </li>
          <li>
            <OldSchoolMenuLink to="/oldschool" label="OldSchool" activeOnlyWhenExact={true} />
          </li>
          <li>
            <EuiLink {...getRouterLinkProps("/euilink/")}>
              Eui Link Item
            </EuiLink>
          </li>
        </ul>
      </nav>
      <hr />
      <hr />
      <Switch>
        {/* Using component to render, the component is returned directly with the router using React.createElement. If using an inline function to the component prop, a new component is rednered everytime instead of the existing one updating.*/}
        <Route exact path="/" component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
        {/* FadingRoute returns a function that renders props Using a render function to render the component, will be superceeded by <Route component />. Does not create a bew React element */}
        <FadingRoute path="/cool" component={Something} />
        <Route path="/oldschool" component={OldSchool} />
        <Route path="/euilink/" component={EuiLinkItem} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

export default App;
