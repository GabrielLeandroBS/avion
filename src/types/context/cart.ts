/* eslint-disable @typescript-eslint/no-explicit-any */
export type useCartProps = any;

export type AddToCartInitialProps = {
  addTocart: any;
  slug: string;
  image: string;
  price: string;
  quantity: number;
  stripe: string;
  title: string;
  description: string;
};

export type UpdateInitialCartProps = {
  slug: string;
  image: string;
  price: string;
  quantity: number;
  stripe: string;
  title: string;
  description: string;
};

export type RemoveCartInitialProps = {
  quantityOfItemsInCart: number;
  slug: string;
  price: number;
};

export type InitialProps = {
  totalOfItemsInCart: number;
  itemsAllocatedInsideCart: [];
  quantityOfItemsInCart: number;
  slug: string;
};

export type CartContentProps = {
  cartContent: [
    {
      quantityOfItemsInCart: number;
    }
  ];
};
