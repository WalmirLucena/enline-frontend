import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3005',
});

const request = async (endpoint, body, method) => {
  const response = await api[method](endpoint, body);
  return response.data;
};

export { api, request };
