import { ReactElement } from 'react';

export type AddToCartProps = {
  product: {
    slug: string;
    image: string;
    price: number;
    quantity: number;
    stripe: string;
    title: string;
    description: string | ReactElement;
  };
};
