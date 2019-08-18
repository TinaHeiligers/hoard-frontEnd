import axios from 'axios';
import stocks from '../../fixtures/stocksData';
const baseUrl = 'http://localhost:3090/api/v1';
const cors_enabled = true;

// We have a CORS issue, until that's sorted out, using dummy data
export const loadStocks = async () => {
  if (cors_enabled) {
    return await axios.get(`${baseUrl}/stocks`);
  } else {
    return stocks;
  }
};
