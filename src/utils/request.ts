import axios from 'axios';
import { _retrieveData } from './storeage';
import { COOKIE_NAMES } from './constants';

const request = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleError = (error: any) => {
  const response = error.response || {};
  const { data, status, statusText } = response;
  return { data, status, statusText };
};

request.interceptors.request.use(async (config: any) => {
  const token = await _retrieveData(COOKIE_NAMES.ACCESS_TOKEN);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

request.interceptors.response.use((response: any) => {
  return response?.data;
}, handleError);

export default request;
