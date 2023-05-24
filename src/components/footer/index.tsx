import React from 'react';

import { linksFooter } from '../../utils/linksFooter';
import logo from '../../assets/sprite-svg/avion.svg';

const Footer: React.FC = () => {
  return (
    <footer className="c-footer">
      <section className="c-footer__container">
        <div>
          <div>
            <figure className="c-footer__logo">
              <img src={logo} alt="logo footer" />
            </figure>

            <div className="c-footer__content">
              <p>21 New York Street</p>
              <p>New York City</p>
              <p>United States of America</p>
              <p>432 34</p>
            </div>
          </div>
        </div>

        <div className="c-footer__wrapper">
          <nav className="c-footer__nav">
            <h2 className="c-footer__title" aria-describedby="menu">
              Menu
            </h2>
            <ul className="c-footer__unlist" id="menu">
              {linksFooter.map(({ title }) => (
                <li key={title} className="c-footer__item">
                  <a href="">{title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="c-footer__nav">
            <h2 className="c-footer__title" aria-describedby="categories">
              Categories
            </h2>
            <ul className="c-footer__unlist" id="categories">
              {linksFooter.map(({ title }) => (
                <li key={title} className="c-footer__item">
                  <a href="">{title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="c-footer__nav">
            <h2 className="c-footer__title" aria-describedby="ourCompany">
              Our company
            </h2>
            <ul className="c-footer__unlist" id="ourCompany">
              {linksFooter.map(({ title }) => (
                <li key={title} className="c-footer__item">
                  <a href="">{title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="c-footer__credits">Copyright 2022 Avion LTD</section>
    </footer>
  );
};

export default Footer;
