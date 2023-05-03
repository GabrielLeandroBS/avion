import { Layout } from '../../layout';
import Filters from '../../components/filters';
import ListProducts from '../../components/listProducts';
import React from 'react';

const Products: React.FC = () => {
  return (
    <Layout>
      <section>
        <h1 className="p-products__title">View all Products</h1>
        <Filters />
        <ListProducts />
      </section>
    </Layout>
  );
};

export default Products;
