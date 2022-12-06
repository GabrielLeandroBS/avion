import Axios, { AxiosInstance } from 'axios';
import { REACT_APP_BASE_URL } from '../../global/constants';

export const Api: AxiosInstance = Axios.create({
  baseURL: `${REACT_APP_BASE_URL}/api`,
});