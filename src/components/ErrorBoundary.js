import React from 'react';
import { EuiErrorBoundary, EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { useSelector, useDispatch } from 'react-redux';
import stocksActions from '../redux/stocks/stocksActions';
const clearStocksError = stocksActions.clearStocksError;

const BadComponent = () => {
  const error = useSelector(state => state.stocks.error);
  const dispatch = useDispatch();
  const clearError = () => {
    dispatch(clearStocksError())
  }
  if (error) {
    return (
      <EuiFlexGroup>
        <EuiFlexItem grow={3}>
          <h1>We have an error: {JSON.stringify(error)}</h1>
        </EuiFlexItem>
        <EuiFlexItem grow={1}>
          <EuiButton fill color="danger" onClick={clearError}>Clear Session</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    )
  }
}

export default () => (
  <EuiErrorBoundary>
    <BadComponent />
  </EuiErrorBoundary>
)
