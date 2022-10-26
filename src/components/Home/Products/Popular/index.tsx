import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { getProducts } from '../../../../services/products.service';
import { ProductsProps } from '../../../../types/products';
import ButtonLink from '../../../Button/Link';
import CardProduct from '../../../Card/Product';

const ProductsPopular: React.FC = () => {
  const [popularProducts, setPopularProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPrincipalsProduct = async () => {
    try {
      setLoading(true);
      const { data } = await getProducts();
      setPopularProduct(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getPrincipalsProduct();
    })();
  }, []);

  const getPopularProducts = popularProducts.slice(0, 3).reverse();

  return (
    <section className="c-products">
      <h2 className="c-products__title">
        {loading ? <Skeleton height={50} /> : 'Our popular products'}
      </h2>
      <div className="c-products__wrapper c-products__wrapper--grid">
        {getPopularProducts.map(({ attributes }: ProductsProps) => (
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

      <ButtonLink title="View collection" href="/products" />
    </section>
  );
};

export default ProductsPopular;
