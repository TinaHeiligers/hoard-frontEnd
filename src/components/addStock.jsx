
/*eslint no-unused-vars: "warn"*/
import React, { useState, Fragment } from 'react';

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

export const AddStockForm = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true)
    console.log('value', value);
    setTimeout(() => {
      setIsLoading(false);
      setValue('');
    }, 500);
  }
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
              <EuiButton type="submit" onClick={handleSubmit} size="s" fill>Add</EuiButton>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiDescribedFormGroup >
    </EuiForm >
  )
}
