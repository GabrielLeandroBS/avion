import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { getPage } from '../../../../services/page.service';
import { popularProps } from '../../../../types/popular';
import ButtonLink from '../../../Button/Link';
import CardProduct from '../../../Card/Product';

const ProductsPopular: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [popularProduct, setPopularProduct] = useState<popularProps>({
    title: '',
    products: {
      data: [
        {
          attributes: {
            price: '',
            slug: '',
            stripe: '',
            title: '',
            description: '',
            image: {
              data: {
                [0]: {
                  attributes: {
                    url: '/',
                  },
                },
              },
            },
          },
        },
      ],
    },
    button: '',
    location: '',
  });
  const getHighlightedProduct = async () => {
    try {
      const { data } = await getPage({
        page: 'home',
      });
      setPopularProduct(data.attributes.Popular);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getHighlightedProduct();
    })();
  }, []);

  const { title, products, button, location } = popularProduct;

  return (
    <section className="c-products">
      <h2 className="c-products__title">
        {loading ? <Skeleton height={50} /> : title}
      </h2>
      <div className="c-products__wrapper c-products__wrapper--columns">
        {loading
          ? Array.from({ length: 3 }, (item = length, index) => (
              <CardProduct key={`popular-${item}-${index}`} isLoading={true} />
            ))
          : ''}
        {!loading &&
          products.data.map(({ attributes }) => (
            <CardProduct
              key={`popular-${attributes.title}`}
              image={attributes.image.data[0].attributes.url}
              title={attributes.title}
              price={attributes.price}
              slug={attributes.slug}
              isLoading={loading}
            />
          ))}
      </div>

      <ButtonLink title={button} href={location} isLoading={loading} />
    </section>
  );
};

export default ProductsPopular;
