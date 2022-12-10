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

export type ProductsListProps = [
  {
    attributes: {
      price: string;
      slug: string;
      stripe: string;
      title: string;
      description: string;
      image: {
        data: {
          [0]:{
            attributes: {
              url: string;
            };
          }
        };
      };
    };
  }
]
