import React, { useEffect, useState } from 'react';
import { getProducts } from '../../../../services/products.service';
import { ProductsProps } from '../../../../types/products';
import Button from '../../../Button/Link';
import CardProduct from '../../../Card/Product';

const ProductsPopular: React.FC = () => {
  const [principalsProduct, setPrincipalsProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPrincipalsProduct = async () => {
    try {
      setLoading(true);
      const { data } = await getProducts();
      setPrincipalsProduct(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getPrincipalsProduct();
    })();
  }, []);

  const necessaryItems = principalsProduct.slice(0, 3);

  return (
    <section className="c-products">
      <h2 className="c-products__title">Our popular products</h2>
      <div className="c-products__wrapper c-products__wrapper--grid">
        {necessaryItems.map(({ attributes }: ProductsProps) => (
          <CardProduct
            key={attributes.title}
            image={attributes.image.data.attributes.url}
            title={attributes.title}
            price={attributes.price}
            slug={attributes.slug}
          />
        ))}
      </div>

      <Button title="View collection" href="/products" />
    </section>
  );
};

export default ProductsPopular;
