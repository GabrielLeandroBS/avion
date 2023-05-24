import React from 'react';

import ButtonLink from '../button/link';
import background from '../../assets/background.jpeg';

const Hero: React.FC = () => {
  return (
    <section className="c-hero">
      <div className="c-hero__content">
        <section>
          <h1 className="c-hero__title">
            The furniture brand for the future, with timeless designs
          </h1>
          <div className="c-hero__button">
            <ButtonLink href="/products" title="View collection" isLoading={false} />
          </div>
        </section>
        <p className="c-hero__description">
          A new era in eco friendly furniture with Avelon, the French luxury
          retail brand with nice fonts, tasteful colors and a beautiful way to
          display things digitally using modern web technologies.
        </p>
        <div className="c-hero__button--desktop">
          <ButtonLink href="/" title="View collection" isLoading={false} />
        </div>
      </div>
      <figure className="c-hero__figure">
        <img src={background} alt="Image hero" loading="lazy" />
      </figure>
    </section>
  );
};

export default Hero;
