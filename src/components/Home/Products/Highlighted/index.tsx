import React, { useEffect, useState } from 'react';
import { getProducts } from '../../../../services/products.service';
import { ProductsProps } from '../../../../types/products';
import ButtonLink from '../../../Button/Link';
import CardProduct from '../../../Card/Product';

const ProductsHighlighted: React.FC = () => {
  const [highlightedProduct, setHighlightedProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const getHighlightedProduct = async () => {
    try {
      setLoading(true);
      const { data } = await getProducts();
      setHighlightedProduct(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getHighlightedProduct();
    })();
  }, []);

  const highlightedProducts = highlightedProduct.slice(0, 4);

  return (
    <section className="c-products">
      <h2 className="c-products__title">New products</h2>
      <div className="c-products__wrapper">
        {highlightedProducts.map(({ attributes }: ProductsProps) => (
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

export default ProductsHighlighted;
