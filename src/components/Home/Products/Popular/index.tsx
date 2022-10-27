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
                attributes: {
                  url: '/',
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
        page: 'Home',
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
      <div className="c-products__wrapper c-products__wrapper--grid">
        {loading
          ? Array.from({ length: 2 }, () => (
              <CardProduct key={length} isLoading={true} />
            ))
          : ''}
        {products.data.map(({ attributes }) => (
          <CardProduct
            key={attributes.title}
            image={attributes.image.data.attributes.url}
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
