import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { getPage } from '../../../../services/page.service';
import { highlightedProps } from '../../../../types/highlighted';
import ButtonLink from '../../../Button/Link';
import CardProduct from '../../../Card/Product';

const ProductsHighlighted: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [highlightedProduct, setHighlightedProduct] =
    useState<highlightedProps>({
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
      setLoading(true);
      const { data } = await getPage({
        page: 'Home',
      });
      setHighlightedProduct(data.attributes.Highlighted);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getHighlightedProduct();
    })();
  }, []);

  const { title, products, button, location } = highlightedProduct;
  return (
    <section className="c-products">
      <h2 className="c-products__title">
        {loading ? <Skeleton height={50} /> : title}
      </h2>
      <div className="c-products__wrapper">
        {loading
          ? Array.from({ length: 4 }, () => (
              <CardProduct key={length} isLoading={true} />
            ))
          : ''}
        {!loading &&
          products.data.map(({ attributes }) => (
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

export default ProductsHighlighted;
