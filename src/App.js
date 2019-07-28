import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';
// import { AppLayout } from './AppLayout';
function Index() {
  return <h1 style={{ fontWeight: 'bold' }}>Home</h1>;
}

function About() {
  return <h1 style={{ fontWeight: 'bold' }}>About</h1>;
}

function Users() {
  return <h1 style={{ fontWeight: 'bold' }}>Users</h1>;
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
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <hr />
      <Route path="/" exact component={Index} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
    </div>
  );
}

export default App;
