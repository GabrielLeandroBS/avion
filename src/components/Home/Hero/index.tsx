import React, { useEffect, useState } from 'react';

import { getPage } from '../../../services/page.service';
import { HomeHeroProps } from '../../../types/page/home/hero';
import { REACT_APP_BASE_URL } from '../../../../global/constants';
import ButtonLink from '../../Button/Link';
import Skeleton from 'react-loading-skeleton';

const Hero: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [home, setHome] = useState<HomeHeroProps>({
    title: '',
    description: '',
    link: {
      reference: '',
      title: '',
    },
    image: {
      data: {
        attributes: {
          url: '',
        },
      },
    },
  });
  const getComponentHero = async () => {
    try {
      const { data } = await getPage({
        page: 'Home',
        component: 'Hero',
      });
      setHome(data.attributes.Hero);
    } finally {
      setLoading(false);
    }
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
          <h1 className="c-hero__title">
            {loading ? <Skeleton height={60} /> : title}
          </h1>
          <div className="c-hero__button">
            {loading ? (
              <Skeleton height={56} width={170} />
            ) : (
              <ButtonLink href={`${link.reference}`} title={`${link.title}`} />
            )}
          </div>
        </div>
        <p className="c-hero__description">
          {loading ? <Skeleton height={80} /> : description}
        </p>
        <div className="c-hero__button--desktop">
          {loading ? (
            <Skeleton height={56} />
          ) : (
            <ButtonLink href={`${link.reference}`} title={`${link.title}`} />
          )}
        </div>
      </div>
      <figure className="c-hero__figure">
        {loading ? (
          <Skeleton height={'100%'} style={{ top: '-3px' }} />
        ) : (
          <img
            src={`${REACT_APP_BASE_URL}${image.data.attributes.url}`}
            alt="Image hero"
            loading="lazy"
          />
        )}
      </figure>
    </section>
  );
};

export default Hero;
