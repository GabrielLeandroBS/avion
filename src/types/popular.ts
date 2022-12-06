export type popularProps = {
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
