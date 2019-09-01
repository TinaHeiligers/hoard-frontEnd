
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
const clearStocksError = stocksActions.clearStocksError;

export const AddStockForm = ({ symbols }) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setError] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const onInitiateSubmit = (event) => {
    event.preventDefault();
    handleValidate();

  }
  const handleSubmit = () => {
    setIsLoading(true);
    dispatch(createStockRequest(value))
    setTimeout(() => {
      setIsLoading(false);
      setValue('');
    }, 500);
  }

  const handleValidate = () => {
    const dup = symbols.includes(value);
    const pattern = /^[A-Z]{2,5}((.|-)[A-Z])?$/;
    if (!value.toUpperCase().match(pattern)) {
      setError(formError => formError.concat('Not a valid symbol'));
    }
    if (dup) {
      setError(formError => formError.concat('Duplicate symbol'));
    }
    if (dup || !value.toUpperCase().match(pattern)) return;
    else {
      handleSubmit()
    };
  }

  const clearError = () => {
    dispatch(clearStocksError())
    setError([])
    setValue('')
  }
  const clearErrorButton = (
    <EuiButton fill color="danger" onClick={clearError}>Clear Form</EuiButton>
  )

  return (
    <EuiForm isInvalid={formError.length > 0} errors={formError}>
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
              onChange={handleChange}
              isInvalid={formError.length > 0}
              error={formError}
            >
              <EuiFieldText
                name="symbol"
                placeholder="Ticker symbol"
                isLoading={isLoading}
                value={value}
                onChange={setValue}
                isInvalid={formError.length > 0} />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={1}>
            <EuiFormRow hasEmptyLabelSpace>
              {formError.length > 0 ? clearErrorButton :
                <EuiButton
                  disabled={formError.length > 0}
                  type="submit"
                  onClick={onInitiateSubmit}
                  size="s"
                  fill>Add</EuiButton>
              }
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>

      </EuiDescribedFormGroup >
    </EuiForm >
  )
}
