
/*eslint no-unused-vars: "warn"*/
import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  EuiButton,
  EuiCode,
  EuiDescribedFormGroup,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
} from '@elastic/eui';
import stocksActions from '../redux/stocks/stocksActions';
const createStockRequest = stocksActions.createStockRequest;

export const AddStockForm = ({ symbols }) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const error = useSelector(state => state.stocks.error);
  const [formError, setError] = useState(error);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    handleValidate();
    console.log('formError', formError)
    console.log('error', error)
    if (!formError) {
      setIsLoading(true);
      dispatch(createStockRequest(value))
      setTimeout(() => {
        setIsLoading(false);
        setValue('');
      }, 500);
    }
  }

  const handleValidate = () => {
    const dup = symbols.includes(value);
    console.log('dup', dup)
    const pattern = /^[A-Z]{2,5}((.|-)[A-Z])?$/;
    if (dup) setError('Duplicate symbol');
    if (!value.toUpperCase().match(pattern)) setError('Not a valid symbol');
  }

  if (error || formError) {
    return <div>{error || formError}</div>
  } else
    return (
      <EuiForm>
        <EuiDescribedFormGroup
          idAria="single-example-aria"
          title={<h3>Add a stock</h3>}
          description={
            <Fragment>
              Enter a stock symbol, e.g. <EuiCode>ABC</EuiCode>.
                To search for a stock symbol on the NYSE, see <a href="http://eoddata.com/symbols.aspx" taget="_blank">NYSE symbols</a>
            </Fragment>
          }>
          <EuiFlexGroup>
            <EuiFlexItem grow={2}>
              <EuiFormRow
                label="Text field"
                helpText="Enter a 3 letter NYSE symbol"
                describedByIds={['single-example-aria']}
                onChange={handleChange}>
                <EuiFieldText
                  name="symbol"
                  placeholder="Ticker symbol"
                  isLoading={isLoading}
                  value={value}
                  onChange={setValue} />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={1}>
              <EuiFormRow hasEmptyLabelSpace>
                <EuiButton
                  disabled={true}
                  type="submit"
                  onClick={handleSubmit}
                  size="s"
                  fill>Add</EuiButton>
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiDescribedFormGroup >
      </EuiForm >
    )
}
