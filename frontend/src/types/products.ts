export type ProductsProps = {
  attributes: {
    price: string;
    title: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    slug: string;
  };
};
