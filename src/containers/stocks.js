import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import stocksActions from '../redux/stocksActions';

const loadStocksRequest = stocksActions.loadStocksRequest;

const StocksFunctionalComponent = ({ stocks, error }) => (
  stocks && stocks.length ?
    <div>
      <p>We have {stocks.length} stocks.</p>
      {stocks.map((stock) =>
        <ol key={stock.id}>
          {Object.keys(stock).map((item, index) =>
            <li key={index}>
              <span>{item}: </span>
              <span>{stock[item]}</span>
            </li>
          )}
          <br />
        </ol>
      )}
    </div> : <div>Loading...</div>
)


class Stocks extends Component {
  componentDidMount() {
    this.props.loadStocksRequest();
  }

  render() {
    if (this.props.stocks || this.props.stocks.length) {
      return (
        <div>
          <p>We have {this.props.stocks.length} stocks.</p>
          {this.props.stocks.map((stock) =>
            <ol key={stock.id}>
              {Object.keys(stock).map((item, index) =>
                <li key={index}>
                  <span>{item}: </span>
                  <span>{stock[item]}</span>
                </li>
              )}
              <br />
            </ol>
          )}
        </div>
      )
    }
    return <p>Loading...</p>
  }
}
export default connect(
  state => ({
    stocks: state.stocks.allStocks || [],
    error: state.stocks.error || null,
  }),
  { loadStocksRequest }
)(Stocks);
