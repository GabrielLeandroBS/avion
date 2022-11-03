import React from 'react';
import Filters from '../../components/Filters';
import { Layout } from '../../layout';

const Products: React.FC = () => {
  return (
    <Layout>
      <section>
        <h1 className="p-products__title">View all Products</h1>
        <Filters />
      </section>
    </Layout>
  );
};

export default Products;
