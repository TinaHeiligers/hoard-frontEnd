const stocks = {
  data: [
    {
      id: 23,
      symbol: "GCI",
      name: "Gannett Co. Inc.",
      annualDividends: 4,
      heart: false,
      star: null,
      createdAt: "2019-02-03T23:57:07.967Z",
      updatedAt: "2019-02-10T23:54:45.393Z",
      url: "http://localhost:3090/api/v1/stocks/23"
    },
    {
      id: 25,
      symbol: "MSFT",
      name: "Microsoft Corporation",
      annualDividends: 4,
      heart: null,
      star: null,
      createdAt: "2019-02-04T00:07:29.018Z",
      updatedAt: "2019-02-04T00:07:29.018Z",
      url: "http://localhost:3090/api/v1/stocks/25"
    },
    {
      id: 30,
      symbol: "CIM",
      name: "Chimera Investment Corporation",
      annualDividends: 4,
      heart: true,
      star: true,
      createdAt: "2019-02-10T00:21:14.101Z",
      updatedAt: "2019-05-27T22:32:42.211Z",
      url: "http://localhost:3090/api/v1/stocks/30"
    },
    {
      id: 31,
      symbol: "PEI",
      name: "Pennsylvania Real Estate Investment Trust",
      annualDividends: 4,
      heart: null,
      star: null,
      createdAt: "2019-02-10T00:22:05.513Z",
      updatedAt: "2019-02-10T00:22:05.513Z",
      url: "http://localhost:3090/api/v1/stocks/31"
    },
    {
      id: 35,
      symbol: "NFLX",
      name: "Netflix Inc.",
      annualDividends: null,
      heart: false,
      star: false,
      createdAt: "2019-02-11T00:26:01.640Z",
      updatedAt: "2019-02-15T21:58:37.338Z",
      url: "http://localhost:3090/api/v1/stocks/35"
    },
    {
      id: 37,
      symbol: "FB",
      name: "Facebook Inc.",
      annualDividends: null,
      heart: null,
      star: null,
      createdAt: "2019-02-11T01:22:25.889Z",
      updatedAt: "2019-02-11T01:22:25.889Z",
      url: "http://localhost:3090/api/v1/stocks/37"
    },
    {
      id: 38,
      symbol: "GDDY",
      name: "GoDaddy Inc. Class A",
      annualDividends: null,
      heart: true,
      star: true,
      createdAt: "2019-02-11T01:22:44.565Z",
      updatedAt: "2019-03-16T18:01:39.044Z",
      url: "http://localhost:3090/api/v1/stocks/38"
    },
    {
      id: 41,
      symbol: "KO",
      name: "Coca-Cola Company (The)",
      annualDividends: 4,
      heart: null,
      star: null,
      createdAt: "2019-02-16T17:33:30.831Z",
      updatedAt: "2019-02-16T17:33:30.831Z",
      url: "http://localhost:3090/api/v1/stocks/41"
    },
    {
      id: 44,
      symbol: "ESTC",
      name: "Elastic N.V.",
      annualDividends: null,
      heart: true,
      star: true,
      createdAt: "2019-02-17T19:47:28.993Z",
      updatedAt: "2019-05-27T20:51:19.002Z",
      url: "http://localhost:3090/api/v1/stocks/44"
    },
    {
      id: 46,
      symbol: "DOG",
      name: "ProShares Short Dow30",
      annualDividends: 5,
      heart: null,
      star: null,
      createdAt: "2019-02-17T19:47:57.593Z",
      updatedAt: "2019-02-17T19:47:57.593Z",
      url: "http://localhost:3090/api/v1/stocks/46"
    },
    {
      id: 48,
      symbol: "QED",
      name: "IQ Hedge Event-Driven Tracker",
      annualDividends: 1,
      heart: null,
      star: null,
      createdAt: "2019-02-17T20:40:57.217Z",
      updatedAt: "2019-02-17T20:40:57.217Z",
      url: "http://localhost:3090/api/v1/stocks/48"
    },
    {
      id: 49,
      symbol: "PTY",
      name: "Pimco Corporate & Income Opportunity Fund",
      annualDividends: 12,
      heart: null,
      star: null,
      createdAt: "2019-02-18T18:02:18.407Z",
      updatedAt: "2019-02-18T18:02:18.407Z",
      url: "http://localhost:3090/api/v1/stocks/49"
    },
    {
      id: 54,
      symbol: "CCA",
      name: "MFS California Municipal Fund of Beneficial Interest",
      annualDividends: 16,
      heart: null,
      star: null,
      createdAt: "2019-02-18T21:09:03.757Z",
      updatedAt: "2019-02-18T21:09:03.757Z",
      url: "http://localhost:3090/api/v1/stocks/54"
    },
    {
      id: 55,
      symbol: "CAC",
      name: "Camden National Corporation",
      annualDividends: 4,
      heart: true,
      star: true,
      createdAt: "2019-02-18T21:09:08.347Z",
      updatedAt: "2019-03-15T22:45:23.316Z",
      url: "http://localhost:3090/api/v1/stocks/55"
    },
    {
      id: 56,
      symbol: "BC",
      name: "Brunswick Corporation",
      annualDividends: 4,
      heart: true,
      star: null,
      createdAt: "2019-02-18T21:09:13.356Z",
      updatedAt: "2019-03-15T21:45:59.748Z",
      url: "http://localhost:3090/api/v1/stocks/56"
    },
    {
      id: 57,
      symbol: "CGA",
      name: "China Green Agriculture Inc.",
      annualDividends: null,
      heart: null,
      star: null,
      createdAt: "2019-02-18T21:12:00.468Z",
      updatedAt: "2019-02-18T21:12:00.468Z",
      url: "http://localhost:3090/api/v1/stocks/57"
    },
    {
      id: 58,
      symbol: "BB",
      name: "BlackBerry Limited",
      annualDividends: null,
      heart: false,
      star: false,
      createdAt: "2019-02-18T21:32:55.237Z",
      updatedAt: "2019-07-23T00:59:35.322Z",
      url: "http://localhost:3090/api/v1/stocks/58"
    },
    {
      id: 59,
      symbol: "AA",
      name: "Alcoa Corporation",
      annualDividends: 2,
      heart: false,
      star: true,
      createdAt: "2019-02-18T21:43:45.394Z",
      updatedAt: "2019-07-23T00:59:32.761Z",
      url: "http://localhost:3090/api/v1/stocks/59"
    },
    {
      id: 60,
      symbol: "CEE",
      name: "The Central and Eastern Europe Fund Inc. (The)",
      annualDividends: 1,
      heart: null,
      star: null,
      createdAt: "2019-03-11T21:33:55.085Z",
      updatedAt: "2019-03-11T21:33:55.085Z",
      url: "http://localhost:3090/api/v1/stocks/60"
    }
  ]
};
export default stocks;

export const newStock = {
  id: 4,
  symbol: 'MOCK2',
  name: 'Mock Stock 2',
  annualDividends: null,
  heart: null,
  star: null,
  createdAt: '2019-01-31T18:22:05.279Z',
  updatedAt: '2019-02-01T18:22:05.279Z',
  url: 'http://localhost:5000/api/v1/stocks/4'
};
