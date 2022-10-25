import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import cart from '../../assets/cart.svg';

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
