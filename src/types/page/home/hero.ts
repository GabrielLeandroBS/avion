export type HomeHeroProps = {
  title: string;
  description: string;
  link: {
    reference: string;
    title: string;
  };
  image: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
};
