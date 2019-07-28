import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export const extractRouter = onRouter => WrappedComponent =>
  withRouter(
    class extends Component {
      componentDidMount() {
        const { match, location, history } = this.props;
        const router = { route: { match, location }, history };
        onRouter(router);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
  );
