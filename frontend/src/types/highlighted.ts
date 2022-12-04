export type highlightedProps = {
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
              attributes: {
                url: string;
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
