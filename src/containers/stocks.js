import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import stocksActions from '../redux/stocksActions';

const loadStocksRequest = stocksActions.loadStocksRequest;

class Stocks extends Component {
  componentDidMount() {
    this.props.loadStocksRequest();
  }
  render() {
    return (
      <div>
        <p>We have {this.props.stocks.length} stocks.</p>
      </div>
    )
  }
}
export default connect(
  state => ({
    stocks: state.stocks.allStocks || [],
    error: state.stocks.error || null,
  }),
  { loadStocksRequest }
)(Stocks);
