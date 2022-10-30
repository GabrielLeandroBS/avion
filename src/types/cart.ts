export type ProductInCartProps = {
  slug: string;
  stripe: string;
  quantity: number;
  title: string;
  image: string;
  price: number;
  description: string;
};

export type RemoveProductInCartProps = {
  slug: string;
  description: string;
  image: string;
  price: number;
};

export type AddProductInCartProps = {
  product: {
    slug: string;
    image: string;
    price: number;
    quantity: number;
    stripe: string;
    title: string;
    description: string;
  };
};
