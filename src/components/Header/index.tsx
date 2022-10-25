import React from 'react';

import logo from '../../assets/logo.svg';
import search from '../../assets/search.svg';
import cart from '../../assets/cart.svg';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="c-header">
      <figure>
        <img src={logo} alt="Logo" />
      </figure>

      <Link to={`/baskets`}>
        <figure>
          <img src={cart} alt="Logo" />
        </figure>
      </Link>
    </header>
  );
};

export default Header;
