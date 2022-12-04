import Axios, { AxiosInstance } from 'axios';
import { REACT_APP_BASE_URL } from '../../global/constants';

export const Api: AxiosInstance = Axios.create({
  baseURL: `${REACT_APP_BASE_URL}/api`,
});

export const ApiTest: AxiosInstance = Axios.create({
  baseURL: `https://private-anon-9a3d02b3e0-produto3.apiary-mock.com/api`,
});
