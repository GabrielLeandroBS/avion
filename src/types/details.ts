export type DetailsProps = string | undefined;

export type DetailsItemProps = {
  attributes: {
    createdAt: string;
    depth: string;
    description: string;
    height: string;
    price: number;
    publishedAt: string;
    slug: string;
    title: string;
    updatedAt: string;
    width: string;
    stripe: string;
    quantity: number;
    image: {
      data: {
        [0]: {
          attributes: {
            url: string;
          };
        };
      };
    };
  };
};

export type DetailsInitalStateProps = {
  description: string;
  price: number;
  publishedAt: string;
  slug: string;
  title: string;
  quantity: number;
  stripe: string;
  image: {
    data: {
      [0]: {
        attributes: {
          url: string;
        };
      };
    };
  };
};
