import axios from 'axios';

const api = axios.create({
  baseURL: 'https://enline-upload-backend.herokuapp.com',
});

const request = async (endpoint, body, method) => {
  const response = await api[method](endpoint, body);
  return response.data;
};

export { api, request };
