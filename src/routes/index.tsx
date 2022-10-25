import { Route, Routes as Switch } from 'react-router-dom';
import React from 'react';

import Home from '../pages/Home';
import Details from '../pages/Details';
import ScrollToTop from '../utils/ScrollToTop';
import Baskets from '../pages/Baskets';

const Routes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/details/:slug" element={<Details />} />
        <Route path="/baskets" element={<Baskets />} />
        <Route path="*" element={<Home />} />
      </Switch>
    </>
  );
};

export default Routes;
