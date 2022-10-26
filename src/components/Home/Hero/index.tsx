import React, { useEffect, useState } from 'react';

import { getPage } from '../../../services/page.service';
import { HomeHeroProps } from '../../../types/page/home/hero';
import { REACT_APP_BASE_URL } from '../../../../global/constants';
import ButtonLink from '../../Button/Link';
import HeroBackground from '../../../assets/background.jpeg';

const Hero: React.FC = () => {
  const [home, setHome] = useState<HomeHeroProps>({
    title: 'The furniture brand for the future, with timeless designs',
    description: `A new era in eco friendly furniture with Avelon, the French luxury retail brand
     with nice fonts, tasteful colors and a beautiful way to display things digitally using modern web technologies.`,
    link: {
      reference: '/',
      title: 'View Collection',
    },
    image: {
      data: {
        attributes: {
          url: HeroBackground,
        },
      },
    },
  });
  const getComponentHero = async () => {
    const { data } = await getPage({
      page: 'Home',
      component: 'Hero',
    });
    setHome(data.attributes.Hero);
  };

  useEffect(() => {
    (async () => {
      await getComponentHero();
    })();
  }, []);

  const { title, description, link, image } = home;

  return (
    <section className="c-hero">
      <div className="c-hero__content">
        <div>
          <h1 className="c-hero__title">{title}</h1>
          <div className="c-hero__button">
            <ButtonLink href={`${link.reference}`} title={`${link.title}`} />
          </div>
        </div>
        <p className="c-hero__description">{description}</p>
        <div className="c-hero__button--desktop">
          <ButtonLink href={`${link.reference}`} title={`${link.title}`} />
        </div>
      </div>
      <figure className="c-hero__figure">
        <img
          src={`${REACT_APP_BASE_URL}${image.data.attributes.url}`}
          alt="Image hero"
          loading="lazy"
        />
      </figure>
    </section>
  );
};

export default Hero;
