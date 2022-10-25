export type ProductInCart = {
  slug: string;
  stripe: string;
  quantity: number;
  title: string;
  image: string;
  price: number;
  description: string;
};

export type RemoveProductInCart = {
  slug: string;
  description: string;
  image: string;
  price: number;
};
