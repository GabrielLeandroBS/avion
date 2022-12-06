import { highlightedProps } from '../highlighted';
import { popularProps } from '../popular';

export type PageProps = {
  page: string;
};

export type HomeProps = {
  Highlighted: {
    title: string;
    products: {
      data: [
        {
          attributes: {
            price: string;
            slug: string;
            stripe: string;
            title: string;
            description: string;
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
        }
      ];
    };
    button: string;
    location: string;
  };
  Popular: popularProps;
};
