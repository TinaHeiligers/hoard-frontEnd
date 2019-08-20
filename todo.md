# TO-DO's
## Table Functionality:
* add sparklines (consider https://github.com/borisyankov/react-sparklines if compatibile with current work)
* implement table links
## Stocks view
* figure out what should be rendered based on data that's returned since the only extra items returned are :
    "exchange": null,
    "website": null,
    "ceo": null,
    "sector": null,
    "industry": null,
    "employees": null
## Companies view:
API: {{altBaseUrl}}/api/v1/companies/{stockSymbol}
returns data of the form companyData.

## Tests:
* try to figure out why husky git hooks aren't working
* install and use react-testing-library