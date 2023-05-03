import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/products.service';
import { ProductsListProps } from '../../types/products';
import CardProduct from '../card';

const ListProducts: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [listProducts, setListProducts] = useState<ProductsListProps>([
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
  ]);

  const getListProducts = async () => {
    try {
      const data = await getProducts();
      setListProducts(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getListProducts();
    })();
  }, []);

  return (
    <section className="c-products">
      <div className="c-products__wrapper c-products__wrapper--columns-list">
        {loading
          ? Array.from({ length: 12 }, (item = length, index) => (
              <CardProduct
                key={`list-products-${item}-${index}`}
                isLoading={true}
              />
            ))
          : ''}
        {!loading &&
          listProducts.map(({ attributes }) => (
            <CardProduct
              key={`list-products-${attributes.title}`}
              image={attributes.image.data[0].attributes.url}
              title={attributes.title}
              price={attributes.price}
              slug={attributes.slug}
              isLoading={loading}
            />
          ))}
      </div>
    </section>
  );
};

export default ListProducts;
