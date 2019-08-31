
/*eslint no-unused-vars: "warn"*/
import React, { Component, Fragment } from 'react';

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

export default class AddStockForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isLoading: false
    }
  };
  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({ value: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.value)
  }

  render() {
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
            <EuiFlexItem>
              <EuiFormRow
                label="Text field"
                helpText="I am some friendly help text."
                describedByIds={['single-example-aria']}
                onChange={this.handleChange}>
                <EuiFieldText
                  name="symbol"
                  isLoading={this.state.isLoading}
                  value={this.state.value}
                  onChange={this.handleChange} />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow hasEmptyLabelSpace>
                <EuiButton type="submit" onClick={this.handleSubmit} size="s" fill>Add</EuiButton>
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiDescribedFormGroup >
      </EuiForm >
    );
  }
}

