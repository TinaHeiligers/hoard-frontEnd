import React from 'react';

export function HomeComponent({ ...routeProps }) {
  return <div>Home Page Content</div>;
};

export function About({ ...routeProps }) {
  return (
    <div>
      <h1>About Page Content</h1>
    </div>
  );
};

export function NoMatch() {
  return <div>404 Page Content</div>;
};

export function StockContent({ ...routeProps }) {
  return <div>Single Stock Page Content</div>
};

export function CompanyContainer({ ...routeProps }) {
  return <div>Single Company Page Content</div>
};
