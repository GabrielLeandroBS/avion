import { Route, Routes as Switch } from 'react-router-dom';
import React from 'react';

import Home from '../pages/home';
import Details from '../pages/details';
import ScrollToTop from '../utils/ScrollToTop';
import Baskets from '../pages/baskets';
import Products from '../pages/products';

const Routes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/details/:slug" element={<Details />} />
        <Route path="/baskets" element={<Baskets />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Home />} />
      </Switch>
    </>
  );
};

export default Routes;
