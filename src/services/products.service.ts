import { Api } from './api.service';

export const getProducts = async () => {
  const { data } = await Api.get('/products?populate=*');

  return data;
};
