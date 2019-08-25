import axios from 'axios';
const baseUrl = 'http://localhost:3090/api/v1';

export const loadStocks = async () => {
  return await axios.get(`${baseUrl}/stocks`);
};

export const updateStock = async stock => {
  const payload = { ...stock }
  delete payload.createdAt;
  return await axios.put(`${baseUrl}/stocks/${stock.id}`, payload);
}

export const deleteStock = async id => {
  const result = await axios.delete(`${baseUrl}/stocks/${id}`);
  return result;
}
