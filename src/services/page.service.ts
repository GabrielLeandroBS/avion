import { PageProps } from '../types/page';
import { Api } from './api.service';

export const getPage = async ({ page, component }: PageProps) => {
  const { data } = await Api.get(`${page}?populate[${component}][populate]=*`);
  return data;
};
